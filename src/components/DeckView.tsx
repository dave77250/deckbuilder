import { FormItem, StepInput, Form, Label } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { createDeck, pickCard, excludeCard } from "../model/Deck";
import { DeckCard, getAvailable } from "../model/DeckCard";
import { SearchableCardGrid } from "./SearchableCardGrid";
import { useState } from "react";
import { CardCollection } from "../model/Collection";

export type DeckViewProps = {
    collection: CardCollection,
    cardDefinitions: Card[]
}

export function DeckView(props: DeckViewProps) {
    const [deck, setDeck] = useState(createDeck(props.collection));
    const deckMap = new Map<CardId, DeckCard>();
    deck.forEach(dc => {
        deckMap.set(dc.id, dc);
    });
    const displayedCards = props.cardDefinitions.filter(card => {
        const deckCard = deckMap.get(card.id);
        return getAvailable(deckCard) > 0 || (deckCard?.selected ?? 0) > 0;
    });
    const setIncluded = (id: CardId, nb:number) => {
      setDeck(pickCard(deck, props.cardDefinitions, id, nb));
    }
    const setExcluded = (id: CardId, nb: number) => {
      setDeck(excludeCard(deck, id, nb));
    }
    const getDeckDetailsView = (id: CardId) => {
        const deckCard = deckMap.get(id);
        return (
          <Form layout="S1 M2 L2 XL2">
            <FormItem labelContent={<Label>Sél.</Label>}>
              <StepInput value={deckCard?.selected} onChange={(event) => setIncluded(id, event.target.value)} min={0} max={getAvailable(deckCard)}/>
            </FormItem>
            <FormItem labelContent={<Label>Excl.</Label>}>
              <StepInput value={deckCard?.excluded} onChange={(event) => setExcluded(id, event.target.value)} min={0} max={getAvailable(deckCard)}/>
            </FormItem>
            <FormItem labelContent={<Label>Poss.</Label>}>
              <Label>{deckCard?.owned}</Label>
            </FormItem>
            <FormItem labelContent={<Label>Ind.</Label>}>
              <Label>{deckCard?.unavailable}</Label>
            </FormItem>
            <FormItem labelContent={<Label>Dispo</Label>}>
              <Label>{getAvailable(deckCard)}</Label>
            </FormItem>
          </Form>
        );
      };
    return (
        <SearchableCardGrid cardCollection={displayedCards} getExtraCardComponent={getDeckDetailsView}/>
    );
}