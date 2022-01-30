import Card from "../classes/Card";
import IGameService from "../interfaces/IGameService";

export type GameSelectProps = {
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type BoardProps = {
    gameService: IGameService;
    handleGameWon: () => void;
}

export type CardProps = {
    card: Card;
    index: number;
    handleFlip: (card: Card, index: number) => void;
}