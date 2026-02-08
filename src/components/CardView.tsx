import { FlexBox, FlexBoxDirection, Label, Text } from "@ui5/webcomponents-react";
import { Card } from "../model/Card";

export interface CardViewProps {
    card: Card
}

export function CardView(props: CardViewProps) {
    return <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '5px'}}>
        <img src={props.card.image} style={{ width: '367px', height: 'auto '}}/>
        <Text style={{ width: '100%', textAlign: 'center' }}>{props.card.fullName}</Text>
    </FlexBox>;
}