import { Extension } from "../Model/Extension";

export class ExtensionService{
    static async CreateNewExtension(newExtension : Extension){
        //let res = await fetch(`https://localhost:44390/admin/CreateNewExtension`,{
        //    method:"POST",
        //    body: JSON.stringify(newExtension),
        //    headers: {
        //        'Accept': 'application/json, text/plain, */*',
        //        'Content-Type': 'application/json'
        //    }
        //}).catch((result) => {return result;})
        //return res.status;
        console.log(newExtension);
    }
}