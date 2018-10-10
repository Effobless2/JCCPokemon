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
const Bloc_1 = require("../../Model/Bloc");
class BlocFormular extends React.Component {
    constructor(props) {
        super(props);
        this.sendRequest = () => __awaiter(this, void 0, void 0, function* () {
            let frenchName = document.getElementById("frenchName");
            let englishName = document.getElementById("englishName");
            let year = parseInt(document.getElementById("yearSelector").value, 10);
            if (frenchName.value == "") {
                this.frenchNameOnChange();
            }
            if (englishName.value == "") {
                this.englishNameOnChange();
            }
            if (englishName.value != "" && frenchName.value != "") {
                let b = new Bloc_1.default();
                b.frenchName = frenchName.value;
                b.englishName = englishName.value;
                b.year = year;
                let result = yield BlocService_1.BlocService.CreateNewBloc(b);
                console.log(result);
                if (result == 200) {
                    this.setState({ titleText: frenchName.value + " a été créé !" });
                }
                else {
                    this.setState({ titleText: "La création de " + frenchName.value + " n'a pas aboutit. Résseayez plus tard." });
                }
                //Envoi au serveur
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
        this.renderSelectOptions = () => {
            let begin = 1995;
            let end = new Date().getFullYear();
            let res = [];
            for (let i = end; i > begin - 1; i--) {
                res.push(i);
            }
            return res.map((i) => {
                return React.createElement("option", { value: i }, i);
            });
        };
        this.state = {
            myImage: null,
            frenchStyle: null,
            englishStyle: null,
            titleText: "Création d'un Bloc"
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
                                React.createElement("input", { type: "text", name: "englishName", id: "englishName", onChange: this.englishNameOnChange, style: this.state.englishStyle, className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })))),
                    React.createElement("div", { className: "col-lg-5 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "center" } },
                            React.createElement("h2", { "label-for": "yearSelector", className: "col-lg-6 col-xs-6" }, "Ann\u00E9e de cr\u00E9ation :"),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("select", { className: "form-control", id: "yearSelector", name: "yearSelector" }, this.renderSelectOptions()))),
                        React.createElement("div", { className: "row", style: { display: "flex", justifyContent: "flex-end" } },
                            React.createElement("button", { className: "btn btn-primary", type: "button", onClick: this.sendRequest }, "Cr\u00E9er le bloc")))))));
    }
}
exports.default = BlocFormular;
//# sourceMappingURL=BlocFormular.js.map