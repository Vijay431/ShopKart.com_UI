import React from 'react';

import Styles from '../../Assets/css/login.css';

class Login extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    formValidator(event){
        this.setState({[event.target.name] : event.target.value});
    }

    loginComponent(){
        console.log("Login");
    }

    render(){
        return(
            <div>
                <div className="card" >
                    <h3 className="card-header" >Login</h3>
                    <div className="card-body" >
                        <div className="card-text" >
                            <input type="text" name="username" value={this.username} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className="card-text">
                            <input type="password" name="password" value={this.password} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className={Styles.ButtonGroup} >
                            <div className={Styles.Button} >
                                <button type="submit" onClick={this.loginComponent} >Login</button>
                            </div>
                            <div className={Styles.Button} >
                                <a href="/" ><button type="button" >Cancel</button></a>
                            </div>
                        </div>
                        <div className="card-footer" >
                            <a href="/register" >Are you a new visitor?.Click here!</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;