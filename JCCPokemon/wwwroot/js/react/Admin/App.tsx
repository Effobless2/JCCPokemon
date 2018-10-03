import * as React from 'react';
import BlocFormular from './Formulars/BlocFormular';

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

    AddExtension = () => {
        this.setState({content : <div> 
            <button type="button" className="close" onClick={this.CloseForm} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <BlocFormular/>
        </div>});
    }

    render(){
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddExtension}>Add Extension</button>
                <div>
                
                    {this.state.content}
                </div>
            </div>
        )
    }
}