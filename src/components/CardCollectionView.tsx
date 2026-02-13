import { Grid } from "@ui5/webcomponents-react"
import { Card, CardId } from "../model/Card"
import React from "react";
import { CardView } from "./CardView";
import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";
import { CollectionToolBar } from "./CollectionToolBar";
import { CardCollection } from "../model/Collection";
import { CollectionCardView } from "./CollectionCardView";

export type CardCollectionViewProps = {
    cardDefinitions: Card[],
    collection: CardCollection,
    setInCollection: (id: CardId, owned: number) => void
}

export function CardCollectionView(props: CardCollectionViewProps) {
    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{width: '100%'}}>
            <CollectionToolBar/>
            <Grid
                defaultIndent="XL0 L0 M0 S0"
                defaultSpan="XL1 L1 M1 S1"
                hSpacing="1rem"
                vSpacing="1rem"
                style={{width: '100%'}}
            >
                <React.Fragment key=".0">
                    {props.cardDefinitions.map(card => {
                        const owned = props.collection.get(card.id) ?? 0;
                        return (
                            <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '5px'}}>
                                <CollectionCardView card={card} owned={owned} setOwned={(o) => props.setInCollection(card.id, o)}/>
                            </FlexBox>);
                    })}
                </React.Fragment>
            </Grid>
        </FlexBox>
    );
}