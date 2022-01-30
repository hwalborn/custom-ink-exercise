import Card from "../../classes/Card";
import CardServiceBase from "../CardServiceBase";

export default class PlayingCardService extends CardServiceBase {
    public getCards(): Promise<Card[]> {
        return new Promise(async (res, rej) => {
            try {
                const cardStyle = {
                    padding: 0,
                    height: '15vh',
                    width: '5vw',
                    borderRadius: '0px'
                }
                let results = await this.apiCacheService.makeCachedRequest('https://deckofcardsapi.com/api/deck/sxsl3rnemmms/draw/?count=52', 'cards');
                if (!results.length) {
                    // there's an issue where the deck we get might be empty, we need to re-shuffle and try again
                    await this.apiCacheService.makeApiRequest('https://deckofcardsapi.com/api/deck/sxsl3rnemmms/shuffle/', 'remaining');
                    results = await this.apiCacheService.makeCachedRequest('https://deckofcardsapi.com/api/deck/sxsl3rnemmms/draw/?count=52', 'cards');
                }
                const cards = results.map((card: any) => {
                    return new Card(card.value, card.image, card.code, false, cardStyle);
                })

                res(cards);
            } catch (error) {
                rej(error);
            }
        });
    }
    public cardCount: number = 52;

}