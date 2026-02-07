import axios from 'axios';

export type Card = {
    id: string,
    name: string,
    fullName: string,
    image: string
}

export async function loadCards(): Promise<Card[]> {
    const response = await axios.get('./allCards.json');
    const rawData = JSON.parse(response.data);
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