import Card from "../classes/Card";
import IGameService from "../interfaces/IGameService";
import CardServiceBase from "./CardServiceBase";

export default class GameService implements IGameService {
    constructor(cardService: CardServiceBase) {
        this.cardService = cardService;
        const columns = Math.ceil(cardService.cardCount / 5);

        // some logic to base columns on number of cards
        if (columns !== 4) {
            this.boardStyle.gridTemplateColumns = `repeat(${columns},1fr)`;
        }
    }

    // properties
    cardService: CardServiceBase;
    maxMatch: number = 2;
    boardStyle: any = {};
    private compareCards: Card[] = [];

    // methods
    handleFlip(card: Card): boolean {
        this.compareCards.push(card);
        const allAreSame = this.compareCards.every(c => c.value === card.value);
        if (this.compareCards.length === this.maxMatch) {
            this.compareCards = [];
        } else if (!allAreSame) {
            this.compareCards = [];
        }
        return allAreSame;
    }

    handleDifferentCards(cards: Card[], compareId: string, Id: string): Card[] {
        const updatedCards = cards.map((c, i) => {
            if(compareId === c.id || Id === c.id) {
                return this.updateFlip(c, false);
            }
            return c;
        });
        return updatedCards;
    }

    async getCardsAndShuffleDeck(): Promise<Card[]> {
        const cards = await this.cardService.getCards();
        this.cardService.shuffleCards(cards);
        return cards;
    }

    updateFlip(card: Card, value: boolean): Card {
        return {...card, isFlipped: value};
    }
}