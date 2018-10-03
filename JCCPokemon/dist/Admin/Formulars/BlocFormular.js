"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class BlocFormular extends React.Component {
    constructor(props) {
        super(props);
        this.renderSelectOptions = () => {
            let begin = 1995;
            let end = new Date().getFullYear();
            let res = [];
            for (let i = begin; i < end + 1; i++) {
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
            React.createElement("form", { className: "row", style: { display: "flex", alignItems: "flex-end" } },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-7 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "frenchName", className: "col-lg-6 col-xs-6" }, "Nom fran\u00E7ais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "frenchName", className: "form-control", placeholder: "Ins\u00E9rez le nom du Bloc" }))),
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "englishName", className: "col-lg-6 col-xs-6" }, "Nom anglais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "englishName", className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })))),
                    React.createElement("div", { className: "col-lg-5 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "yearSelector", className: "col-lg-6 col-xs-6" }, "Ann\u00E9e de cr\u00E9ation :"),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("select", { className: "form-control", name: "yearSelector" }, this.renderSelectOptions()))))),
                React.createElement("input", { className: "btn btn-primary", type: "submit" }))));
    }
}
exports.default = BlocFormular;
//# sourceMappingURL=BlocFormular.js.map