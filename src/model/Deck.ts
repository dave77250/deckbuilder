import { CardId, Card } from "./Card";
import { DeckCard, createDeckCardFrom, makeAvailable, makeUnavailable, pick, setMaxSelectable } from "./DeckCard";
import { CardCollection } from "./Collection";

export const DECK_SIZE = 60;
export const MAX_IDENTICAL_CARDS = 4;
export const MAX_COLORS = 2;

export type Deck = DeckCard[];

function getDeckSize(deck: Deck) {
    return deck.reduce((total, card) => total + card.selected, 0);
}

function makeCardMap(cards: Card[]) {
    const result = new Map<CardId, Card>();
    cards.forEach(card => result.set(card.id, card));
    return result;
}

function getDeckColors(deck: Deck, allCards: Card[]) {
    const colorMap = new Map<string, boolean>();
    const cardMap = makeCardMap(allCards);
    deck.forEach(card => colorMap.set(cardMap.get(card.id)?.color ?? 'unknown', true));
    return colorMap.keys().toArray();
}

export function createDeck(collection: CardCollection): Deck {
    const result: Deck = [];
    collection.keys().forEach(id => {
        const owned = collection.get(id) ?? 0;
        if (owned > 0) {
            result.push(createDeckCardFrom(id, owned));
        }
    });
    // Now ensure that at most 4 of each card is available
    return result.map(dc => setMaxSelectable(dc, 4));
}

export function setPicked(deck: Deck, allCards: Card[], id: CardId, picked: number) {
    // reset availability for all cards
    var result = deck.map(makeAvailable);
    // pick the desired card
    result = result.map( c => c.id === id? pick(c, picked): c);
    // now check the colors rule, and exclude cards of the wrong colors
    const colors = getDeckColors(deck, allCards);
    if (colors.length >= MAX_COLORS) {
        const cardMap = makeCardMap(allCards);
        result = result.map(c => {
            const color = cardMap.get(c.id)?.color ?? 'unknown';
            if (colors.find(col => col === color) !== undefined) {
                return c;
            } else {
                return makeUnavailable(c);
            }
        });
    }
    // Finally ensure there are no more than 4 of each card
    // and the deck remains under the allowed size
    const currentDeckSize = getDeckSize(deck);
    const remainingSize4Card = Math.min(DECK_SIZE - currentDeckSize, MAX_IDENTICAL_CARDS);
    return result.map(c => setMaxSelectable(c, remainingSize4Card));
}