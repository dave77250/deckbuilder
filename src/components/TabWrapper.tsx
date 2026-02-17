import { Tab, TabContainer } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/card.js";

import { Card, CardId } from '../model/Card';
import { CardCollectionView } from './CardCollectionView';
import React from 'react';

export interface TabWrapperProps {
    cards: Card[]
};

export function TabWrapper(props: TabWrapperProps) {
  const cardCollection = new Map<CardId, number>();
  const [collectionUpdated, setCollectionUpdated] = React.useState(false);
  const setInCollection = (id: CardId, owned: number) => {
    cardCollection.set(id, owned);
    setCollectionUpdated(!collectionUpdated);
  };
  return (
    <TabContainer
      contentBackgroundDesign="Solid"
      headerBackgroundDesign="Solid"
      tabLayout="Standard"
      style={{width: '100%'}}
    >
      <Tab
        icon="list"
        selected
        text="Ma collection de cartes"
      >
        <CardCollectionView cardDefinitions={props.cards} collection={cardCollection} setInCollection={setInCollection}/>
      </Tab>
      <Tab
        icon="card"
        text="Deck Builder"
      >
        Deck Builder
      </Tab>
    </TabContainer>
  );
}
