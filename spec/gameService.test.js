import CardServiceBase from '../services/CardServiceBase';
import GameService from '../services/GameService';
import mockCards from './mocks/mockCards';
import MockCardService from './mocks/MockCardService';

let gameService;
describe('Game Service', () => {
    beforeEach(() => {
        const cardService = new MockCardService();
        gameService = new GameService(cardService);
    });

    test('should be instance', () => {
        expect(gameService).toBeInstanceOf(GameService);
    });

    test('should have card service', () => {
        expect(gameService.cardService).toBeInstanceOf(CardServiceBase);
    });

    test('should add a card if there are no compareCards', () => {
        gameService.handleFlip(mockCards[0]);
        expect(gameService.compareCards.length).toBe(1);
    });

    test('should return false if two cards of different value are flipped', () => {
        gameService.handleFlip(mockCards[0]);
        const flipped = gameService.handleFlip(mockCards[1]);
        expect(flipped).toBe(false);
    });

    test('should empty compareCards if two cards of different value are flipped', () => {
        gameService.handleFlip(mockCards[0]);
        const flipped = gameService.handleFlip(mockCards[1]);
        expect(gameService.compareCards.length).toBe(0);
    });

    test('should return true if two cards of same value are flipped', () => {
        gameService.handleFlip(mockCards[0]);
        const flipped = gameService.handleFlip(mockCards[0]);
        expect(flipped).toBe(true);
    });

    test('should empty compareCards if two cards of same value are flipped', () => {
        gameService.handleFlip(mockCards[0]);
        gameService.handleFlip(mockCards[0]);
        expect(gameService.compareCards.length).toBe(0);
    });

    test('has same cards after shuffle', async () => {
        const shuffledCards = await gameService.getCardsAndShuffleDeck();
        expect(shuffledCards).toEqual(expect.arrayContaining(mockCards));
    });

    test('switches flip value of card', () => {
        const flippedCard = gameService.updateFlip(mockCards[0], false);
        expect(flippedCard.isFlipped).toBe(false);
    });

    test('should update cards by id', () => {
        const flippedCards = [...mockCards];
        flippedCards[0].isFlipped = true;
        flippedCards[1].isFlipped = true;
        const id = flippedCards[0].id;
        const compareId = flippedCards[1].id;
        const updatedCards = gameService.handleDifferentCards(flippedCards, id, compareId);
        expect(updatedCards[0].isFlipped).toBe(false);
        expect(updatedCards[1].isFlipped).toBe(false);
    });
})