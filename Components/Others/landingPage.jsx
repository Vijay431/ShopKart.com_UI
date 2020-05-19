import React from 'react';

import Styles from '../../Assets/css/landingPage.css';

import Header from '../Common/header.jsx';
import JSONproducts from '../../Assets/JSON/products.js';
const products = JSONproducts.products;
import Items from '../../Assets/JSON/navProducts.js';
const NavItems = Items.navitems;
import ProductForm from './productForm.jsx';

class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: 'admin',
      NavItems: Items.navitems
    }
  }

  componentDidMount(){
    if(this.state.user === 'admin'){
      Items.navitems[0].show = true;
      this.setState({NavItems: Items.navitems})
    }
    else{
      Items.navitems[0].show = false;
      this.setState({NavItems: Items.navitems})
    }
  }

  updateForm(item){
    this.props.history.push({
      pathname: '/productform',
      state: item
    })
  }

  itemDetail(name){
    console.log("clicked " + name);
    if(name === 'Add'){
      this.props.history.push('/productform')
    }
  }

  addToCart(){
    console.log("adding to cart");
  }

  removeFromCart(){
    console.log("removing from cart");
  }

  render(){
    const {user, NavItems} = this.state;
    return(
      <div>
        <Header loggedIn={true} loggedOut={false} />
        <div className={Styles.navbar} >
          <ul className={Styles.unorderedItems} >
            {
              NavItems.map((item, index) => {
                if(item.show){
                  return <li key={index} className={Styles.listedItem} onClick={() => this.itemDetail(item.name)} >{item.name}</li>
                }
              })
            }
          </ul>
        </div>
          <div className={Styles.ProductOuterDiv} >
            <div className="card-deck">
              {
                products.map((item, index) => {
                  return <div key={index} className="col-sm-3" >
                    <div className="card" >
                      <img className="card-img-top" height="200" width="150" src={item.image} alt={item.name}/>
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text"><b>Description:</b> {item.description}</p>
                        <p className="card-text" ><b>Price:</b> {item.price}</p>
                        {
                          user === 'admin' ? <div className={Styles.ActionButton} >
                            <button className="btn btn-warning" onClick={() => this.updateForm(item)} >
                              <i className="fa fa-pencil" aria-hidden="true"></i> Update
                            </button>
                          </div> : null
                        }
                        {
                          !item.addToCart ? <div className={Styles.ActionButton} >
                            <button className="btn btn-success" onClick={() => this.addToCart()} ><i className="fa fa-plus" aria-hidden="true"></i> Add to Cart</button>
                          </div> : <div className={Styles.ActionButton} >
                            <button className="btn btn-danger"  onClick={() => this.removeFromCart()} ><i className="fa fa-trash" aria-hidden="true"></i> Delete from Cart</button>
                          </div>
                        }
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">{item.id}</small>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
      </div>
    )
  }
}

export default LandingPage;
