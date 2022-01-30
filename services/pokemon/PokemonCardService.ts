import CardServiceBase from "../CardServiceBase";
import Card from '../../classes/Card';

class PokemonCardService extends CardServiceBase {
    public cardCount: number = 20;
    public getCards(): Promise<Card[]> {
        return new Promise(async (res, rej) => {
            try {
                const results = await this.apiCacheService.makeCachedRequest('https://pokeapi.co/api/v2/pokemon/?limit=10');
                const cards = results.map((pokemon: any) => {

                    // there's no id property on the response, but we can grab it from the url property
                    const id = pokemon.url.split('/pokemon/')[1].replace(/\//g, '');
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    return new Card(pokemon.name, imageUrl, id);
                })

                // create duplicates
                res([...cards, ...cards]);
            } catch (error) {
                rej(error);
            }
        });
    }
}

export default PokemonCardService;