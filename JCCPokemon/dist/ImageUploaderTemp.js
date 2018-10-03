"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ImageUploaderTemp extends React.Component {
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
        this.state = {
            myImage: null
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("input", { type: "file", id: "fileUploader", accept: "image/*", onChange: this.onLoadImage }),
            React.createElement("img", { src: this.state.myImage, height: "150pt", width: "150pt" })));
    }
}
exports.default = ImageUploaderTemp;
//# sourceMappingURL=ImageUploaderTemp.js.map