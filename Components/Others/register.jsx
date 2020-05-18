import React from 'react';

import Styles from '../../Assets/css/register.css';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: ''
        }
        this.registerComponent = this.registerComponent.bind(this);
    }

    formValidator(event){
        this.setState({[event.target.name]: event.target.value})
    }

    registerComponent(){
        console.log("Registering");
    }

    render(){
        return(
            <div className={Styles.Card} >
                <div className="card">
                    <h3 className="card-header" >Register</h3>
                    <div className="card-body" >
                        <div className="card-text">
                            <label htmlFor="username" >Username:</label>
                            <input type="text" name="username" id="username" value={this.state.username} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className="card-text">
                            <label htmlFor="password" >Password:</label>
                            <input type="password" name="password" id="password" value={this.state.password} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className="card-text">
                            <label htmlFor="repassword" >Retype - Password:</label>
                            <input type="password" name="repassword" id="repassword" value={this.state.repassword} onChange={() => this.formValidator(event)} />
                        </div>
                    </div>
                    <div className="btn btn-group" >
                        <div className={Styles.Button} >
                            <button className="btn btn-success" onClick={this.registerComponent} >Submit</button>
                        </div>
                        <div className={Styles.Button} >
                            <a href="/login" ><button className="btn btn-danger" >Cancel</button></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;