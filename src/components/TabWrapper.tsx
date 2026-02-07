import { Tab, TabContainer } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/card.js";

import { Card } from '../model/Card';

export interface TabWrapperProps {
    cards: Card[]
};

export function TabWrapper(props: TabWrapperProps) {
  return (
    <TabContainer
      contentBackgroundDesign="Solid"
      headerBackgroundDesign="Solid"
      onMove={function qK(){}}
      onMoveOver={function qK(){}}
      onTabSelect={function qK(){}}
      tabLayout="Standard"
    >
      <Tab
        icon="list"
        selected
        text="Ma collection de cartes"
      >
        {JSON.stringify(props.cards)}
      </Tab>
      <Tab
        icon="card"
        text="Deck Builder TBD"
      >
        Deck Builder
      </Tab>
    </TabContainer>
  );
}
