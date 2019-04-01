import * as React from "react";
import { Format } from "../../Model/Format";
import { FormatService } from "../../ApiWebService/FormatService";

interface FormatFormularState{
    titleText: string,
    englishStyle : any,
    frenchStyle : any
}
export default class FormatFormular extends React.Component<any, FormatFormularState> {

    constructor(props){
        super(props)
        this.state = {
            titleText : "Création d'une Extension",
            frenchStyle: null,
            englishStyle: null
        }
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

    sendRequest = async () =>{
        let frenchName = (document.getElementById("frenchName") as any);
        let englishName = (document.getElementById("englishName") as any);

        if (englishName.value == ""){
            this.englishNameOnChange();
        }
        if (frenchName.value == ""){
            this.frenchNameOnChange();
        }
        if (frenchName.value != "" && englishName.value != ""){
            this.setState({titleText: "Traitement en cours ..."})
            let frName = frenchName.value;
            let enName = englishName.value;

            let newFormat = new Format();
            newFormat.frenchName = frName;
            newFormat.englishName = enName;

            let result = await FormatService.CreateNewFormat(newFormat);
            if (result == 200){
                this.setState({titleText : "Le format " + frName + " a été créé !"});
            } else {
                this.setState({titleText: "La création de " + frName + " n'a pas aboutit. Rééssayez plus tard."});
            }
        }
    }

    render() {
        return (
            <div>
                <h1 id="TitleForm">{this.state.titleText}</h1>
                <div className="row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            
                            <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input 
                                        type="text" 
                                        name="englishName" 
                                        id="englishName" 
                                        onChange={this.englishNameOnChange} 
                                        style={this.state.englishStyle} 
                                        className="form-control" 
                                        width="50%" 
                                        placeholder="Insérez le nom Anglais du Format"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Non Français :</h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Insérez le nom Français du Format"
                                        id = "frenchName"
                                        name = "frenchName"
                                        onChange={this.frenchNameOnChange} 
                                        style = {this.state.frenchStyle}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xs-12" style={{display:"flex", justifyContent:"flex-end", textAlign: "right"}}>
                                <button 
                                    className="btn btn-primary" 
                                    style={{marginRight:'5pt', marginTop:'5pt'}} 
                                    type="button" 
                                    onClick={this.sendRequest}
                                >
                                    Créer le Format
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
