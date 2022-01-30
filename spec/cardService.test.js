import mockCards from "./mocks/mockCards";
import MockCardService from "./mocks/MockCardService";

let cardService;
describe('Card Service', () => {
    beforeEach(() => {
        cardService = new MockCardService();
    });

    it('should get cards', async () => {
        const cards = await cardService.getCards();
        expect(cards).toEqual(expect.arrayContaining(mockCards));
    });

    it('should have a count property equal to number of cards', async () => {
        const cards = await cardService.getCards();
        expect(cards.length).toEqual(cardService.cardCount);
    });
});