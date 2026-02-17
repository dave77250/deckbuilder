import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";
import { PropsWithChildren, ReactElement } from "react";

export type GridProps = {
    columns: number
};

function renderRow(elements: ReactElement[], position: number, columns: number) {
    const items = elements.slice(position, Math.min(position + columns, elements.length))
    return (
        <FlexBox direction={FlexBoxDirection.Row}>{items}</FlexBox>
    );
}

export function BasicGrid(props: PropsWithChildren<GridProps>) {
    let childrenArray: ReactElement[] = [];
    if (Array.isArray(props.children)) {
        childrenArray = props.children as ReactElement[];
    } else {
        const singleChild = props.children as ReactElement;
        childrenArray = [singleChild];
    }
    const nbRows = Math.ceil(childrenArray.length / props.columns);
    const rows = [];
    for(let i = 0; i < nbRows; i++) {
        rows.push(renderRow(childrenArray, i * props.columns, props.columns));
    }
    return (
        <FlexBox direction={FlexBoxDirection.Column}>{rows}</FlexBox>
    )
}