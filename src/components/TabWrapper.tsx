import { FlexBox, FlexBoxDirection, Tab, TabContainer } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/card.js";

import { Card } from '../model/Card';
import { CardView } from './CardView';

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
        <FlexBox direction={FlexBoxDirection.Row} style={{ width: '100%' }}>
            {props.cards.map(card => {
                return <CardView card={card}/>
            })}
        </FlexBox>
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
