import { Tab, TabContainer } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/card.js";
import { Card, CardId } from '../model/Card';
import { CardCollectionView } from './CardCollectionView';
import { useState } from 'react';
import { loadCollection, setOwned } from '../model/Collection';
import { DeckView } from './DeckView';
import { map2Json } from '../model/Helpers';

export interface TabWrapperProps {
    cards: Card[]
};

function getCollectionKey(collection: CardCollection) {
  const BASE = 'coll-';
  const nb = collection.keys().reduce((k, total) => {
    return total + (collection.get(k) ?? 0);
  }, 0);
  return base + Number.toString(nb);
}

export function TabWrapper(props: TabWrapperProps) {
  console.log('Rendering TabWrapper')
  const [collection, setCollection] = useState(loadCollection(props.cards));
  console.log(JSON.stringify(map2Json(collection)));
  const setInCollection = (id: CardId, owned: number) => {
    console.log('Collection updated');
    setCollection(setOwned(collection, id, owned));
  };
  // TODO Le deck ne prend pas en compte les changements sur la collection de cartes
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
        <CardCollectionView cardDefinitions={props.cards} collection={collection} setInCollection={setInCollection}/>
      </Tab>
      <Tab
        icon="card"
        text="Deck Builder"
      >
        <DeckView key={getCollectionKey(collection)} cardDefinitions={props.cards} collection={collection}/>
      </Tab>
    </TabContainer>
  );
}
