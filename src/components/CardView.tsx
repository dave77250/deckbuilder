import { FlexBox, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
import { Card } from "../model/Card";

export interface CardViewProps {
    card: Card
}

export function CardView(props: CardViewProps) {
    return <FlexBox direction={FlexBoxDirection.Column}>
        <img src={props.card.image} style={{ width: '367px', height: 'auto '}}/>
        <Label title={props.card.fullName}/>
    </FlexBox>;
}