import * as React from "react";
import { RarityService } from "../../ApiWebService/RarityService";
import { Rarity } from "../../Model/Rarity";
import { url } from "inspector";
import { Extension } from "../../Model/Extension";
import { ExtensionService } from "../../ApiWebService/ExtensionService";
import * as CheckBox from "react-bootstrap/lib/Checkbox";
import { Format } from "../../Model/Format";
import { FormatService } from "../../ApiWebService/FormatService";
import Card from "../../Model/Card";
import CardService from "../../ApiWebService/CardService";

interface CardFormularState{
    titleText: string;
    englishStyle: any;
    frenchStyle: any;
    imageFile : any;
    rarities : Rarity[];
    raritiesOpts : any[];
    extensions : Extension[];
    extensionsOpts: any[];
    formatBoxes: any[];
    formats : Format[];
    numStyle: any;
    maxStyle : any;

}

export default class CardFormular extends React.Component<any,CardFormularState>{
    
    constructor(props) {
        super(props);
        this.state = {
            titleText : "Création d'une nouvelle carte",
            englishStyle : null,
            frenchStyle : null,
            imageFile: null,
            rarities : [],
            raritiesOpts : [],
            extensions : [],
            extensionsOpts : [],
            formatBoxes : [],
            formats : [],
            numStyle : {width: "60px"},
            maxStyle : {width: "60px"}
        }
        RarityService.GetAllRarities()
            .then((rarities : Rarity[]) => {
                this.setState({
                    rarities : rarities,
                    raritiesOpts : rarities.map(rarity => {
                        return <option value = {rarity.rarityId}>{rarity.frenchName}</option>
                    })
                });
                
            });

        ExtensionService.GetAllExtensions()
            .then((extensions : Extension[]) => {
                this.setState({
                    extensions : extensions,
                    extensionsOpts : extensions.map(extension => {
                        return <option value = {extension.extensionId}>{extension.frenchName}</option>
                    })
                })
            });

        FormatService.GetAllFormats()
            .then((formats : Format[]) => {
                this.setState({
                    formats: formats,
                    formatBoxes: formats.map((format) => {
                        return <label>
                        {format.frenchName}
                         <CheckBox
                             type="checkbox"
                             value={format.formatId}
                         />
                     </label>
                    })
                })
            })
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

    numCardOnChange = () => {
        let num = document.getElementById("numCard") as any;
        if (num.value == ""){
            this.setState({ numStyle : {border: "solid red 1px", width: "60px"}});
            num.placeholder = "Empty name is invalid";
        } else {
            this.setState({numStyle : {width: "60px"}});
            num.placeholder = "Insérez le nom du Bloc";
        }
    }

    maxOnChange = () => {
        let num = document.getElementById("maxNum") as any;
        if (num.value == ""){
            this.setState({ maxStyle : {border: "solid red 1px", width: "60px"}});
            num.placeholder = "Empty name is invalid";
        } else {
            this.setState({maxStyle : {width: "60px"}});
            num.placeholder = "Insérez le nom du Bloc";
        }
    }

    onLoadImage = () => {
        let fileUploader = document.getElementById("imageUploader") as any;
        
        let file = fileUploader.files[0];
        //this.setState({myImage : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.onload = (e : any) =>{
            this.setState({imageFile: e.target.result});
        };
        reader.readAsDataURL(file);
    }
    
    sendRequest = async () => {
        let frenchName = (document.getElementById("frenchName") as any).value;
        let englishName = (document.getElementById("englishName") as any).value;
        let numCard = (document.getElementById("numCard") as any).value;
        let maxNum = (document.getElementById("maxNum") as any).value;
        let extId = (document.getElementById("SetSelector") as any).value;
        let rarityId = (document.getElementById("RaritySelector") as any).value;
        let imageCard = (document.getElementById("imageUploader") as any).files[0];

        if (frenchName == ""){
            this.frenchNameOnChange();
        }
        if (englishName == ""){
            this.englishNameOnChange();
        }
        if (numCard == ""){
            this.numCardOnChange();
        }
        if (maxNum == ""){
            this.maxOnChange();
        }
        if (frenchName != "" && englishName != "" && numCard != "" && maxNum != ""){
            let card = new Card();
            card.frenchName = frenchName;
            card.englishName = englishName;
            card.numCard = numCard;
            card.maxNum = maxNum;
            card.rarityId = rarityId;
            card.extensionId = extId;

            this.setState({titleText : "Tratement en cours ..."})
            let result = await CardService.createNewCard(card, imageCard);
            if (result.status == 200){
                let json = result.json();
                console.log(json);
            }
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
                            <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom Français :</h2>
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
                            <div className="row" style={{display: "flex", alignItems: "center"}}>
                                <h2 label-for="RaritySelector" className="col-lg-6 col-xs-6">Rareté :</h2>
                                <div className="col-lg-6 col-xs-6">
                                    <select className="form-control col-lg-6 col-xs-6" id="RaritySelector" name="RaritySelector">
                                        {this.state.raritiesOpts}
                                    </select>
                                </div>
                            </div>
                            <div className="row"style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="numCard" className="col-lg-2 col-xs-2">N° :</h2>
                                    <input 
                                        type="text" 
                                        className="form-control col-2"
                                        placeholder="1"
                                        id = "numCard"
                                        name = "numCard"
                                        style = {this.state.numStyle}
                                        onChange={this.numCardOnChange} 
                                    />
                                <p className="col-2"> / </p>
                                    <input 
                                        type="text" 
                                        className="form-control col-2" 
                                        placeholder="100"
                                        id = "maxNum"
                                        name = "maxNum"
                                        style = {this.state.maxStyle}
                                        onChange={this.maxOnChange} 
                                    />
                                <div className="col-4" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="SetSelector" className="col-lg-2 col-xs-2"> de </h2>
                                    <div className="col-lg-10 col-xs-10">
                                        <select className="form-control " id="SetSelector" name="SetSelector">
                                            {this.state.extensionsOpts}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <h2 className="col-4">Existe en :</h2>
                                <div className="col-8">
                                    {this.state.formatBoxes}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xs-12">
                            <input type="file" id="imageUploader" accept="image/*" onChange={this.onLoadImage}/>
                            <img src={this.state.imageFile} height="332.598425197pt" width="238.11023622pt"/>       
                        </div>
                        <div className="col-lg-12 col-xs-12" style={{display:"flex", justifyContent:"flex-end", textAlign: "right"}}>
                                <button 
                                    className="btn btn-primary" 
                                    style={{marginRight:'5pt', marginTop:'5pt'}} 
                                    type="button" 
                                    onClick={this.sendRequest}
                                >
                                    Créer la Carte
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}