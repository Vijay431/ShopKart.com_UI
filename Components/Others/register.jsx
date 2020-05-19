import React from 'react';
import { Link } from 'react-router-dom';

import Styles from '../../Assets/css/register.css';
import Header from '../Common/header.jsx';

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
    const {username, password, repassword} = this.state;
    if(username !== "" && password !== "" && repassword !== ""){
      if(password === repassword){
        this.props.history.push('/login');
      }
      else{
        // alert Component
      }
    }
    else {
      // alert Component
    }
  }

  render(){
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        <div className={Styles.Card} >
          <div className="card">
            <h3 className="card-header" >Register</h3>
            <div className="card-body" >
              <div className="card-text">
                <label htmlFor="username" >Username</label><span className={Styles.Required} >*</span>
                <input type="text" name="username" id="username" value={this.state.username} onChange={() => this.formValidator(event)} />
              </div>
              <div className="card-text">
                <label htmlFor="password" >Password</label><span className={Styles.Required} >*</span>
                <input type="password" name="password" id="password" value={this.state.password} onChange={() => this.formValidator(event)} />
              </div>
              <div className="card-text">
                <label htmlFor="repassword" >Retype-Password</label><span className={Styles.Required} >*</span>
                <input type="password" name="repassword" id="repassword" value={this.state.repassword} onChange={() => this.formValidator(event)} />
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
      </div>
    )
  }
}

export default Register;
