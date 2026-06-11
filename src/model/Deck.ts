import { CardId } from "./Card";
import { DeckCard, createFrom } from "./DeckCard";
import { CardCollection } from "./Collection";

export type Deck = DeckCard[];

export function createEmptyDeck(collection: CardCollection) {
    return collection.keys().map(id =>
        createFrom(id, collection.get(id) ?? 0)
    );
}
