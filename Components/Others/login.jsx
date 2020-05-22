import React from 'react';
import { Link } from 'react-router-dom';

import Styles from '../../Assets/css/login.css';
import Header from '../Common/header.jsx';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: ''
    }
    this.loginComponent = this.loginComponent.bind(this);
  }

  formValidator(event){
    this.setState({[event.target.name] : event.target.value});
  }

  loginComponent(){
    const {username, password} = this.state;
    if(username !== "" && password !== ""){
      this.props.history.push({
        pathname: '/',
        state: false
      });
    }
    else{
      //alert component
    }
  }

  render(){
    const {username, password} = this.state;
    return(
      <div className={Styles.Card} >
        <Header loggedIn={false} loggedOut={false} />
          <div >
            <div className="card" >
            <h3 className="card-header" >Login</h3>
            <div className="card-body" >
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="username"><i className="fa fa-user" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" name="username" placeholder="Username" aria-label="username" value={username} onChange={() => this.formValidator(event)} required aria-describedby="username" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="password"><i className="fa fa-key" aria-hidden="true"></i></span>
                </div>
                <input type="password" className="form-control" name="password" placeholder="Password" aria-label="password" value={password} onChange={() => this.formValidator(event)} required aria-describedby="password" />
              </div>
            </div>
            <div className="btn btn-group" >
                <div className={Styles.Button} >
                    <button type="submit" className="btn btn-success" onClick={this.loginComponent} >Login</button>
                </div>
                <div className={Styles.Button} >
                    <Link to="/"><button type="button" className="btn btn-danger" >Cancel</button></Link>
                </div>
            </div>
            <div className="card-footer" >
              <div className={Styles.Footer} >
                  <Link to="/register" >Are you a new visitor?.click here!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
