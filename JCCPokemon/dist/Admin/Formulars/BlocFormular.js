"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const BlocService_1 = require("../../ApiWebService/BlocService");
const Bloc_1 = require("../../Model/Bloc");
class BlocFormular extends React.Component {
    constructor(props) {
        super(props);
        this.sendRequest = () => {
            let frenchName = document.getElementById("frenchName").value;
            let englishName = document.getElementById("englishName").value;
            let year = parseInt(document.getElementById("yearSelector").value, 10);
            let b = new Bloc_1.default();
            b.frenchName = frenchName;
            b.englishName = englishName;
            b.year = year;
            BlocService_1.BlocService.CreateNewBloc(b);
            //Envoi au serveur
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
            myImage: null
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Cr\u00E9ation d'un Bloc"),
            React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-7 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "frenchName", className: "col-lg-6 col-xs-6" }, "Nom fran\u00E7ais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "frenchName", id: "frenchName", className: "form-control", placeholder: "Ins\u00E9rez le nom du Bloc" }))),
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "englishName", className: "col-lg-6 col-xs-6" }, "Nom anglais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "englishName", id: "englishName", className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })))),
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