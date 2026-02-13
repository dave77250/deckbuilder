import { FlexBox, FlexBoxDirection, Text } from "@ui5/webcomponents-react";
import { Card } from "../model/Card";

export interface CardViewProps {
    card: Card
}

export function CardView(props: CardViewProps) {
    return <FlexBox direction={FlexBoxDirection.Column}>
        <img src={props.card.image} style={{ width: '367px', height: 'auto ', borderRadius: '5%'}}/>
        <Text style={{ width: '100%', textAlign: 'center' }}>{props.card.fullName}</Text>
    </FlexBox>;
}