import { Pokemon } from "../Model/Pokemon";

export default class PokemonService{
    static async CreateNewPokemon(newPokemon : Pokemon, image : any) : Promise<any>{
        let f = new FormData();

        f.append("EnglishName", newPokemon.englishName);
        f.append("FrenchName", newPokemon.frenchName);
        f.append("NumPokedex", newPokemon.numPokedex+"");
        f.append("PokemonImage", image);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "/Admin/CreateNewPokemon");

        return new Promise((resolve, reject) => {
            xhr.onload = () =>{
                if (xhr.status != 200) {
                    reject(xhr.status);
                } else {
                    resolve(xhr.status);
                }
            };
            xhr.onerror =  () => {
                reject(xhr.status);
            };
            xhr.onloadend = () =>{
                if (xhr.status != 200){
                    reject(xhr.status);
                }
                else{
                    resolve(xhr.status);
                }
            }  
            xhr.send(f);
        }).then(() => {
            return xhr.status
        }).catch(err => {return err;});
    }
}