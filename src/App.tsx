import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/card.js";
import { useEffect, useState } from 'react';
import { Card, loadCards } from './model/Card';
import { TabWrapper } from './components/TabWrapper';

function App() {
  const [cards, setCards] = useState<Card[] | undefined>(undefined);
  useEffect(() => {
    loadCards().then(setCards);
  });
  return cards ? <TabWrapper cards={cards}/> : <div>Still loading...</div>
}

export default App;
