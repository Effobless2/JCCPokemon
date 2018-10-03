import * as React from 'react';


export default class BlocFormular extends React.Component<{},{myImage:any}>{
    constructor(props){
        super(props);
        this.state = {
            myImage : null
        }
    }

    onLoadImage = () => {
        let fileUploader = document.getElementById("fileUploader") as any;
        let file = fileUploader.files[0];
        //this.setState({myImage : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.setState({myImage:e.target.result});
        };
        reader.readAsDataURL(file);
        console.log(this.state.myImage);
    }

    renderSelectOptions = () => {
        let begin = 1995
        let end = new Date().getFullYear();
        let res = [];
        for(let i = begin; i<end+1; i++){
            res.push(i);
        }
        return res.map((i) => {
            return <option value={i}>{i}</option>
        })
    }

    render(){
        
        return (
            <div>
                <h1>Création d'un Bloc</h1>
                <div>
                    <form>
                        <div>
                            <h1 label-for="frenchName">Nom français : </h1>
                            <input type="text" name="frenchName" className="form-control" placeholder="Insérez le nom du Bloc"/>
                        </div>
                        
                        <div>
                            <h1 label-for="englishName">Nom anglais : </h1>
                            <input type="text" name="englishName" className="form-control" placeholder="Insérez le nom Anglais du Bloc"/>
                        </div>
                        
                        <div>
                            <h1 label-for="yearSelector">Année de création</h1>
                            <select name="yearSelector">
                                {this.renderSelectOptions()}
                            </select>
                        </div>
                        

                        <div>
                            <img src={this.state.myImage} height="300pt" width="200pt"/>
                            <input type="file" id="fileUploader" accept="image/*" onChange={this.onLoadImage}/>
                        
                        </div>
                        
                        <input className="btn btn-primary" type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}