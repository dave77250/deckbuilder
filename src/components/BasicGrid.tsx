import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";
import { PropsWithChildren, ReactElement } from "react";

export type GridProps = {
    columns: number
};

function renderRow(elements: ReactElement[], position: number, columns: number) {
    const items = elements.slice(position, Math.min(position + columns, elements.length))
    return (
        <FlexBox key={`row-${position}`}direction={FlexBoxDirection.Row} style={{width: '100%'}}>
            {items.map((i, index) => (
                <FlexBox key={`cell-${position+index}`}direction={FlexBoxDirection.Row} style={{width: `${Math.floor(100/columns)}%`}}>
                    {i}
                </FlexBox>
            ))}
        </FlexBox>
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
    const rows: ReactElement[] = [];
    for(let i = 0; i < nbRows; i++) {
        rows.push(renderRow(childrenArray, i * props.columns, props.columns));
    }
    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{ width: '100%' }}>
            {rows}
        </FlexBox>
    )
}