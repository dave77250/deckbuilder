import { Card, CardId } from "../model/Card"
import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";
import { CollectionToolBar } from "./CollectionToolBar";
import { CardCollection } from "../model/Collection";
import { CollectionCardView } from "./CollectionCardView";
import { BasicGrid } from "./BasicGrid";

export type CardCollectionViewProps = {
    cardDefinitions: Card[],
    collection: CardCollection,
    setInCollection: (id: CardId, owned: number) => void
}

export function CardCollectionView(props: CardCollectionViewProps) {
    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{width: '100%'}}>
            <CollectionToolBar/>
            <BasicGrid columns={4}>
                {props.cardDefinitions.map(card => {
                    const owned = props.collection.get(card.id) ?? 0;
                    return (
                        <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '5px'}}>
                            <CollectionCardView card={card} owned={owned} setOwned={(o) => props.setInCollection(card.id, o)}/>
                        </FlexBox>);
                })}
            </BasicGrid>
        </FlexBox>
    );
}