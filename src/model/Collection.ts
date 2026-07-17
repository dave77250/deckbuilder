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

export function importDreambornCollection(exported: DreambornCollection, existingCards: Card[], setOwned: (id: CardId, owned: number) => void): void {
    // effacer la collection existante
    existingCards.forEach(card => setOwned(card.id, 0));
    // remplacer par la collection lue
    exported.forEach(expCard => {
        console.log("Recherche de setCode " + expCard.setCode + " et number " + expCard.number);
        const knownCard = existingCards.find(card => card.setCode === expCard.setCode && card.number === expCard.number);
        console.log("carte trouvée");
        console.log(knownCard);
        if (knownCard !== undefined) {
            console.log("Enregistrement de " + expCard.owned + " cartes " + knownCard.name);
            setOwned(knownCard.id, expCard.owned);
        }
    });
} 
