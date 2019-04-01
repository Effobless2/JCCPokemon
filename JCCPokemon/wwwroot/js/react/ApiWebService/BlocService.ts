import Bloc from "../Model/Bloc";

export class BlocService{
    static async CreateNewBloc(newBloc : Bloc){
        let res = await fetch(`https://localhost:44390/api/Bloc/CreateNewBloc`,{
            method:"POST",
            body: JSON.stringify(newBloc),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).catch((result) => {return result;})
        return res.status;
    }

    static async GetAllBlocs(){
        let res = await fetch('https://localhost:44390/api/Bloc/GetAllBlocs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).catch((result) => {return result;})
        if (res.status == 200){
            let json = await res.json();
            let comments = json.map(d => {
                return d;
            }) as Bloc[];
            return comments;
        }
    }
}