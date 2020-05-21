import React from 'react';

import Header from '../Common/header.jsx';
import Styles from '../../Assets/css/cart.css';

class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: productArr,
      totalPrice: 0
    }
  }

  render(){
      const {products} = this.state;
      let totalPrice = 0;
      console.log(products);
      return(
        <div className={Styles.Card} >
          <Header loggedIn={false} loggedOut={false} />
          {
            products.map((item, index) => {
              if(item.quantity > 0){
                totalPrice = totalPrice + (item.quantity * parseInt(item.price));
                return <div key={index} className={Styles.CartOuterDiv} >
                  <img src={item.image} className="rounded float-left" height="190" width="250" alt="hello" />
                  <div className={Styles.Details} >
                    <p><b>Name: </b> {item.name} </p>
                    <p><b>Description: </b> {item.description} </p>
                    <p><b>Quantity: </b> {item.quantity} </p>
                    <p><b>Price: </b> {item.quantity * parseInt(item.price)} </p>
                    <small><i>*Delivery charges may differ than actual</i></small>
                  </div>
                </div>
              }
            })
          }
          <div className={Styles.Checkout} >
            <hr/>
            <div className={Styles.Button} >
              <button className="btn btn-primary" onClick={() => this.props.history.push('/shipping')} >Checkout</button>
            </div>
            <div className={Styles.Text} >
              <p><b>Total: </b> {totalPrice} </p>
            </div>
          </div>
        </div>
      )
    }
}

export default Cart;
