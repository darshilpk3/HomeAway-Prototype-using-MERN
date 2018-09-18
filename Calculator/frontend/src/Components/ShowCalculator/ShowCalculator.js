import React, { Component } from 'react';
import axios from 'axios';

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expression: ""
        }
        this.appendInput = this.appendInput.bind(this)
        this.clearInput = this.clearInput.bind(this)
        this.getAnswer = this.getAnswer.bind(this)
        this.handleInput = this.handleInput.bind(this)

    }

    componentWillMount(){
        this.setState({
            expression:""
        })
    }
    handleInput(e) {
        console.log(this.state.expression)
        // var regex1 = RegExp('[A-za-z!@#$%^&*()]');
        // let str = e.target.value
        //  if(!regex1.test(str)){
            this.setState({
                expression: e.target.value
            })
        //  }
        console.log(this.state.expression)
    }

    appendInput(e) {
        console.log(this.state.expression)
        this.setState({
            expression: this.state.expression.concat(e.target.value)
        })
        console.log(this.state.expression)
    }

    clearInput(e) {
        this.setState({
            expression: ""
        })
    }

    getAnswer(e) {

        var headers = new Headers()
        e.preventDefault()

        const data = {
            evalString: this.state.expression
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/solve', data)
            .then(response => {
                console.log("Status Code: " + response.status)
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({
                        expression: response.data + ""
                    });
                }
            })
    }

    render() {
        return (
            <div class="container">
                <div class="row padding">
                    <div class="col-md-4 offset-md-4">
                        <label for="exampleInputEmail1">Computation Field</label>
                    </div>
                </div>
                    <div class="row padding">
                        <div class="col-md-4 offset-md-4">
                            <input type="text" class="form-control" value={this.state.expression} name="expression" id="expression" onChange={this.handleInput} placeholder="Start Computing" readOnly/>
                        </div>
                    </div>
                    <div class="row padding">
                        <div class="col-md-4 offset-md-4">
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="1" onClick={this.appendInput} > 1 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="2" onClick={this.appendInput} > 2 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="3" onClick={this.appendInput} > 3 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm" name="add" value="+" onClick={this.appendInput} > + </button>
                        </div>
                    </div>
                    <div class="row padding">
                        <div class="col-md-4 offset-md-4">
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="4" onClick={this.appendInput} > 4 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="5" onClick={this.appendInput} > 5 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="6" onClick={this.appendInput} > 6 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm" name="subtract" value="-" onClick={this.appendInput} > - </button>
                        </div>
                    </div>
                    <div class="row padding">
                        <div class="col-md-4 offset-md-4">                    
                            <button type="button" class="btn btn-outline-primary btn-sm" name="operator" value="7" onClick={this.appendInput} > 7 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm " name="operator" value="8" onClick={this.appendInput} > 8 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm" name="operator" value="9" onClick={this.appendInput} > 9 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm" name="multiply" value="*" onClick={this.appendInput} > * </button>
                        </div>
                    </div>
                    <div class="row padding">
                        <div class="col-md-4 offset-md-4">                    
                            <button type="button" class="btn btn-danger btn-sm pr-1" name="operator"  onClick={this.clearInput} > AC </button>
                            <button type="button" class="btn btn-warning btn-sm pr-1" onClick={this.getAnswer} > = </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="0" onClick={this.appendInput} > 0 </button>
                            <button type="button" class="btn btn-outline-primary btn-sm pr-1" name="operator" value="/" onClick={this.appendInput} > / </button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default NavBar;
