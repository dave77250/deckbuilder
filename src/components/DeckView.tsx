import { FormItem, StepInput, Form, Label } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { Deck } from "../model/Deck";
import { DeckCard, getAvailable } from "../model/DeckCard";
import { SearchableCardGrid } from "./SearchableCardGrid";

export type DeckViewProps = {
    cardDefinitions: Card[],
    deck: Deck
}

export function DeckView(props: DeckViewProps) {
    const deckMap = new Map<CardId, DeckCard>();
    props.deck.forEach(dc => {
        deckMap.set(dc.id, dc);
    });
    const displayedCards = props.cardDefinitions.filter(card => {
        const deckCard = deckMap.get(card.id);
        return getAvailable(deckCard) > 0 || (deckCard?.selected ?? 0) > 0;
    });
    const getDeckDetailsView = (id: CardId) => {
        const deckCard = deckMap.get(id);
        return (
          <Form layout="S1 M2 L2 XL2">
            <FormItem labelContent={<Label>Sél.</Label>}>
              <StepInput value={deckCard?.selected} onChange={(event) => console.log(event.target.value)} min={0} max={getAvailable(deckCard)}/>
            </FormItem>
          </Form>
        );
      };
    return (
        <SearchableCardGrid cardCollection={displayedCards} getExtraCardComponent={getDeckDetailsView}/>
    );
}