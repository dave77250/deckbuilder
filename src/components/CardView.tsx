import { FlexBox, FlexBoxDirection, Text } from "@ui5/webcomponents-react";
import { Card } from "../model/Card";

export interface CardViewProps {
    card: Card
}

//  ajouter bordure
export function CardView(props: CardViewProps) {
    return <FlexBox direction={FlexBoxDirection.Column} style={{width: '100%', borderColor: props.card.color, borderWidth: '1%' }}>
        <img src={props.card.image} style={{ width: '100%', height: 'auto ', borderRadius: '5%'}}/>
        <Text style={{ width: '100%', textAlign: 'center' }}>{props.card.fullName}</Text>
    </FlexBox>;
}