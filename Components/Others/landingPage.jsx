import React from 'react';

import Styles from '../../Assets/css/landingPage.css';

import Header from '../Common/header.jsx';
import JSONproducts from '../../Assets/JSON/products.js';
const products = JSONproducts.products;
import Items from '../../Assets/JSON/navProducts.js';
const NavItems = Items.navitems;
import ProductForm from './productForm.jsx';
import Cart from './cart.jsx';

class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: 'admin',
      NavItems: Items.navitems,
      Items: products,
      loggedin: true,
      loggedout: false
    }
  }

  componentDidMount(){
    this.setState({loggedin: this.props.location.state, loggedout: !this.props.location.state});
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
      this.props.history.push('/productform');
    }
  }

  addToCart(item, index){
    if(products[index].quantity >= 0){
      products[index].quantity = products[index].quantity + 1;
      this.setState({Items: products});
      productArr = this.state.Items;
    }
  }

  removeFromCart(item, index){
    if(products[index].quantity > 0){
      products[index].quantity = products[index].quantity - 1;
      this.setState({Items: products});
      productArr = this.state.Items;
    }
  }

  render(){
    const {user, NavItems, Items, loggedin, loggedout, cartFlag} = this.state;
    return(
      <div>
        <Header loggedIn={loggedin} loggedOut={loggedout} />
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
                Items.map((item, index) => {
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
                        <div className={Styles.ButtonGroup} >
                          <div className="btn btn-group" >
                            <button className="btn btn-success" onClick={() => this.addToCart(item, index)} ><i className="fa fa-plus" aria-hidden="true"></i></button>
                            <button className="btn btn-warn" disabled={true} >{item.quantity}</button>
                            <button className="btn btn-danger" onClick={() => this.removeFromCart(item, index)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                          </div>
                        </div>
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
