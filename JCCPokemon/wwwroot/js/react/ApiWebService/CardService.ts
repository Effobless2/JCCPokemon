import Card from "../Model/Card";

export default class CardService{
    static async createNewCard(newCard : Card, imageCard : any) : Promise<any>{
        let form = new FormData();

        form.append("EnglishName", newCard.englishName);
        form.append("FrenchName", newCard.frenchName);
        form.append("rarityId", newCard.rarityId);
        form.append("extensionId", newCard.extensionId);
        form.append("numCard", newCard.numCard);
        form.append("maxNum", newCard.maxNum);
        form.append("imageCard", imageCard);

        let xhr = new XMLHttpRequest();
        xhr.open("POST","/api/Card/CreateNewCard");

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
            xhr.send(form);
        }).then(() => {
            return xhr;
        }).catch(err => {return err;});
    }
}