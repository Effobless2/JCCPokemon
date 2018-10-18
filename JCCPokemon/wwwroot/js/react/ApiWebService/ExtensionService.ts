import { Extension } from "../Model/Extension";

class ExtensionDatas{
    extensionId? : string;
    frenchName : string;
    englishName : string;
    blocId : string;
    imageInfos : any
}

export class ExtensionService{

    static async CreateNewExtension(newExtension : Extension, image: any){
        let f = new FormData();
        f.append("EnglishName", newExtension.englishName);
        f.append("FrenchName", newExtension.frenchName);
        f.append("BlocId", newExtension.blocId);
        f.append("File", image);
        /*
        f.append("image", image);
        f.append("newExtension", JSON.stringify(newExtension));*/
        let xhr = new XMLHttpRequest();
        xhr.open("POST","/Admin/CreateNewExtension");
        xhr.onload = (response) => {
            console.log(response);
        }
        xhr.send(f)
    }
}