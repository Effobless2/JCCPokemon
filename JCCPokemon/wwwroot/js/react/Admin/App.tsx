import * as React from 'react';
import BlocFormular from './Formulars/BlocFormular';
import SetFormular from './Formulars/SetFormular';
import PokemonFormular from './Formulars/PokemonFormular';
import RarityFormular from './Formulars/RarityFormular';
import FormatFormular from "./Formulars/FormatFormular";
import CardFormular from './Formulars/CardFormular';

export default class App extends React.Component<{},{content:any}>{
    constructor(props){
        super(props);
        this.state = {
            content : <div>Empty</div>
        }
    }

    CloseForm = () => {
        this.setState({content : <div>Empty</div>})
    }

    AddBloc = () => {
        this.setState({content : <div> 
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <BlocFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>});
    }

    AddSet = () => {
        this.setState({content : <div> 
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <SetFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>});
    }

    AddPokemon = () => {
        this.setState({content : <div> 
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <PokemonFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>});
    }

    AddRarity = () =>{
        this.setState({content : <div> 
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <RarityFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>});
    }

    AddFormat = () => {
        this.setState({ content : <div>
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <FormatFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>
        })
    }

    AddCard = () => {
        this.setState({ content : <div>
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className = "row" style={{display:"flex", alignItems:"flex-end", flexWrap:"wrap"}}>
                <div className="col-lg-10">
                    <CardFormular/>
                </div>
                <button type="button" className="btn btn-danger" onClick={this.CloseForm}>Annuler</button>
            </div>
        </div>
        })
    }

    render(){
        return (
            <div>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddBloc}>Add Bloc</button>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddSet}>Add Set</button>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddPokemon}>Add Pokemon</button>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddRarity}>Add Rarity</button>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddFormat}>Add Format</button>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddCard}>Add Card</button>
                <div>
                
                    {this.state.content}
                </div>
            </div>
        )
    }
}