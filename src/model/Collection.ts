import { Card, CardId } from "./Card";

export type CardCollection = Map<CardId, number>;

export type DreambornCollectionCard = {
    setCode: string,
    number: number,
    owned: number
};
export type DreambornCollection = DreambornCollectionCard[];

const storage = window.localStorage;
const COLLECTION_PREFIX = 'lorcana.collection';

function getCardKey(card: Card) {
    return `${COLLECTION_PREFIX}.${card.id}`;
}

export function loadCollection(existingCards: Card[]): CardCollection {
    const result = new Map<CardId, number>();
    existingCards.forEach(c => {
        const storedCount = Number.parseInt(storage.getItem(getCardKey(c)) ?? '0');
        result.set(c.id, storedCount);
    });
    return result;
}

export function setOwned(collection: CardCollection, card: CardId, owned: number): CardCollection {
    collection.set(card, owned);
    storage.setItem(`${COLLECTION_PREFIX}.${card}`, owned.toString());
    return new Map<CardId, number>(collection);
}

export function clearCollection(existingCards: Card[]) {
    existingCards.forEach(card => {
        const key = getCardKey(card);
        const currentlyOwned = storage.getItem(key);
        if(currentlyOwned === null) {
            storage.removeItem(key);
        }
    })
}

export function importDreambornCollection(exported: DreambornCollection, existingCards: Card[]): CardCollection {
    const result = new Map<CardId, number>();
    exported.forEach(expCard => {
        console.log("Recherche de setCode " + expCard.setCode + " et number " + expCard.number);
        const knownCard = existingCards.find(card => Number.parseInt(card.setCode) === Number.parseInt(expCard.setCode) && card.number === expCard.number);
        if (knownCard !== undefined) {
            result.set(knownCard.id, expCard.owned);
        }
    });
    return result;
}

