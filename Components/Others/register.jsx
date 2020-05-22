import React from 'react';
import { Link } from 'react-router-dom';

import Styles from '../../Assets/css/register.css';
import Header from '../Common/header.jsx';
import Error from '../Common/error.jsx';
import Alert from '../Common/alert.jsx';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '',
        repassword: '',
        errorFlag: false,
        alertFlag: false,
        message: '',
        title: ''
    }
    this.registerComponent = this.registerComponent.bind(this);
  }

  formValidator(event){
    this.setState({[event.target.name]: event.target.value})
  }

  registerComponent(){
    const {username, password, repassword, errorFlag, alertFlag, title, message} = this.state;
    if(username !== "" && password !== "" && repassword !== ""){
      if(password === repassword){
        this.props.history.push('/login');
      }
      else{
        this.setState({
          errorFlag: true,
          title: "Failure",
          message: "Passwords aren't matching!"
        })
      }
    }
    else {
      this.setState({
        errorFlag: true,
        title: "Failure",
        message: "All fields are mandatory. Kindly fill the empty fields"
      })
    }
  }

  render(){
    const {username, password, repassword, errorFlag, alertFlag, title, message} = this.state;
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        <div className={Styles.Card} >
          <div className="card">
            <h3 className="card-header" >Register</h3>
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
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="repassword"><i className="fa fa-key" aria-hidden="true"></i></span>
                </div>
                <input type="password" className="form-control" name="repassword" placeholder="Retype-Password" aria-label="repassword" value={repassword} onChange={() => this.formValidator(event)} required aria-describedby="repassword" />
              </div>
            </div>
            <div className="btn btn-group" >
              <div className={Styles.Button} >
                <button className="btn btn-success" onClick={this.registerComponent} >Submit</button>
              </div>
              <div className={Styles.Button} >
                <Link to="/login" ><button className="btn btn-danger" >Cancel</button></Link>
              </div>
            </div>
          </div>
        </div>
        <Alert alertFlag={alertFlag} title={title} message={message} close={() => this.setState({alertFlag: false})} />
        <Error errorFlag={errorFlag} title={title} message={message} close={() => this.setState({errorFlag: false})} />
      </div>
    )
  }
}

export default Register;
