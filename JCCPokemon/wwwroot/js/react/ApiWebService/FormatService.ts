import { Format } from "../Model/Format";

export class FormatService{
    static async CreateNewFormat(newFormat : Format) : Promise<any> {
        let f = new FormData();

        f.append("EnglishName", newFormat.englishName);
        f.append("FrenchName", newFormat.frenchName);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "/api/Format/CreateNewFormat");

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

    static async GetAllFormats() : Promise<Format[]> {
        let res = await fetch("https://localhost:44390/api/Format/GetAllFormats",{
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).catch((result) => {return result});
        if (res.status == 200){
            let json = await res.json();
            let formats = json.map((format) => {
                return format;
            }) as Format[];
            return formats;
        }
    }
}