import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, Input } from "@ui5/webcomponents-react";

export type CollectionToolBarProps = {

};

export function CollectionToolBar(props: CollectionToolBarProps) {
    return (
        <FlexBox direction={FlexBoxDirection.Row} fitContainer={true} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
            <Input showClearIcon={true} placeholder="Chercher une carte"></Input>
            <div>Ending text</div>
        </FlexBox>
    )
}