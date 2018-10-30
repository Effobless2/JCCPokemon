import { Extension } from "../Model/Extension";

class ExtensionDatas{
    extensionId? : string;
    frenchName : string;
    englishName : string;
    blocId : string;
    imageInfos : any
}

export class ExtensionService{

    static async CreateNewExtension(newExtension : Extension, logo: any, symbol : any){
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
        xhr.open("POST","/Admin/CreateNewExtension");
        xhr.onload = () => {
            console.log(xhr.status);
        }
        xhr.send(f);
    }
}