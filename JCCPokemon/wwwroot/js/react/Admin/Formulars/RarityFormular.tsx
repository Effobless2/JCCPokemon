import * as React from "react"

export default class RarityFormular extends React.Component<any,any>{
    
    constructor(props : any) {
        super(props);    
    }

    render(){
        return (
            <div>
                <h1>Hello Rarity !</h1>
                <div className="row" style={{display:"flex", alignItems:"flex-start", flexWrap:"wrap"}}>
                    <div className="col-lg-6 col-xs-12">
                        <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                            <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                            <div className="col-lg-6 col-xs-6">
                                <input type="text" name="frenchName" id="frenchName" /*onChange={this.frenchNameOnChange} style={this.state.frenchStyle}*/ className="form-control" placeholder="Insérez le nom"/>
                            </div>
                        </div>
                     
                        <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                            <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                            <div className="col-lg-6 col-xs-6">
                            <input type="text" name="englishName" id="englishName" /*onChange={this.englishNameOnChange} style={this.state.englishStyle}*/ className="form-control" width="50%" placeholder="Insérez le nom"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <h2 label-for="LogoUploader" className="col-lg-12 col-xs-6" style={{paddingLeft:0}}>Logo de la rareté :</h2>
                        <input type="file" id="LogoUploader" accept="image/*" /*onChange={this.onLoadLogo}*//>
                        <img src="{this.state.myLogo}" height="150pt" width="150pt"/>       
                    </div>
                </div>
                <div className="row" style={{display:"flex", justifyContent:"flex-end"}}>
                        <button className="btn btn-primary" type="button" /*onClick={this.sendRequest}*/ style={{marginRight: '5px'}}>Créer le Set</button>
                    </div>
            </div>
        )
    }
}