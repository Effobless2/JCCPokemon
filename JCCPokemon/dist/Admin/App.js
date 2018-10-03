"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const BlocFormular_1 = require("./Formulars/BlocFormular");
class App extends React.Component {
    constructor(props) {
        super(props);
        this.CloseForm = () => {
            this.setState({ content: React.createElement("div", null, "Empty") });
        };
        this.AddExtension = () => {
            this.setState({ content: React.createElement("div", null,
                    React.createElement("button", { type: "button", className: "close", onClick: this.CloseForm, "data-dismiss": "modal", "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                    React.createElement("div", { className: "row", style: { display: "flex", alignItems: "flex-end" } },
                        React.createElement("div", { className: "col-lg-10" },
                            React.createElement(BlocFormular_1.default, null)),
                        React.createElement("button", { type: "button", className: "btn btn-danger", onClick: this.CloseForm }, "Annuler"))) });
        };
        this.state = {
            content: React.createElement("div", null, "Empty")
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { className: "btn btn-primary", onClick: this.AddExtension }, "Add Extension"),
            React.createElement("div", null, this.state.content)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map