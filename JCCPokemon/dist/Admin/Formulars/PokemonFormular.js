"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PokemonService_1 = require("../../ApiWebService/PokemonService");
class PokemonFormular extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadImage = () => {
            let fileUploader = document.getElementById("ImageUploader");
            let file = fileUploader.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ myImage: e.target.result });
            };
            reader.readAsDataURL(file);
        };
        this.sendRequest = () => __awaiter(this, void 0, void 0, function* () {
            let frenchNameText = document.getElementById("frenchName");
            let englishNameText = document.getElementById("englishName");
            let numPokedexText = document.getElementById("pokedexNumber");
            let numPokedex = null;
            numPokedex = parseInt(numPokedexText.value);
            if (isNaN(numPokedex)) {
                this.numPokedexOnChange();
            }
            if (frenchNameText.value == "") {
                this.frenchNameOnChange();
            }
            if (englishNameText.value == "") {
                this.englishNameOnChange();
            }
            if (englishNameText.value != "" && frenchNameText.value != "" && !isNaN(numPokedex)) {
                let pokemon = {
                    frenchName: frenchNameText.value,
                    englishName: englishNameText.value,
                    numPokedex: numPokedex
                };
                let image = document.getElementById("ImageUploader");
                let result = yield PokemonService_1.default.CreateNewPokemon(pokemon, image.files[0]);
                if (result == 200) {
                    this.setState({ titleText: "Le pokémon " + pokemon.frenchName + " a été créé avec succès !" });
                }
                else {
                    this.setState({ titleText: "La création du pokémon " + pokemon.frenchName + " n'a pas aboutit. Rééssayez plus tard." });
                }
            }
        });
        this.frenchNameOnChange = () => {
            let frName = document.getElementById("frenchName");
            if (frName.value == "") {
                this.setState({ frenchStyle: { border: "solid red 1px" } });
                frName.placeholder = "Empty name is invalid";
            }
            else {
                this.setState({ frenchStyle: null });
                frName.placeholder = "Insérez le nom du Pokemon.";
            }
        };
        this.englishNameOnChange = () => {
            let enName = document.getElementById("englishName");
            if (enName.value == "") {
                this.setState({ englishStyle: { border: "solid red 1px" } });
                enName.placeholder = "Empty name is invalid";
            }
            else {
                this.setState({ englishStyle: null });
                enName.placeholder = "Insérez le nom du Pokemon.";
            }
        };
        this.numPokedexOnChange = () => {
            let numT = document.getElementById("pokedexNumber");
            if (isNaN(parseInt(numT.value))) {
                this.setState({ pokedexStyle: { border: "solid red 1px" } });
                numT.value = "";
                numT.placeholder = "Veuillez insérer un entier valide.";
            }
            else {
                this.setState({ pokedexStyle: null });
                numT.placeholder = "Entrez le numéro du pokedex";
            }
        };
        this.state = {
            myImage: null,
            frenchStyle: null,
            englishStyle: null,
            pokedexStyle: null,
            titleText: "Création d'un Pokémon"
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", { id: "TitleForm" }, this.state.titleText),
            React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-7 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "frenchName", className: "col-lg-6 col-xs-6" }, "Nom fran\u00E7ais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "frenchName", id: "frenchName", onChange: this.frenchNameOnChange, style: this.state.frenchStyle, className: "form-control", placeholder: "Ins\u00E9rez le nom du Bloc" }))),
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "englishName", className: "col-lg-6 col-xs-6" }, "Nom anglais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "englishName", id: "englishName", onChange: this.englishNameOnChange, style: this.state.englishStyle, className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" }))),
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "center" } },
                            React.createElement("h2", { "label-for": "pokedexNumber", className: "col-lg-6 col-xs-6" }, "Num\u00E9ro du Pokedex :"),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", className: "form-control", placeholder: "Entrez le num\u00E9ro du pokedex", id: "pokedexNumber", name: "pokedexNumber", onChange: this.numPokedexOnChange, style: this.state.pokedexStyle })))),
                    React.createElement("div", { className: "col-lg-5 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: 'flex', flexWrap: 'wrap' } },
                            React.createElement("h2", { "label-for": "SymboleUploader", className: "col-lg-12 col-xs-6" }, "Illustration :"),
                            React.createElement("div", { className: "col-lg-12 col-xs-6" },
                                React.createElement("input", { type: "file", id: "ImageUploader", accept: "image/*", onChange: this.onLoadImage }),
                                React.createElement("img", { src: this.state.myImage, height: this.state.myImage ? this.state.myImage.height : "150pt", width: this.state.myImage ? this.state.myImage.width : "150pt", style: { maxHeight: "300pt", maxWidth: "250pt", minHeight: "150pt", minWidth: "150pt" } })))),
                    React.createElement("div", { className: "col-lg-12 col-xs-12", style: { display: "flex", justifyContent: "flex-end", textAlign: "right" } },
                        React.createElement("button", { className: "btn btn-primary", style: { marginRight: '5pt', marginTop: '5pt' }, type: "button", onClick: this.sendRequest }, "Cr\u00E9er le pokemon"))))));
    }
}
exports.default = PokemonFormular;
//# sourceMappingURL=PokemonFormular.js.map