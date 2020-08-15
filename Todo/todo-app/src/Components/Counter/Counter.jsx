import React, {Component} from 'react';
import './Counter.css'

class Counter extends Component{
    constructor(){
        super();
        this.state={
            counter:0
        }
    }
    render() {
        return (
          <div className="Counter">
            <CounterButton by={1} incrementMethod={this.increment}></CounterButton>
            <CounterButton by={5} incrementMethod={this.increment}></CounterButton>
            <CounterButton by={10}incrementMethod={this.increment}></CounterButton>
            <ResetButton resetMethod={this.reset}></ResetButton>
            <span className="count">{this.state.counter}</span>
          </div>
        );
    }
    increment=(by)=>{
        this.setState({
            counter:this.state.counter+by
        });
    }
    reset=()=>{
        this.setState({
            counter:0
        });
    }
}
class CounterButton extends Component{

    constructor(){
        super();
    }
    render =() =>{
    return(
        <div className="CounterButton">
            <button onClick={this.increment}>{this.props.by}</button>
        </div>
    )
    }
    increment=()=>{
        this.props.incrementMethod(this.props.by);
    }
}

class ResetButton extends Component{
    constructor(){
        super();
    }
    render =() =>{
        return(
            <div className="ResetButton">
                <button onClick={this.props.resetMethod}>RESET</button>
            </div>
        )
    }
    
}
export default Counter