import { Card, CardId } from "./Card";

export type CardCollection = Map<CardId, number>;

const storage = window.localStorage;
const COLLECTION_PREFIX = 'lorcana.collection';

export function loadCollection(existingCards: Card[]): CardCollection {
    const result = new Map<CardId, number>();
    existingCards.forEach(c => {
        const storedCount = Number.parseInt(storage.getItem(`${COLLECTION_PREFIX}.${c.id}`) ?? '0');
        result.set(c.id, storedCount);
    });
    // log des couleurs
    const colorMap = new Map<string, number>();
    existingCards.forEach(c => {
        const currentCount = colorMap.get(c.color) ?? 0;
        colorMap.set(c.color, currentCount + 1);
    });
    console.log("colors");
    console.log(colorMap.toString());
    return result;
}

export function setOwned(collection: CardCollection, card: CardId, owned: number): CardCollection {
    collection.set(card, owned);
    storage.setItem(`${COLLECTION_PREFIX}.${card}`, owned.toString());
    return new Map<CardId, number>(collection);
}