import React from 'react';
import Axios from 'axios';

import Header from '../Common/header.jsx';
import Environment from '../Common/environment.jsx';
import Alert from '../Common/alert.jsx';
import Error from '../Common/error.jsx';

import Styles from '../../Assets/css/cart.css';

var token = "";
var productarr = [];

class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      alertFlag: false,
      errorFlag: false,
      title: '',
      message: ''
    }
    this.base64string = this.base64string.bind(this);
  }

  componentDidMount(){
    token = window.sessionStorage.getItem('Auth-token');
    this.getCartProducts();
  }

  getCartProducts(){
    Axios.get(Environment.environment.getCart + "?user=" + token)
    .then(res => {
      let data = res.data;
      if(data.message === 'success'){
        let obj = JSON.parse(data.data[0].items);
        let objarr = Object.keys(obj);
        productarr = [];
        for(let key of objarr){
          for(let i of obj[key]){
            productarr.push(i);
          }
        }
        this.setState({products: productarr});
      }
      else{
        this.setState({
          alertFlag: true,
          title: 'Failure',
          message: 'Nothing is in cart. Redirecting to Home page!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({
        errorFlag: true,
        title: 'Failure',
        message: 'Uh-Oh! Something went Wrong!'
      })
    })
  }

  base64string(imageBuffer){
    let data = "";
    let imageBufferArray = new Uint8Array(imageBuffer.imgdata.data);
    let stringBuffer = String.fromCharCode.apply(null, imageBufferArray);
    let base64String = btoa(stringBuffer);
    let imageurl = `data:${imageBuffer.contentType};base64,` + base64String;
    return imageurl;
  }

  render(){
      const {products, alertFlag, errorFlag, title, message} = this.state;
      let totalPrice = 0;
      return(
        <div className={Styles.Card} >
          <Header loggedIn={false} loggedOut={false} shipping={true}/>
          {
            products.map((item, index) => {
              if(item.quantity > 0){
                totalPrice = totalPrice + (item.quantity * parseInt(item.productPrice));
                return <div key={index} className={Styles.CartOuterDiv} >
                  <img src={this.base64string(item.productImage)} className="rounded float-left" height="190" width="250" alt="hello" />
                  <div className={Styles.Details} >
                    <p><b>Name: </b> {item.productName} </p>
                    <p><b>Description: </b> {item.productDescription.substring(0, 100) + '...'} </p>
                    <p><b>Quantity: </b> {item.quantity} </p>
                    <p><b>Price: </b> {item.quantity * parseInt(item.productPrice)} </p>
                  </div>
                </div>
              }
            })
          }
          <div className={Styles.Checkout} >
            <hr/>
            <div className={Styles.Button} >
              <button className="btn btn-primary" onClick={() => this.props.history.push({pathname: '/checkoutform', state: {totalprice: totalPrice, products: productarr}})} >Checkout</button>
            </div>
            <div className={Styles.Text} >
              <p><b>Total: </b> {totalPrice} </p>
            </div>
          </div>
          <Alert alertFlag={alertFlag} title={title} message={message} close={() => this.props.history.push('/')} />
          <Error errorFlag={errorFlag} title={title} message={message} close={() => this.setState({errorFlag: false})} />
        </div>
      )
    }
}

export default Cart;
