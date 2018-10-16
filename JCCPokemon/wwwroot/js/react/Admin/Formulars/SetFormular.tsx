import * as React from "react";
import ImageUploaderTemp from "../../ImageUploaderTemp";
import { BlocService } from "../../ApiWebService/BlocService";
import Bloc from "../../Model/Bloc";

export default class SetFormular extends React.Component<{},{blocs : Bloc[], blocOpts : any[]}>{
    constructor(props){
        super(props);
        this.state = {
            blocs : [],
            blocOpts : []
        }
        
        BlocService.GetAllBlocs()
            .then((blocs) => {
                this.setState({
                    blocs : blocs,
                    blocOpts : blocs.map(bloc => {
                        return <option value = {bloc.idBloc}>{bloc.frenchName}</option>
                    })
                });
                
            });
    }
    
    /*
    renderSelectOption = () => {
        this.state.blocs.map((bloc) => {
                return <option value={bloc.idBloc}>{bloc.frenchName}</option>
        })
    }*/

    render(){

        return (
            <div>
                <h1 id="TitleForm">Creation de Set</h1>
                    <div className="row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                        <div className="row">
                            <div className="col-lg-7 col-xs-12">
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <input type="text" name="frenchName" id="frenchName" onChange={() => console.log("texte changed")} /*style={this.state.frenchStyle}*/ className="form-control" placeholder="Insérez le nom du Bloc"/>
                                    </div>
                                </div>
                             
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                    <input type="text" name="englishName" id="englishName" onChange={() => console.log("texte changed")} /*style={this.state.englishStyle}*/ className="form-control" width="50%" placeholder="Insérez le nom Anglais du Bloc"/>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                    <h2 label-for="yearSelector" className="col-lg-6 col-xs-6">Bloc associé :</h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <select className="form-control" id="yearSelector" name="yearSelector">
                                            {this.state.blocOpts}
                                        </select>
                                    </div>
                                </div>

                                <ImageUploaderTemp/>

                                <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                                    <button className="btn btn-primary" type="button" onClick={() => console.log("Envoi au serveur")}>Créer le Set</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
            </div>
        )
    }
}