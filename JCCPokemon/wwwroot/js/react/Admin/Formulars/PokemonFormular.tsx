import * as React from 'react'



export default class PokemonFormular extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <h1 id="TitleForm">Pokemon</h1>
                <div className="row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                    <div className="row">
                        <div className="col-lg-7 col-xs-12">
                            <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                <h2 label-for="frenchName" className="col-lg-6 col-xs-6">Nom français : </h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input type="text" name="frenchName" id="frenchName" /*onChange={this.frenchNameOnChange}*/ /*style={this.state.frenchStyle}*/ className="form-control" placeholder="Insérez le nom du Bloc"/>
                                </div>
                            </div>
                             
                            <div className="row" style={{display: "flex", alignItems: "baseline"}}>
                                <h2 label-for="englishName" className="col-lg-6 col-xs-6">Nom anglais : </h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input type="text" name="englishName" id="englishName" /*onChange={this.englishNameOnChange} style={this.state.englishStyle}*/ className="form-control" width="50%" placeholder="Insérez le nom Anglais du Bloc"/>
                                </div>
                            </div>

                            <div className="row"  style={{display: "flex", alignItems: "center"}}>
                                <h2 label-for="yearSelector" className="col-lg-6 col-xs-6">Numéro du Pokedex :</h2>
                                <div className="col-lg-6 col-xs-6">
                                    <input type="text" className="form-control" placeholder="Entrez le numéro du pokedex"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xs-12">
                            <div className="row" style={{display:'flex', flexWrap:'wrap'}}>
                                <h2 label-for="SymboleUploader" className="col-lg-12 col-xs-6">Illustration :</h2>  
                                <div className="col-lg-12 col-xs-6">
                                    <input type="file" id="SymboleUploader" accept="image/*" /*onChange={this.onLoadSymbol}*//>
                                    <img /*src={this.state.mySymbol}*/ height="300pt" width="250pt"/>   
                                </div>    
                                
                            </div>
                        </div>
                            <div className="col-lg-12 col-xs-12" style={{display:"flex", justifyContent:"flex-end", textAlign: "right"}}>
                                <button className="btn btn-primary" style={{marginRight:'5pt', marginTop:'5pt'}} type="button" /*onClick={this.sendRequest}*/>Créer le pokemon</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
