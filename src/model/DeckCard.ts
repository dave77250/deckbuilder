import { CardId } from "./Card";

export type DeckCard = {
    id: CardId,
    owned: number,
    unavailable: number,
    excluded: number,
    selected: number
}

export function createFrom(id: CardId, owned: number): DeckCard {
    return {
        id,
        owned,
        unavailable: 0,
        excluded: 0,
        selected: 0
    };
}

export function pick(card: DeckCard, picked: number): DeckCard {
    return {
        ...card,
        selected: picked
    };
}

export function exclude(card: DeckCard, excluded: number): DeckCard {
    return {
        ...card,
        excluded
    };
}

export function setUnavailable(card: DeckCard, unavailable: number): DeckCard {
    return {
        ...card,
        unavailable
    };
}

export function getAvailable(card: DeckCard): number {
    return card.owned - card.unavailable - card.excluded - card.selected;
}
