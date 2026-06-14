import { CardId, Card } from "./Card";
import { DeckCard, createFrom } from "./DeckCard";
import { CardCollection } from "./Collection";

export class Deck {
    private readonly cards = new Map<CardId, DeckCard>();
    private readonly existingCards = new Map<CardId, Card>();

    public constructor(collection: CardCollection, allCards: Card[]) {
        collection.keys().forEach(id =>
            this.cards.set(id, createFrom(id, collection.get(id) ?? 0))
        );
        allCards.forEach(card => this.existingCards.set(card.id, card));
    }

    public getCard(id: CardId) {
        return this.cards.get(id);
    }
}
