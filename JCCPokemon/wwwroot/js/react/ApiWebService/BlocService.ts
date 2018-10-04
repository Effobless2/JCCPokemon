import Bloc from "../Model/Bloc";

export class BlocService{
    static async CreateNewBloc(newBloc : Bloc){
        
        console.log(newBloc);
        let res = await fetch(`https://localhost:44390/admin/CreateNewBloc`,{
            method:"POST",
            body: JSON.stringify(newBloc),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
    }
}