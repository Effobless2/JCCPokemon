import * as React from "react"
import { Rarity } from "../../Model/Rarity";
import { RarityService } from "../../ApiWebService/RarityService";

interface RarityState{
    myLogo : any,
    frenchName : string,
    englishName : string
}

export default class RarityFormular extends React.Component<any,RarityState>{
    
    
    constructor(props : any) {
        super(props);  
        this.state={
            
            myLogo : null,
            frenchName : "",
            englishName : ""
        }
    }

    frenchNameOnChange = () =>{
        let frName = document.getElementById("frenchName") as any;
        if (frName.value == ""){
            //this.setState({ frenchStyle : {border: "solid red 1px"}});
            frName.placeholder = "Empty name is invalid";
        } else {
            //this.setState({frenchStyle : null});
            frName.placeholder = "Insérez le nom du Bloc";
        }
    }

    englishNameOnChange = () =>{
        
        let enName = document.getElementById("englishName") as any;
        if (enName.value == ""){
            //this.setState({ englishStyle : {border: "solid red 1px"}});
            enName.placeholder = "Empty name is invalid";
        } else {
            //this.setState({englishStyle : null});
            enName.placeholder = "Insérez le nom du Bloc";
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

    sendRequest =  async () => {
        let frenchName = (document.getElementById("frenchName") as any).value;
        let englishName = (document.getElementById("englishName") as any).value;
        let logoUp = (document.getElementById("LogoUploader") as any);
        if (frenchName != "" && englishName !=""){
            console.log(frenchName);
            console.log(englishName);
            let logo = logoUp.files[0];
            let rarity = new Rarity();
            rarity.frenchName = frenchName;
            rarity.englishName = englishName;
            await RarityService.createNewRarity(rarity, logo);

        }
    };

    render(){
        return (
            <div>
                <h1>Hello Rarity !</h1>
                <div className="row" style={{display:"flex", alignItems:"flex-start", flexWrap:"wrap"}}>
                    <div className="col-lg-6 col-xs-12">
                        <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                            <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                            <div className="col-lg-6 col-xs-6">
                                <input type="text" name="frenchName" id="frenchName" /*onChange={this.frenchNameOnChange} style={this.state.frenchStyle}*/ className="form-control" placeholder="Insérez le nom"/>
                            </div>
                        </div>
                     
                        <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                            <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                            <div className="col-lg-6 col-xs-6">
                            <input type="text" name="englishName" id="englishName" /*onChange={this.englishNameOnChange} style={this.state.englishStyle}*/ className="form-control" width="50%" placeholder="Insérez le nom"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <h2 label-for="LogoUploader" className="col-lg-12 col-xs-6" style={{paddingLeft:0}}>Logo de la rareté :</h2>
                        <input type="file" id="LogoUploader" accept="image/*" onChange={this.onLoadLogo}/>
                        <img src={this.state.myLogo} height="150pt" width="150pt"/>       
                    </div>
                </div>
                <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                        <button className="btn btn-primary" type="button" onClick={this.sendRequest} style={{marginRight: '5px'}}>Créer le Set</button>
                    </div>
            </div>
        )
    }
}