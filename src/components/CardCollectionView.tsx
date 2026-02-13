import { Grid } from "@ui5/webcomponents-react"
import { Card } from "../model/Card"
import React from "react";
import { CardView } from "./CardView";
import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";

export type CardCollectionViewProps = {
    allCards: Card[]
}

export function CardCollectionView(props: CardCollectionViewProps) {
    return (
        <Grid
            defaultIndent="XL0 L0 M0 S0"
            defaultSpan="XL1 L1 M1 S1"
            hSpacing="1rem"
            vSpacing="1rem"
        >
            <React.Fragment key=".0">
                {props.allCards.map(card => {
                    return (
                        <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '5px'}}>
                            <CardView card={card}/>
                        </FlexBox>);
                })}
            </React.Fragment>
        </Grid>
    );
}