import React from 'react';

import Styles from '../../Assets/css/shipping.css';
import Header from '../Common/header.jsx';

class Shipping extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phone: '',
      alternate: ''
    }
  }

  formValidator(event){
    this.setState({[event.target.name]: event.target.value});
  }

  checkout(){
    console.log("checkout");
  }

  render(){
    const {firstName, lastName, phone, email, address, alternate} = this.state;
    return(
      <div>
        <Header loggedin={false} loggedout={false} />
        <div className={Styles.Card} >
          <div className="card" >
            <h3 className="card-header" >Shipping Form</h3>
            <div className="card-body" >
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="First Name" value={firstName} onClick={() => this.formValidator(event)} required/>
                <input type="text" className="form-control" placeholder="Last Name" value={lastName} onClick={() => this.formValidator(event)} />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="contact"><i className="fa fa-phone" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Contact number" value={phone} onClick={() => this.formValidator(event)} aria-label="contact" aria-describedby="contact" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="email">@</span>
                </div>
                <input type="email" className="form-control" placeholder="Email address" value={email} onClick={() => this.formValidator(event)} aria-label="Email" aria-describedby="email" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Address</span>
                </div>
                <textarea className="form-control" aria-label="address" value={address} onClick={() => this.formValidator(event)} required ></textarea>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="alternate"><i class="fa fa-mobile" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Alternate Contact Number" value={alternate} onClick={() => this.formValidator(event)} aria-label="alternate" aria-describedby="alternate" required/>
              </div>
            </div>
            <div className="btn btn-group" role="toolbar" >
              <div className={Styles.Button} >
                <button className="btn btn-success" onClick={this.checkout} >Submit</button>
              </div>
              <div className={Styles.Button} >
                <button className="btn btn-danger" onClick={() => this.props.history.goBack()} >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shipping;
