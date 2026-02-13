export type CardId = string;

export type Card = {
    id: CardId,
    name: string,
    fullName: string,
    image: string
}

export async function loadCards(): Promise<Card[]> {
    const response = await fetch('./allCards.json');
    const rawData = await response.json();
    const cards: any[] = rawData?.cards;
    return cards.map(card => {
        return {
            id: card?.id,
            name: card?.name,
            fullName: card?.fullName,
            image: card?.images?.thumbnail
        }
    });
}