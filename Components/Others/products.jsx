import React from 'react';
import Styles from '../../Assets/css/products.css';

import JSON from '../../Assets/JSON/products.js';

const products = JSON.products;

class Products extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quantity: 0,
      isAddedToCart: false
    }
  }

  addToCart(){
    this.setState({isAddedToCart: true});
    console.log("adding to cart");
  }

  removeFromCart(){
    this.setState({isAddedToCart: false});
    console.log("removing from cart");
  }

  render(){
    return(
      <div className={Styles.ProductOuterDiv} >
        <div className="card-deck">
          {
            products.map((item, index) => {
              return <div key={index} className="col-sm-3" >
                <div className="card" >
                  <img className="card-img-top" height="250" width="150" src={item.image} alt={item.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><b>Description:</b> {item.description}</p>
                    <p className="card-text" ><b>Price:</b> {item.price}</p>
                      {
                        !item.addToCart ? <div className={Styles.ActionButton} >
                          <button className="btn btn-success" onClick={() => this.addToCart()} ><i className="fa fa-plus" aria-hidden="true"></i> Add to Cart</button>
                        </div> : <div className={Styles.ActionButton} > 
                          <button className="btn btn-danger"  onClick={() => this.removeFromCart()} ><i className="fa fa-trash" aria-hidden="true"></i> Delete from Cart</button>
                        </div> 
                      }
                    <div className="card-footer">
                      <small className="text-muted">{item.id}</small>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default Products;
