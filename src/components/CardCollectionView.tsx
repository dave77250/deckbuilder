import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, StepInput } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { CardCollection } from "../model/Collection";
import { SearchableCardGrid } from "./SearchableCardGrid";

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
    return (
        <SearchableCardGrid cardCollection={props.cardDefinitions} getExtraCardComponent={getOwnedDetailsView}/>
    );
}