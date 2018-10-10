import * as React from 'react';
import BlocFormular from './Formulars/BlocFormular';
import SetFormular from './Formulars/SetFormular';

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

    render(){
        return (
            <div>
                <button className="btn btn-primary" style={{"margin": "5px"}} onClick={this.AddBloc}>Add Bloc</button>
                <button className="btn btn-primary" onClick={this.AddSet}>Add Set</button>
                <div>
                
                    {this.state.content}
                </div>
            </div>
        )
    }
}