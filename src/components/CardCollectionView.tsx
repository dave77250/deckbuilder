import { Card, CardId } from "../model/Card"
import { CardCollection } from "../model/Collection";
import { SearchableCardGrid } from "./SearchableCardGrid";

export type CardCollectionViewProps = {
    cardDefinitions: Card[],
    collection: CardCollection,
    setInCollection: (id: CardId, owned: number) => void
}

export function CardCollectionView(props: CardCollectionViewProps) {
    return (
        <SearchableCardGrid cardCollection={props.cardDefinitions}/>
    );
}