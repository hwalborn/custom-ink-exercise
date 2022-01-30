import APICacheService from "./APICacheService";
import GameService from "./GameService";
import PlayingCardService from "./playingCard/PlayingCardService";
import PokemonCardService from "./pokemon/PokemonCardService";

export default function(gameName: string) {
    const apiCacheService = new APICacheService();
    switch (gameName) {
        case 'pokemon':
            return new GameService(new PokemonCardService(apiCacheService));
        case 'playing-card':
            return new GameService(new PlayingCardService(apiCacheService));
        default:
            throw new Error(`no service found with name ${gameName}`);
    }
}