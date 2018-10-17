"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ImageUploaderTemp_1 = require("../../ImageUploaderTemp");
const BlocService_1 = require("../../ApiWebService/BlocService");
class SetFormular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocs: [],
            blocOpts: []
        };
        BlocService_1.BlocService.GetAllBlocs()
            .then((blocs) => {
            this.setState({
                blocs: blocs,
                blocOpts: blocs.map(bloc => {
                    return React.createElement("option", { value: bloc.idBloc }, bloc.frenchName);
                })
            });
        });
    }
    /*
    renderSelectOption = () => {
        this.state.blocs.map((bloc) => {
                return <option value={bloc.idBloc}>{bloc.frenchName}</option>
        })
    }*/
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", { id: "TitleForm" }, "Creation de Set"),
            React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-7 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "frenchName", className: "col-lg-6 col-xs-6" }, "Nom fran\u00E7ais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "frenchName", id: "frenchName", onChange: () => console.log("texte changed"), className: "form-control", placeholder: "Ins\u00E9rez le nom du Bloc" }))),
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "baseline" } },
                            React.createElement("h2", { "label-for": "englishName", className: "col-lg-6 col-xs-6" }, "Nom anglais : "),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("input", { type: "text", name: "englishName", id: "englishName", onChange: () => console.log("texte changed"), className: "form-control", width: "50%", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })))),
                    React.createElement("div", { className: "col-lg-5 col-xs-12" },
                        React.createElement("div", { className: "row", style: { display: "flex", alignItems: "center" } },
                            React.createElement("h2", { "label-for": "yearSelector", className: "col-lg-6 col-xs-6" }, "Bloc associ\u00E9 :"),
                            React.createElement("div", { className: "col-lg-6 col-xs-6" },
                                React.createElement("select", { className: "form-control", id: "yearSelector", name: "yearSelector" }, this.state.blocOpts))),
                        React.createElement(ImageUploaderTemp_1.default, null),
                        React.createElement("div", { className: "row", style: { display: "flex", justifyContent: "flex-end" } },
                            React.createElement("button", { className: "btn btn-primary", type: "button", onClick: () => console.log("Envoi au serveur") }, "Cr\u00E9er le Set")))))));
    }
}
exports.default = SetFormular;
//# sourceMappingURL=SetFormular.js.map