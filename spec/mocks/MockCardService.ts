import Card from "../../classes/Card";
import CardServiceBase from "../../services/CardServiceBase";
import mockCards from "./mockCards";

export default class MockCardService extends CardServiceBase {
    public getCards(): Promise<Card[]> {
        return new Promise((res, rej) => {
            const cards = mockCards;
            res(cards);
        })
    }
    public cardCount: number = 5;
}