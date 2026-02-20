import { FlexBox, FlexBoxDirection } from '@ui5/webcomponents-react';
import React, { useState } from 'react';
import { CardGridToolBar } from './CardGridToolBar';
import { getColumns, setColumns } from '../model/Preferences';
import { Card } from '../model/Card';
import { BasicGrid } from './BasicGrid';
import { CardView } from './CardView';

export type SeachableCardGridProps = {
    cardCollection: Card[],
    extraToolBarComponent?: React.Component
};

export function SearchableCardGrid(props: SeachableCardGridProps) {
    const [displayedCards, setDisplayedCards] = useState(props.cardCollection);
    const [nbCols, setNbCols] = useState(getColumns()) ;
    const changeNbCols = (nbCols: number) => {
        setNbCols(nbCols);
        setColumns(nbCols);
    }
    const performSearch = (searchedText: string) => {
        const foundCards = props.cardCollection.filter(c => c.name.indexOf(searchedText) !== -1);
        setDisplayedCards(foundCards);
    }
    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{width: '100%'}}>
            <CardGridToolBar nbCols={nbCols} onColumnNbChange={changeNbCols} onSearch={performSearch}/>
            <BasicGrid columns={nbCols}>
                {displayedCards.map(card => {
                    return (
                        <FlexBox key={card.id} direction={FlexBoxDirection.Column} style={{ padding: '5px'}}>
                            <CardView card={card}/>
                        </FlexBox>);
                })}
            </BasicGrid>
        </FlexBox>
    );
}