import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, StepInput, Button, FileUploader } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { CardCollection } from "../model/Collection";
import { SearchableCardGrid } from "./SearchableCardGrid";
import "@ui5/webcomponents-icons/dist/upload.js"

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
              <StepInput value={props.collection.get(id)} min={0} onChange={(event) => onStep(id, event.target.value)}/>
          </FlexBox>
        );
      };
    const extraToolBar = <FlexBox direction={FlexBoxDirection.Row}>
            <FileUploader
                hideInput
                accept=".csv"
                multiple={false}
                onChange={(event) => {
                    const files = event?.detail?.files;
                    if ((files?.length ?? 0) > 0) {
                        const file = files?.item(0);
                        const reader = new FileReader();
                        reader.readAsText(file as any as Blob, "UTF-8");
                        reader.onloadend = (readerEvent) => {
                            if (readerEvent?.target?.result) {
                                const csv = readerEvent?.target?.result;
                                console.log("CSV read :");
                                console.log(csv);
                            }
                        }
                    }
                }}
                valueState="None"
            >
                <Button icon="upload"/>
            </FileUploader>
        </FlexBox>;
    return (
        <SearchableCardGrid cardCollection={props.cardDefinitions} getExtraCardComponent={getOwnedDetailsView} extraToolBarComponent={extraToolBar}/>
    );
}