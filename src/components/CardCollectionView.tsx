import { Grid } from "@ui5/webcomponents-react"
import { Card } from "../model/Card"
import React from "react";
import { CardView } from "./CardView";

export type CardCollectionViewProps = {
    allCards: Card[]
}

export function CardCollectionView(props: CardCollectionViewProps) {
    return (
        <Grid
            defaultIndent="XL0 L0 M0 S0"
            defaultSpan="XL3 L3 M6 S12"
            hSpacing="1rem"
            vSpacing="1rem"
        >
            <React.Fragment key=".0">
                {props.allCards.map(card => {
                    return <CardView card={card}/>
                })}
            </React.Fragment>
        </Grid>
    );
}