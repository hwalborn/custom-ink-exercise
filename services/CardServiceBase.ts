import Card from "../classes/Card";
import APICacheService from "./APICacheService";

abstract class CardServiceBase{
    protected apiCacheService: APICacheService;
    constructor(apiCacheService: APICacheService) {
        this.apiCacheService = apiCacheService;
    }

    public abstract getCards(): Promise<Card[]>
    public abstract cardCount: number;

    shuffleCards(cards: Card[]): Card[] {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }
}

export default CardServiceBase;