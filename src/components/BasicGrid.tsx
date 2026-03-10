import { FlexBox, FlexBoxDirection, FlexBoxJustifyContent, Button, Text } from "@ui5/webcomponents-react";
import { PropsWithChildren, ReactElement, useState } from "react";

export type GridProps = {
    rows: number,
    columns: number
};

function renderRow(elements: ReactElement[], position: number, columns: number) {
    const items = elements.slice(position, Math.min(position + columns, elements.length))
    return (
        <FlexBox key={`row-${position}`}direction={FlexBoxDirection.Row} style={{width: '100%'}}>
            {items.map(i => (
                <FlexBox key={`row-${position}`}direction={FlexBoxDirection.Row} style={{width: `${Math.floor(100/columns)}%`}}>
                    {i}
                </FlexBox>
            ))}
        </FlexBox>
    );
}

export function BasicGrid(props: PropsWithChildren<GridProps>) {
    const [currentPage, setCurrentPage] = useState(0);
    let childrenArray: ReactElement[] = [];
    if (Array.isArray(props.children)) {
        childrenArray = props.children as ReactElement[];
    } else {
        const singleChild = props.children as ReactElement;
        childrenArray = [singleChild];
    }
    const pageSize = props.rows * props.columns;
    const nbPages = Math.ceil(childrenArray.length / pageSize);
    // reset the page to first page if the contents has become smaller
    if (pageSize * currentPage > childrenArray.length) {
        setCurrentPage(0);
    }    
    const displayedChildren = nbPages > 1
        ? childrenArray.slice(pageSize * currentPage, pageSize * (currentPage + 1))
        : childrenArray;
    const nbRows = Math.ceil(childrenArray.length / props.columns);
    const rows: ReactElement[] = [];
    for(let i = 0; i < nbRows; i++) {
        rows.push(renderRow(displayedChildren, i * props.columns, props.columns));
    }
    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{ width: '100%' }}>
            {rows}
            { nbPages > 1
                ? <FlexBox direction={FlexBoxDirection.Row} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                    <Button disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</Button>
                    <Text>{`${currentPage + 1} / ${nbPages}`}</Text>
                    <Button disabled={currentPage >= nbPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</Button>
                </FlexBox>
                : null    
            }
        </FlexBox>
    )
}