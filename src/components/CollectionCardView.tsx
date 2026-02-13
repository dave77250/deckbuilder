import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, StepInput } from "@ui5/webcomponents-react"
import { CardView } from "./CardView"
import { Card } from "../model/Card"

export type CollectionCardViewProps = {
    card: Card,
    owned: number,
    setOwned: (owned: number) => void
}

export function CollectionCardView(props: CollectionCardViewProps) {
    return (
        <FlexBox direction ={FlexBoxDirection.Column}>
            <CardView card={props.card}/>
            <FlexBox direction={FlexBoxDirection.Row} justifyContent={FlexBoxJustifyContent.Center}>
                <StepInput value={props.owned} onInput={(event) => props.setOwned(event.target.value)}/>
            </FlexBox> 
        </FlexBox>
    )
}