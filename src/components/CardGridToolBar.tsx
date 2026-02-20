import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, Input, Select, Option } from "@ui5/webcomponents-react";
import { ReactNode, useEffect } from "react";

export type CardGridToolBarProps = {
    nbCols: number,
    onSearch: (searchedText: string) => void,
    onColumnNbChange: (nbCols: number) => void,
    extraToolBarComponent?: ReactNode
};

export function CardGridToolBar(props: CardGridToolBarProps) {
    let searchTimeout = undefined;
    const COL_OPTIONS = ['1 col', '2 cols', '3 cols', '4 cols', '5 cols', '6 cols'];
    const onColsChange = (newCols: string) => {
        const index = COL_OPTIONS.findIndex(c => c === newCols);
        if (index !== -1) {
            props.onColumnNbChange(index + 1);
        }
    };
    const onTextTyped = (text: string) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setTimeout(() => {
            props.onSearch(text);
        }, 400);
    };
    useEffect(() => () => {
        if(searchTimeout) {
            clearTimeout(searchTimeout);
        }
    });
    return (
        <FlexBox direction={FlexBoxDirection.Row} fitContainer={true} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
            <Input showClearIcon={true} placeholder="Chercher une carte" onChange={(event) => onTextTyped(event.target.value)}></Input>
            <FlexBox direction={FlexBoxDirection.Row}>
                <Select onChange={(event) => onColsChange(event.target.value)}>
                    {COL_OPTIONS.map((c, i) => <Option selected={i === props.nbCols - 1}>{c}</Option>)}
                </Select>
                {props.extraToolBarComponent ?? null}
            </FlexBox>
        </FlexBox>
    )
}