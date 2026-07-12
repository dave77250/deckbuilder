import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, StepInput, Button } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { CardCollection } from "../model/Collection";
import { SearchableCardGrid } from "./SearchableCardGrid";
import "@ui5/webcomponents-icons/dist/copy.js"
import "@ui5/webcomponents-icons/dist/paste.js"

export type CardCollectionViewProps = {
    cardDefinitions: Card[],
    collection: CardCollection,
    setInCollection: (id: CardId, owned: number) => void
}

// (event) => props.setInCollection(id, event.target.value)
export function CardCollectionView(props: CardCollectionViewProps) {
    const onStep = (id: CardId, value: number) => {
        props.setInCollection(id, value);
    };
    const getOwnedDetailsView = (id: CardId) => {
        return (
          <FlexBox direction={FlexBoxDirection.Row} justifyContent={FlexBoxJustifyContent.Center}>
              <StepInput value={props.collection.get(id)} onChange={(event) => onStep(id, event.target.value)}/>
          </FlexBox>
        );
      };
    const extraToolBar = <FlexBox direction={FlexBoxDirection.Row}>
            <Button icon="copy" onClick={() => console.log("Copy")}/>
            <Button icon="paste" onClick={() => console.log("Paste")}/>
        </FlexBox>;
    return (
        <SearchableCardGrid cardCollection={props.cardDefinitions} getExtraCardComponent={getOwnedDetailsView} extraToolBarComponent={extraToolBar}/>
    );
}