import * as React from "react";

export default class ImageUploaderTemp extends React.Component<{},{myImage: any}>{
    constructor(props){
        super(props);

        this.state = {
            myImage: null
        };
    }

    onLoadImage = () => {
        let fileUploader = document.getElementById("fileUploader") as any;
        let file = fileUploader.files[0];
        //this.setState({myImage : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.setState({myImage: e.target.result});
        };
        reader.readAsDataURL(file);
        console.log(this.state.myImage);
    }

    render(){
        return (
            <div>   
                <input type="file" id="fileUploader" accept="image/*" onChange={this.onLoadImage}/>
                <img src={this.state.myImage} height="150pt" width="150pt"/>       
            </div>
        )
    }
}