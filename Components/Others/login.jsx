import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Styles from '../../Assets/css/login.css';
import Header from '../Common/header.jsx';
import Error from '../Common/error.jsx';
import Alert from '../Common/alert.jsx';
import Environment from '../Common/environment.jsx';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        errorFlag: false,
        alertFlag: false,
        title: '',
        message: ''
    }
    this.loginComponent = this.loginComponent.bind(this);
  }

  formValidator(event){
    this.setState({[event.target.name] : event.target.value});
  }

  loginComponent(){
    const {username, password, title, message} = this.state;
    if(username !== "" && password !== ""){
      Axios.get(Environment.environment.login + "?username=" + username + "&password=" + password)
      .then((res) => {
        let data = res.data;
        if(data.message === 'success'){
          if(data.data[0].type === 'admin'){
            window.sessionStorage.setItem('admin', 'Y');
          }
          else{
            window.sessionStorage.setItem('admin', 'N');
          }
          let token = window.btoa(username + ':' + password);
          window.sessionStorage.setItem('Auth-token', token);
          this.props.history.push('/');
        }
        else{
          this.setState({
            alertFlag: true,
            title: "Failure",
            message: "You're not a registered user. Redirecting to Register Page"
          })
        }
      })
      .catch((err) => {
        this.setState({
          errorFlag: true,
          title: "Failure",
          message: "Uh-Oh! Something went Wrong!"
        })
      })
    }
    else{
      this.setState({
        errorFlag: true,
        title: "Failure",
        message: "All fields are mandatory. Kindly fill the empty fields"
      })
    }
  }

  render(){
    const {username, password, errorFlag, alertFlag, title, message} = this.state;
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        <div className={Styles.Card} >
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
      <Error errorFlag={errorFlag} title={title} message={message} close={() => this.setState({errorFlag: false})} />
      <Alert alertFlag={alertFlag} title={title} message={message} close={() => this.props.history.push('/register')} />
      </div>
    )
  }
}

export default Login;
