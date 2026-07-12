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
    const exportedColl = collection.keys().toArray().map(id => {
        const owned = collection.get(id) ?? 0;
        const exported: ExportedCard = { id, owned };
        console.log(exported);
        return exported;
    });
    return JSON.stringify(exportedColl);
}

export function importCollection(exported: string, existingCards: Card[], setOwned: (id: CardId, owned: number) => void): void {
    // effacer la collection existante
    existingCards.forEach(card => setOwned(card.id, 0));
    // écrire la collection lue
    const importedColl = JSON.parse(exported) as any as ExportedCollection;
    importedColl.forEach(card => { 
        setOwned(card.id, card.owned);
    });
}
