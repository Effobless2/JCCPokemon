import * as React from 'react'
import PokemonService from '../../ApiWebService/PokemonService';
import { Pokemon } from '../../Model/Pokemon';

interface PokemonState{
    myImage: any,
    frenchStyle : any,
    englishStyle : any,
    pokedexStyle : any,
    titleText: string
}



export default class PokemonFormular extends React.Component<{},PokemonState>{
    constructor(props) {
        super(props);
        this.state = {
            myImage : null,
            frenchStyle : null,
            englishStyle : null,
            pokedexStyle : null,
            titleText : "Création d'un Pokémon"
        }
    }

    onLoadImage = () => {
        let fileUploader = document.getElementById("ImageUploader") as any;

        let file = fileUploader.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) =>{
            this.setState({myImage: e.target.result});
        };

        reader.readAsDataURL(file);
    }

    sendRequest = async () =>{
        let frenchNameText = document.getElementById("frenchName") as any
        let englishNameText = document.getElementById("englishName") as any
        let numPokedexText = document.getElementById("pokedexNumber") as any
        let numPokedex = null;
        numPokedex = parseInt(numPokedexText.value);
        if (isNaN(numPokedex)){
            this.numPokedexOnChange();
        }
        if (frenchNameText.value == ""){
            this.frenchNameOnChange();
        }
        if (englishNameText.value == ""){
            this.englishNameOnChange();
        }
        if (englishNameText.value != "" && frenchNameText.value != "" && !isNaN(numPokedex)){
            let pokemon : Pokemon = {
                frenchName : frenchNameText.value,
                englishName : englishNameText.value,
                numPokedex : numPokedex
            }
            let image = document.getElementById("ImageUploader") as any
            let result = await PokemonService.CreateNewPokemon(pokemon, image.files[0])
            if (result == 200){
                this.setState({titleText : "Le pokémon "+pokemon.frenchName+" a été créé avec succès !"})
            } else{
                this.setState({titleText : "La création du pokémon "+pokemon.frenchName+" n'a pas aboutit. Rééssayez plus tard."})
            }
        }

    }

    frenchNameOnChange = () =>{
        let frName = document.getElementById("frenchName") as any;
        if (frName.value == ""){
            this.setState({ frenchStyle : {border: "solid red 1px"}});
            frName.placeholder = "Empty name is invalid";
        } else {
            this.setState({frenchStyle : null});
            frName.placeholder = "Insérez le nom du Pokemon.";
        }
    }

    englishNameOnChange = () =>{
        
        let enName = document.getElementById("englishName") as any;
        if (enName.value == ""){
            this.setState({ englishStyle : {border: "solid red 1px"}});
            enName.placeholder = "Empty name is invalid";
        } else {
            this.setState({englishStyle : null});
            enName.placeholder = "Insérez le nom du Pokemon.";
        }
    }

    numPokedexOnChange = () =>{
        let numT = document.getElementById("pokedexNumber") as any;
        if (isNaN(parseInt(numT.value))){
            this.setState({pokedexStyle : {border: "solid red 1px"}});
            numT.value="";
            numT.placeholder = "Veuillez insérer un entier valide.";
        } else{
            this.setState({pokedexStyle : null });
            numT.placeholder = "Entrez le numéro du pokedex";

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
                                    <input 
                                        type="text" 
                                        name="frenchName" 
                                        id="frenchName" 
                                        onChange={this.frenchNameOnChange} 
                                        style={this.state.frenchStyle}
                                        className="form-control" 
                                        placeholder="Insérez le nom du Bloc"
                                    />
                                </div>
                            </div>
                             
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
                                        placeholder="Insérez le nom Anglais du Bloc"
                                    />
                                </div>
                            </div>

                            <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                <h2 label-for="pokedexNumber" className="col-lg-6 col-xs-6">Numéro du Pokedex :</h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Entrez le numéro du pokedex"
                                        id = "pokedexNumber"
                                        name = "pokedexNumber"
                                        onChange={this.numPokedexOnChange} 
                                        style = {this.state.pokedexStyle}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xs-12">
                            <div className="row" style={{display:'flex', flexWrap:'wrap'}}>
                                <h2 label-for="SymboleUploader" className="col-lg-12 col-xs-6">Illustration :</h2>  
                                <div className="col-lg-12 col-xs-6">
                                    <input 
                                        type="file" 
                                        id="ImageUploader" 
                                        accept="image/*" 
                                        onChange={this.onLoadImage}
                                    />
                                    <img 
                                        src={this.state.myImage} 
                                        
                                        height={this.state.myImage ? this.state.myImage.height : "150pt"}
                                        width={this.state.myImage ? this.state.myImage.width : "150pt"}
                                        style = {{maxHeight : "300pt", maxWidth : "250pt", minHeight : "150pt", minWidth: "150pt"}}
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
                                    Créer le pokemon
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
