import { Extension } from "../Model/Extension";

export class ExtensionService{

    static async CreateNewExtension(newExtension : Extension, logo: any, symbol : any) : Promise<any>{
        let f = new FormData();
        f.append("englishName", newExtension.englishName);
        f.append("frenchName", newExtension.frenchName);
        f.append("blocId", newExtension.blocId);
        f.append("logo", logo);
        f.append("symbol", symbol);
        /*
        f.append("image", image);
        f.append("newExtension", JSON.stringify(newExtension));*/
        let xhr = new XMLHttpRequest();
        xhr.open("POST","/api/Extension/CreateNewExtension");

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

    static async GetAllExtensions() : Promise<Extension[]>{
        let res = await fetch("https://localhost:44390/api/Extension/GetAllExtensions", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).catch((result) => {return result;})
        if (res.status == 200){
            let json = await res.json();
            let extensions = json.map(e => {
                return e;
            }) as Extension[];
            return extensions;
        }
    }
}