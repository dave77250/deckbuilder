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
    return result;
}

export function setOwned(collection: CardCollection, card: CardId, owned: number): CardCollection {
    collection.set(card, owned);
    storage.setItem(`${COLLECTION_PREFIX}.${card}`, owned.toString());
    return new Map<CardId, number>(collection);
}

interface ExportedCard {
    id: CardId,
    owned: number
}

type ExportedCollection = ExportedCard[];

export function exportCollection(collection: CardCollection): string {
    const exportedColl = collection.keys().map(id => {
        const owned = collection.get(id) ?? 0;
        return {
            id, owned
        }
    });
    return JSON.stringify(exportedColl);
}

export function importCollection(exported: string, existingCards: Card[]): CardCollection {
    // effacer la collection existante
    existingCards.forEach(card => storage.removeItem(`${COLLECTION_PREFIX}.${card.id}`));
    // écrire la collection lue
    const importedColl = JSON.parse(exported) as any as ExportedCollection;
    var result: CardCollection = new Map<CardId, number>();
    importedColl.forEach(card => { result = setOwned(result, card.id, card.owned); });
    return result;
}
