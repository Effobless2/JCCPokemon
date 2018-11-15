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
const BlocService_1 = require("../../ApiWebService/BlocService");
const Extension_1 = require("../../Model/Extension");
const ExtensionService_1 = require("../../ApiWebService/ExtensionService");
class SetFormular extends React.Component {
    constructor(props) {
        super(props);
        this.sendRequest = () => __awaiter(this, void 0, void 0, function* () {
            let frenchName = document.getElementById("frenchName");
            let englishName = document.getElementById("englishName");
            let curBloc = document.getElementById("blocSelector");
            let logoUp = document.getElementById("LogoUploader");
            let symbolUp = document.getElementById("SymboleUploader");
            if (frenchName.value == "") {
                this.frenchNameOnChange();
            }
            if (englishName.value == "") {
                this.englishNameOnChange();
            }
            if (englishName.value != "" && frenchName.value != "") {
                this.setState({ titleText: "Traitement en cours ..." });
                let frName = frenchName.value;
                let enName = englishName.value;
                let blocId = curBloc.value;
                let logo = logoUp.files[0];
                let symbol = symbolUp.files[0];
                let newExtension = new Extension_1.Extension();
                newExtension.frenchName = frName;
                newExtension.englishName = enName;
                newExtension.blocId = blocId;
                let result = yield ExtensionService_1.ExtensionService.CreateNewExtension(newExtension, logo, symbol);
                if (result == 200) {
                    this.setState({ titleText: "L'extension " + newExtension.frenchName + " a été créé !" });
                }
                else {
                    this.setState({ titleText: "La création de " + newExtension.frenchName + " n'a pas aboutit. Rééssayez plus tard." });
                }
            }
        });
        this.onLoadLogo = () => {
            let fileUploader = document.getElementById("LogoUploader");
            let file = fileUploader.files[0];
            //this.setState({myImage : URL.createObjectURL(file)})
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ myLogo: e.target.result });
            };
            reader.readAsDataURL(file);
        };
        this.onLoadSymbol = () => {
            let fileUploader = document.getElementById("SymboleUploader");
            let file = fileUploader.files[0];
            //this.setState({myImage : URL.createObjectURL(file)})
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ mySymbol: e.target.result });
            };
            reader.readAsDataURL(file);
        };
        this.frenchNameOnChange = () => {
            let frName = document.getElementById("frenchName");
            if (frName.value == "") {
                this.setState({ frenchStyle: { border: "solid red 1px" } });
                frName.placeholder = "Empty name is invalid";
            }
            else {
                this.setState({ frenchStyle: null });
                frName.placeholder = "Insérez le nom du Bloc";
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
                enName.placeholder = "Insérez le nom du Bloc";
            }
        };
        this.state = {
            blocs: [],
            blocOpts: [],
            myLogo: null,
            mySymbol: null,
            titleText: "Création d'une Extension",
            frenchStyle: null,
            englishStyle: null
        };
        BlocService_1.BlocService.GetAllBlocs()
            .then((blocs) => {
            this.setState({
                blocs: blocs,
                blocOpts: blocs.map(bloc => {
                    return React.createElement("option", { value: bloc.blocId }, bloc.frenchName);
                })
            });
        });
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
                                React.createElement("input", { type: "text", name: "englishName", id: "englishName", onChange: this.englishNameOnChange, style: this.state.englishStyle, className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })))),
                    React.createElement("div", { className: "col-lg-5 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "center" } },
                            React.createElement("h2", { "label-for": "yearSelector", className: "col-lg-6 col-xs-6" }, "Bloc associ\u00E9 :"),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("select", { className: "form-control", id: "blocSelector", name: "blocSelector" }, this.state.blocOpts))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-6 col-xs-12" },
                        React.createElement("h2", { "label-for": "LogoUploader", className: "col-lg-6 col-xs-6" }, "Logo de l'Extension :"),
                        React.createElement("input", { type: "file", id: "LogoUploader", accept: "image/*", onChange: this.onLoadLogo }),
                        React.createElement("img", { src: this.state.myLogo, height: "150pt", width: "150pt" })),
                    React.createElement("div", { className: "col-lg-6 col-xs-12" },
                        React.createElement("h2", { "label-for": "SymboleUploader", className: "col-lg-6 col-xs-6" }, "Symbole de l'Extension :"),
                        React.createElement("input", { type: "file", id: "SymboleUploader", accept: "image/*", onChange: this.onLoadSymbol }),
                        React.createElement("img", { src: this.state.mySymbol, height: "150pt", width: "150pt" })))),
            React.createElement("div", { className: "row", style: { display: "flex", justifyContent: "flex-end" } },
                React.createElement("button", { className: "btn btn-primary", type: "button", onClick: this.sendRequest, style: { marginRight: '5px' } }, "Cr\u00E9er le Set"))));
    }
}
exports.default = SetFormular;
//# sourceMappingURL=SetFormular.js.map