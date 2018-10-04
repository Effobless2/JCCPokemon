import * as React from 'react';
import { BlocService } from '../../ApiWebService/BlocService';
import Bloc from '../../Model/Bloc';


export default class BlocFormular extends React.Component<{},{myImage:any, frenchStyle: any, englishStyle: any, titleText: string}>{
    constructor(props){
        super(props);
        this.state = {
            myImage : null,
            frenchStyle: null,
            englishStyle: null,
            titleText : "Création d'un Bloc"
        }
    }

    sendRequest = async () => {
        let frenchName = (document.getElementById("frenchName") as any);
        let englishName = (document.getElementById("englishName") as any);
        let year = parseInt((document.getElementById("yearSelector") as any).value,10);

        if (frenchName.value == ""){
            console.log("french vide");
            this.frenchNameOnChange();

        }
        if (englishName.value == ""){
            console.log("english vide");
            this.englishNameOnChange();
        }
        if (englishName.value != "" && frenchName.value != ""){
            let b = new Bloc();
            b.frenchName = frenchName.value;
            b.englishName = englishName.value;
            b.year = year;
            let result = await BlocService.CreateNewBloc(b);
            console.log(result);
            if (result == 200){
                this.setState({titleText: "Création d'un Bloc - Votre bloc " + frenchName.value + " a été créé !"});
            } else {
                console.log("ko ?");
            }
            //Envoi au serveur
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

    renderSelectOptions = () => {
        let begin = 1995
        let end = new Date().getFullYear();
        let res = [];
        for(let i = end; i>begin-1; i--){
            res.push(i);
        }
        return res.map((i) => {
            return <option value={i}>{i}</option>
        })
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
                                    <h2 label-for="yearSelector" className="col-lg-6 col-xs-6">Année de création :</h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <select className="form-control" id="yearSelector" name="yearSelector">
                                            {this.renderSelectOptions()}
                                        </select>
                                    </div>
                                </div>

                                <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                                    <button className="btn btn-primary" type="button" onClick={this.sendRequest}>Créer le bloc</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
            </div>
        )
    }
}