import React from 'react';
import Axios from 'axios';

import Styles from '../../Assets/css/checkoutform.css';

import Header from '../Common/header.jsx';
import Environment from '../Common/environment.jsx';
import Alert from '../Common/alert.jsx';
import Error from '../Common/error.jsx';

var token = "";
var totalprice = 0;
var products = [];

class CheckoutForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      phone: '',
      alternate: '',
      alertFlag: false,
      errorFlag: false,
      title: '',
      message: ''
    }
  }

  componentDidMount(){
    token = window.sessionStorage.getItem('Auth-token');
    let state = this.props.location.state;
    totalprice = state.totalprice;
    products = state.products;
  }

  formValidator(event){
    this.setState({[event.target.name]: event.target.value});
  }

  shippingForm(){
    let body = {
      user: token,
      totalprice: totalprice,
      products: products
    }
    Axios.post(Environment.environment.addForShipping, body)
    .then(res => {
      let data = res.data;
      if(data.message === "failure"){
        this.setState({
          errorFlag: true,
          title: "Failure",
          message: "Please try again after sometime"
        })
      }
      else{
        this.setState({
          alertFlag: true,
          title: "Success",
          message: "Entered Details are saved Successfully. \nRedirecting to Shipping Status page"
        })
      }
    })
    .catch(err => {
      this.setState({
        errorFlag: true,
        title: "Failure",
        message: "Uh-oh! Something went Wrong!"
      })
    })
  }

  checkoutForm(){
    const {firstname, lastname, address, email, phone, alternate} = this.state;
    let body = {
      user: token,
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      phone: phone,
      alternate: alternate
    }
    Axios.post(Environment.environment.checkoutform, body)
    .then(res => {
      let data = res.data;
      if(data.message === 'success'){
        this.shippingForm();
      }
      else{
        this.setState({
          errorFlag: true,
          title: "Failure",
          message: "Please try again after sometime!"
        })
      }
    })
    .catch(err => {
      this.setState({
        errorFlag: true,
        title: 'Failure',
        message: 'Uh-Oh! Something went wrong!'
      })
    })
  }

  render(){
    const {firstname, lastname, phone, email, address, alternate, alertFlag, errorFlag, title, message} = this.state;
    return(
      <div>
        <Header loggedin={false} loggedout={false} />
        <div className={Styles.Card} >
          <div className="card" >
            <h3 className="card-header" >Checkout Form</h3>
            <div className="card-body" >
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" name="firstname" placeholder="First Name" value={firstname} onChange={() => this.formValidator(event)} required/>
                <input type="text" className="form-control" name="lastname" placeholder="Last Name" value={lastname} onChange={() => this.formValidator(event)} />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="contact"><i className="fa fa-phone" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" name="phone" placeholder="Contact number" value={phone} onChange={() => this.formValidator(event)} aria-label="contact" aria-describedby="contact" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="email">@</span>
                </div>
                <input type="email" className="form-control" name="email" placeholder="Email address" value={email} onChange={() => this.formValidator(event)} aria-label="Email" aria-describedby="email" required/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Address</span>
                </div>
                <textarea className="form-control" aria-label="address" name="address" value={address} onChange={() => this.formValidator(event)} required ></textarea>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="alternate"><i className="fa fa-mobile" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" name="alternate" placeholder="Alternate Contact Number" value={alternate} onChange={() => this.formValidator(event)} aria-label="alternate" aria-describedby="alternate" required/>
              </div>
            </div>
            <div className="btn btn-group" role="toolbar" >
              <div className={Styles.Button} >
                <button className="btn btn-success" onClick={() => this.checkoutForm()} >Submit</button>
              </div>
              <div className={Styles.Button} >
                <button className="btn btn-danger" onClick={() => this.props.history.goBack()} >Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <Alert alertFlag={alertFlag} title={title} message={message} close={() => this.props.history.push('/shipping')} />
        <Error errorFlag={errorFlag} title={title} message={message} close={() => this.setState({errorFlag: false})} />
      </div>
    )
  }
}

export default CheckoutForm;
