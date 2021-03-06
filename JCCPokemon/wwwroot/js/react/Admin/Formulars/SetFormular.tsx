import * as React from "react";
import { BlocService } from "../../ApiWebService/BlocService";
import Bloc from "../../Model/Bloc";
import { Extension } from "../../Model/Extension";
import { ExtensionService } from "../../ApiWebService/ExtensionService";

interface ExtensionState{
    blocs : Bloc[], 
    blocOpts : any[], 
    myLogo: any,
    mySymbol: any,
    titleText: string,
    englishStyle : any,
    frenchStyle : any
}

export default class SetFormular extends React.Component<{},ExtensionState>{
    constructor(props){
        super(props);
        this.state = {
            blocs : [],
            blocOpts : [],
            myLogo : null,
            mySymbol : null,
            titleText : "Création d'une Extension",
            frenchStyle: null,
            englishStyle: null
        }
        
        BlocService.GetAllBlocs()
            .then((blocs) => {
                this.setState({
                    blocs : blocs,
                    blocOpts : blocs.map(bloc => {
                        return <option value = {bloc.blocId}>{bloc.frenchName}</option>
                    })
                });
                
            });
    }

    sendRequest = async () =>{
        let frenchName = (document.getElementById("frenchName") as any);
        let englishName = (document.getElementById("englishName") as any);
        let curBloc = (document.getElementById("blocSelector") as any);
        let logoUp = (document.getElementById("LogoUploader") as any);
        let symbolUp = (document.getElementById("SymboleUploader") as any);

        if (frenchName.value == ""){
            this.frenchNameOnChange();
        }
        if (englishName.value == ""){
            this.englishNameOnChange();
        }
        if (englishName.value != "" && frenchName.value != ""){
            this.setState({titleText: "Traitement en cours ..."})
            let frName = frenchName.value;
            let enName = englishName.value;
            let blocId = curBloc.value;
            let logo = logoUp.files[0];
            let symbol = symbolUp.files[0];

            let newExtension = new Extension();
            newExtension.frenchName = frName;
            newExtension.englishName = enName;
            newExtension.blocId = blocId;

            let result = await ExtensionService.CreateNewExtension(newExtension, logo, symbol);
            if (result == 200){
                this.setState({titleText : "L'extension " + newExtension.frenchName + " a été créé !"});
            } else {
                this.setState({titleText: "La création de " + newExtension.frenchName + " n'a pas aboutit. Rééssayez plus tard."});
            }
        }
        
    }

    onLoadLogo = () => {
        let fileUploader = document.getElementById("LogoUploader") as any;
        
        let file = fileUploader.files[0];
        //this.setState({myImage : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.onload = (e : any) =>{
            this.setState({myLogo: e.target.result});
        };
        reader.readAsDataURL(file);
    }

    onLoadSymbol = () => {
        let fileUploader = document.getElementById("SymboleUploader") as any;
        
        let file = fileUploader.files[0];
        //this.setState({myImage : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.onload = (e : any) =>{
            this.setState({mySymbol: e.target.result});
        };
        reader.readAsDataURL(file);
    }

    frenchNameOnChange = () =>{
        let frName = document.getElementById("frenchName") as any;
        if (frName.value == ""){
            this.setState({ frenchStyle : {border: "solid red 1px"}});
            frName.placeholder = "Empty name is invalid";
        } else {
            this.setState({frenchStyle : null});
            frName.placeholder = "Insérez le nom du Bloc";
        }
    }

    englishNameOnChange = () =>{
        
        let enName = document.getElementById("englishName") as any;
        if (enName.value == ""){
            this.setState({ englishStyle : {border: "solid red 1px"}});
            enName.placeholder = "Empty name is invalid";
        } else {
            this.setState({englishStyle : null});
            enName.placeholder = "Insérez le nom du Bloc";
        }
    }
    

    render(){

        return (
            <div>
                <h1 id="TitleForm">{this.state.titleText}</h1>
                    <div className="row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                        <div className="row">
                            <div className="col-lg-7 col-xs-12">
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <input type="text" name="frenchName" id="frenchName" onChange={this.frenchNameOnChange} style={this.state.frenchStyle} className="form-control" placeholder="Insérez le nom du Bloc"/>
                                    </div>
                                </div>
                             
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                    <input type="text" name="englishName" id="englishName" onChange={this.englishNameOnChange} style={this.state.englishStyle} className="form-control" width="50%" placeholder="Insérez le nom Anglais du Bloc"/>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                    <h2 label-for="yearSelector" className="col-lg-6 col-xs-6">Bloc associé :</h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <select className="form-control" id="blocSelector" name="blocSelector">
                                            {this.state.blocOpts}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                                <div className="col-lg-6 col-xs-12">
                                    <h2 label-for="LogoUploader" className="col-lg-6 col-xs-6">Logo de l'Extension :</h2>
                                    <input type="file" id="LogoUploader" accept="image/*" onChange={this.onLoadLogo}/>
                                    <img src={this.state.myLogo} height="150pt" width="150pt"/>       
                                </div>

                                
                                <div className="col-lg-6 col-xs-12">
                                    <h2 label-for="SymboleUploader" className="col-lg-6 col-xs-6">Symbole de l'Extension :</h2>  
                                    <input type="file" id="SymboleUploader" accept="image/*" onChange={this.onLoadSymbol}/>
                                    <img src={this.state.mySymbol} height="150pt" width="150pt"/>       
                                </div>
                        </div>
                    </div>
                    <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                        <button className="btn btn-primary" type="button" onClick={this.sendRequest} style={{marginRight: '5px'}}>Créer le Set</button>
                    </div>
            </div>
        )
    }
}