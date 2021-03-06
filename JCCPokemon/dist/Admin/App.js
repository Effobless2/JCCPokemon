"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const BlocFormular_1 = require("./Formulars/BlocFormular");
const SetFormular_1 = require("./Formulars/SetFormular");
const PokemonFormular_1 = require("./Formulars/PokemonFormular");
const RarityFormular_1 = require("./Formulars/RarityFormular");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.CloseForm = () => {
            this.setState({ content: React.createElement("div", null, "Empty") });
        };
        this.AddBloc = () => {
            this.setState({ content: React.createElement("div", null,
                    React.createElement("button", { type: "button", className: "close", onClick: this.CloseForm, "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                        React.createElement("div", { className: "col-lg-10" },
                            React.createElement(BlocFormular_1.default, null)),
                        React.createElement("button", { type: "button", className: "btn btn-danger", onClick: this.CloseForm }, "Annuler"))) });
        };
        this.AddSet = () => {
            this.setState({ content: React.createElement("div", null,
                    React.createElement("button", { type: "button", className: "close", onClick: this.CloseForm, "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                        React.createElement("div", { className: "col-lg-10" },
                            React.createElement(SetFormular_1.default, null)),
                        React.createElement("button", { type: "button", className: "btn btn-danger", onClick: this.CloseForm }, "Annuler"))) });
        };
        this.AddPokemon = () => {
            this.setState({ content: React.createElement("div", null,
                    React.createElement("button", { type: "button", className: "close", onClick: this.CloseForm, "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                        React.createElement("div", { className: "col-lg-10" },
                            React.createElement(PokemonFormular_1.default, null)),
                        React.createElement("button", { type: "button", className: "btn btn-danger", onClick: this.CloseForm }, "Annuler"))) });
        };
        this.AddRarity = () => {
            this.setState({ content: React.createElement("div", null,
                    React.createElement("button", { type: "button", className: "close", onClick: this.CloseForm, "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end", flexWrap: "wrap" } },
                        React.createElement("div", { className: "col-lg-10" },
                            React.createElement(RarityFormular_1.default, null)),
                        React.createElement("button", { type: "button", className: "btn btn-danger", onClick: this.CloseForm }, "Annuler"))) });
        };
        this.state = {
            content: React.createElement("div", null, "Empty")
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { className: "btn btn-primary", style: { "margin": "5px" }, onClick: this.AddBloc }, "Add Bloc"),
            React.createElement("button", { className: "btn btn-primary", style: { "margin": "5px" }, onClick: this.AddSet }, "Add Set"),
            React.createElement("button", { className: "btn btn-primary", style: { "margin": "5px" }, onClick: this.AddPokemon }, "Add Pokemon"),
            React.createElement("button", { className: "btn btn-primary", style: { "margin": "5px" }, onClick: this.AddRarity }, "Add Rarity"),
            React.createElement("div", null, this.state.content)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map