import Card from "../classes/Card";
import CardServiceBase from "../services/CardServiceBase";

interface IGameService {
    boardStyle: any;
    cardService: CardServiceBase;
    maxMatch: number;
    getCardsAndShuffleDeck(): Promise<Card[]>;
    handleFlip(card: Card): boolean;
    handleDifferentCards(cards: Card[], compareId: string, Id: string): Card[];
    updateFlip(card: Card, value: boolean): Card;
}

export default IGameService;