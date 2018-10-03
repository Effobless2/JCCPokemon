"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class BlocFormular extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadImage = () => {
            let fileUploader = document.getElementById("fileUploader");
            let file = fileUploader.files[0];
            //this.setState({myImage : URL.createObjectURL(file)})
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ myImage: e.target.result });
            };
            reader.readAsDataURL(file);
            console.log(this.state.myImage);
        };
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
            React.createElement("div", null,
                React.createElement("form", null,
                    React.createElement("div", null,
                        React.createElement("h1", { "label-for": "frenchName" }, "Nom fran\u00E7ais : "),
                        React.createElement("input", { type: "text", name: "frenchName", className: "form-control", placeholder: "Ins\u00E9rez le nom du Bloc" })),
                    React.createElement("div", null,
                        React.createElement("h1", { "label-for": "englishName" }, "Nom anglais : "),
                        React.createElement("input", { type: "text", name: "englishName", className: "form-control", placeholder: "Ins\u00E9rez le nom Anglais du Bloc" })),
                    React.createElement("div", null,
                        React.createElement("h1", { "label-for": "yearSelector" }, "Ann\u00E9e de cr\u00E9ation"),
                        React.createElement("select", { name: "yearSelector" }, this.renderSelectOptions())),
                    React.createElement("div", null,
                        React.createElement("img", { src: this.state.myImage, height: "150pt", width: "200pt" }),
                        React.createElement("input", { type: "file", id: "fileUploader", accept: "image/*", onChange: this.onLoadImage })),
                    React.createElement("input", { className: "btn btn-primary", type: "submit" })))));
    }
}
exports.default = BlocFormular;
//# sourceMappingURL=BlocFormular.js.map