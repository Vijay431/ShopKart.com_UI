import React from 'react';
import { Link } from 'react-router-dom';

import Styles from '../../Assets/css/login.css';

class Login extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    formValidator(event){
        this.setState({[event.target.name] : event.target.value});
    }

    loginComponent(){
        console.log("logged in");
    }

    render(){
        return(
            <div className={Styles.Card} >
                <div className="card" >
                    <h3 className="card-header" >Login</h3>
                    <div className="card-body" >
                        <div className="card-text" >
                            <label htmlFor="username" >Username</label> : 
                            <input type="text" name="username" id="username" value={this.username} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className="card-text">
                            <label htmlFor="password" >Password</label> : 
                            <input type="password" name="password" id="password" value={this.password} onChange={() => this.formValidator(event)} />
                        </div>
                        <div className="btn btn-group" >
                            <div className={Styles.Button} >
                                <button type="submit" className="btn btn-success" onClick={this.loginComponent} >Login</button>
                            </div>
                            <div className={Styles.Button} >
                                <a href="/" ><button type="button" className="btn btn-danger" >Cancel</button></a>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" >
                        <div className={Styles.Footer} >
                            <Link to="/register" >Are you a new visitor?.click here!</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;