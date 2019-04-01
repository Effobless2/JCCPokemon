import { Rarity } from "../Model/Rarity";

export class RarityService{
    static async createNewRarity(rarity : Rarity, logo : any) : Promise<any>{
        let f = new FormData();
        console.log(logo)
        f.append("englishName", rarity.englishName);
        f.append("frenchName", rarity.frenchName);
        f.append("logo", logo);
        /*
        f.append("image", image);
        f.append("rarity", JSON.stringify(rarity));*/
        let xhr = new XMLHttpRequest();
        xhr.open("POST","/api/Rarity/CreateNewRarity");

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