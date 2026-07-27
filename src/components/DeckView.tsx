import { FormItem, StepInput, Form, Label, Switch, MessageStrip, FlexBox, FlexBoxDirection, FlexBoxJustifyContent, Button } from "@ui5/webcomponents-react";
import { Card, CardId } from "../model/Card"
import { createDeck, pickCard, excludeCard, DECK_SIZE, Deck, getDeckSize, getDeckColors, MAX_COLORS, completeDeck } from "../model/Deck";
import { DeckCard, getAvailable } from "../model/DeckCard";
import { SearchableCardGrid } from "./SearchableCardGrid";
import { useState } from "react";
import { CardCollection } from "../model/Collection";
import { debugLog } from "../tools/Debug";

export type DeckViewProps = {
    collection: CardCollection,
    cardDefinitions: Card[]
}

enum DeckBuilderState {
  NotEnoughCards,
  NeedMoreColors,
  PartialDeck,
  CompleteDeck
};

function computeDeckState(deck: Deck, allCards: Card[]): DeckBuilderState {
  debugLog('Computing deck state for deck');
  debugLog(deck);
  debugLog('deck size = ' + getDeckSize(deck).toString());
    if (getDeckSize(deck) === DECK_SIZE) {
        return DeckBuilderState.CompleteDeck;
    }
    const deckMap = new Map<CardId, DeckCard>();
    deck.forEach(dc => {
        deckMap.set(dc.id, dc);
    });
    const cards4Deck = allCards.reduce((total, card) => {
        const deckCard = deckMap.get(card.id);
        return total + getAvailable(deckCard) + (deckCard?.selected ?? 0);
    }, 0);
    debugLog('cards potential = ' + cards4Deck.toString());
    if (cards4Deck < DECK_SIZE) {
        return DeckBuilderState.NotEnoughCards;
    }
    const deckColors = getDeckColors(deck, allCards);
    debugLog('deck colors = ' + JSON.stringify(deckColors));
    if (deckColors.length < MAX_COLORS) {
        return DeckBuilderState.NeedMoreColors;
    }
    // tous les autres cas: deck partiel, possible de compléter
    return DeckBuilderState.PartialDeck;
}

function getHeaderMessage(state: DeckBuilderState, doCompleteDeck: () => void, doNextDeck: () => void) {
    switch(state) {
      case DeckBuilderState.NotEnoughCards:
        return <MessageStrip design="Critical" hideCloseButton={true}>Désolé, vous n'avez pas assez de cartes pour créer un deck</MessageStrip>;
      case DeckBuilderState.NeedMoreColors:
        return <MessageStrip design="Information" hideCloseButton={true}>Choisissez des cartes de 2 couleurs différentes pour créer votre deck.</MessageStrip>
      case DeckBuilderState.PartialDeck:
        return <FlexBox direction={FlexBoxDirection.Row} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
            <MessageStrip design="Positive" hideCloseButton={true}>Cliquez sur le bouton pour compléter automatiquement ce deck.</MessageStrip>
            <Button onClick={doCompleteDeck}>Compléter</Button>
        </FlexBox>
      case DeckBuilderState.CompleteDeck:
        return <FlexBox direction={FlexBoxDirection.Row} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
            <MessageStrip design="Positive" hideCloseButton={true}>Deck complet, cliquez sur le bouton pour créer un autre deck sans ces cartes.</MessageStrip>
            <Button onClick={doNextDeck}>Deck suivant</Button>
        </FlexBox>
    }
}

export function DeckView(props: DeckViewProps) {
    const [deck, setDeck] = useState(createDeck(props.collection));
    const [showDeckCardsOnly, setShowDeckCardsOnly] = useState(false);
    const deckState = computeDeckState(deck, props.cardDefinitions);
    const deckMap = new Map<CardId, DeckCard>();
    deck.forEach(dc => {
        deckMap.set(dc.id, dc);
    });
    const shouldDisplayCard: (card: DeckCard) => boolean = showDeckCardsOnly
      ? (card) => (card.selected > 0)
      : (card) => ((getAvailable(card) > 0) || (card.selected > 0));
    const displayedCards = props.cardDefinitions.filter(card => {
        const deckCard = deckMap.get(card.id);
        return deckCard ? shouldDisplayCard(deckCard): false;
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
    // la toolbar pour le switch et le bouton reset
    const extraToolbar = <FlexBox direction={FlexBoxDirection.Row} alignItems="Center">
      <Switch checked={showDeckCardsOnly} onChange={() => {setShowDeckCardsOnly(!showDeckCardsOnly);}}/>
      <Label>{showDeckCardsOnly?"Cartes du deck":"Toutes les cartes"}</Label>
    </FlexBox>;
    return (
      <>
        {getHeaderMessage(deckState, () => {
          debugLog('Now calling completeDeck');
          setDeck(completeDeck(deck, props.cardDefinitions));
          }, () => {debugLog("New deck placeholder")})}
        <SearchableCardGrid
          cardCollection={displayedCards}
          getExtraCardComponent={getDeckDetailsView}
          extraToolBarComponent={extraToolbar}
        />
      </>
    );
}