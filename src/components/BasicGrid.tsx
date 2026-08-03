import { FlexBox, FlexBoxDirection } from "@ui5/webcomponents-react";
import { PropsWithChildren, ReactElement } from "react";
import { useIsVisible } from "./UseIsVisible";

export type GridProps = {
    columns: number
};

type GridRowProps = {
    elements: ReactElement[],
    columns: number
}

function GridRow(props: GridRowProps) {
  const [ref, isVisible] = useIsVisible<HTMLDivElement>({
    rootMargin: '200px',
    once: true, // stays loaded once shown, doesn't unmount on scroll away
  });

  return (
    <div ref={ref} style={{ minHeight: 200 }}>
      {isVisible ? (
        <FlexBox key={`row-${position}`}direction={FlexBoxDirection.Row} style={{width: '100%'}}>
            {props.elements.map((i, index) => (
                <FlexBox key={`cell-${position+index}`}direction={FlexBoxDirection.Row} style={{width: `${Math.floor(100/props.columns)}%`}}>
                    {i}
                </FlexBox>
            ))}
        </FlexBox>
      ) : (
        <div className="placeholder" style={{ width: '100%', height: 200, background: 'green' }} />
      )}
    </div>
  );
}

function renderRow(elements: ReactElement[], position: number, columns: number) {
    const items = elements.slice(position, Math.min(position + columns, elements.length))
    return <GridRow elements={items} columns={props.columns}/>;
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