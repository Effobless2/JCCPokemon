import { Format } from "../Model/Format";

export class FormatService{
    static async CreateNewFormat(newFormat : Format) : Promise<any> {
        let f = new FormData();

        f.append("EnglishName", newFormat.englishName);
        f.append("FrenchName", newFormat.frenchName);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "/Admin/CreateNewFormat");

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