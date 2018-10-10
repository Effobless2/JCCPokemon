import * as React from "react";

export default class SetFormular extends React.Component{
    constructor(props){
        super(props);
    }

    renderSelectOptions = () => {
        let begin = 1995
        let end = new Date().getFullYear();
        let res = [];
        for(let i = end; i>begin-1; i--){
            res.push(i);
        }
        return res.map((i) => {
            return <option value={i}>{i}</option>
        })
    }

    render(){
        return (
            <div>
                <h1 id="TitleForm">Creation de Set</h1>
                    <div className="row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                        <div className="row">
                            <div className="col-lg-7 col-xs-12">
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <input type="text" name="frenchName" id="frenchName" onChange={() => console.log("texte changed")} /*style={this.state.frenchStyle}*/ className="form-control" placeholder="Insérez le nom du Bloc"/>
                                    </div>
                                </div>
                             
                                <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                    <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                                    <div className="col-lg-6 col-xs-6">
                                    <input type="text" name="englishName" id="englishName" onChange={() => console.log("texte changed")} /*style={this.state.englishStyle}*/ className="form-control" width="50%" placeholder="Insérez le nom Anglais du Bloc"/>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                    <h2 label-for="yearSelector" className="col-lg-6 col-xs-6">Bloc associé :</h2>
                                    <div className="col-lg-6 col-xs-6">
                                        <select className="form-control" id="yearSelector" name="yearSelector">
                                            {this.renderSelectOptions()} /** à remplacer */
                                        </select>
                                    </div>
                                </div>

                                <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                                    <button className="btn btn-primary" type="button" onClick={() => console.log("Envoi au serveur")}>Créer le Set</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
            </div>
        )
    }
}