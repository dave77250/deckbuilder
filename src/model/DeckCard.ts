import { CardId } from "./Card";

export type DeckCard = {
    id: CardId,
    owned: number,
    unavailable: number,
    excluded: number,
    selected: number
}

export function createDeckCardFrom(id: CardId, owned: number): DeckCard {
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

export function setMaxSelectable(card: DeckCard, maxSelectable: number): DeckCard {
    const currentlyAvailable = card.owned - card.excluded - card.selected;
    const unavailable = currentlyAvailable - maxSelectable;
    return {
        ...card,
        unavailable
    };
}

export function makeUnavailable(card: DeckCard): DeckCard {
    const currentlyAvailable = card.owned - card.excluded - card.selected;
    return {
        ...card,
        unavailable: currentlyAvailable
    };
}

export function makeAvailable(card: DeckCard): DeckCard {
    return {
        ...card,
        unavailable: 0
    };
}

export function getAvailable(card: DeckCard): number {
    return card.owned - card.unavailable - card.excluded - card.selected;
}
