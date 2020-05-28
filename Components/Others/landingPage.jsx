import React from 'react';
import Axios from 'axios';

import Styles from '../../Assets/css/landingPage.css';

import Header from '../Common/header.jsx';
import Items from '../../Assets/JSON/navProducts.js';
const NavItems = Items.navitems;
import ProductForm from './productForm.jsx';
import Cart from './cart.jsx';
import Environment from '../Common/environment.jsx';
import Alert from '../Common/alert.jsx';
import Error from '../Common/error.jsx';

var products = [];

class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      admin: window.sessionStorage.getItem('admin'),
      NavItems: Items.navitems,
      Items: [],
      loggedin: true,
      loggedout: false,
      title: '',
      message: '',
      alertFlag: false,
      errorFlag: false
    }
    this.base64String = this.base64String.bind(this);
  }

  componentDidMount(){
    this.getProducts('All');
    let token = window.sessionStorage.getItem('Auth-token');
    if(token){
      this.setState({loggedin: false, loggedout: true});
    }
    if(this.state.admin === 'Y'){
      Items.navitems[0].show = true;
      this.setState({NavItems: Items.navitems})
    }
    else{
      Items.navitems[0].show = false;
      this.setState({NavItems: Items.navitems})
    }
  }

  getProducts(category){
    Axios.get(Environment.environment.getProducts + "?category=" + category)
    .then((res) => {
      let data = res.data;
      if(data.message === 'success'){
        products = data.data;
        this.setState({Items: data.data});
      }
      else{
        this.setState({
          alertFlag: true,
          title: 'Failure',
          message: 'Try again! After sometime'
        })
      }
    })
  }

  base64String(imageBuffer){
    let data = "";
    let imageBufferArray = new Uint8Array(imageBuffer.imgdata.data);
    let stringBuffer = String.fromCharCode.apply(null, imageBufferArray);
    let base64String = btoa(stringBuffer);
    let imageurl = `data:${imageBuffer.contentType};base64,` + base64String;
    return imageurl
  }

  updateForm(item){
    this.props.history.push({
      pathname: '/productform',
      state: item
    })
  }

  itemDetail(name){
    if(name === 'Add'){
      this.props.history.push('/productform');
    }
    else{
      this.getProducts(name);
    }
  }

  addToCart(item, index){
    if(products[index].quantity >= 0){
      products[index].quantity = products[index].quantity + 1;
      this.setState({Items: products});
    }
  }

  removeFromCart(item, index){
    if(products[index].quantity > 0){
      products[index].quantity = products[index].quantity - 1;
      this.setState({Items: products});
    }
  }

  render(){
    const {admin, NavItems, Items, loggedin, loggedout, cartFlag} = this.state;
    return(
      <div>
        <Header loggedIn={loggedin} loggedOut={loggedout} />
        <div className={Styles.Navbar} >
          <ul className={Styles.UnorderedItems} >
            {
              NavItems.map((item, index) => {
                if(item.show){
                  return <li key={index} className={Styles.ListedItem} onClick={() => this.itemDetail(item.name)} >
                    <i className={item.fafa} aria-hidden="true"></i><span className={Styles.Navitems} >{item.name}</span>
                  </li>
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
                  <div className="card h-100" >
                    <img className="card-img-top" height="250" width="180" src={this.base64String(item.productImage)} alt={item.productName}/>
                    <div className="card-body">
                      <h5 className="card-title">{item.productName}</h5>
                      <p className="card-text"><b>Description:</b> {item.productDescription.substring(0, 120) + "..."} </p>
                      <p className="card-text" ><b>Price:</b> {item.productPrice}</p>
                      {
                        admin === 'Y' ? <div className={Styles.ActionButton} >
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
                      <small className="text-muted">{item.productID}</small>
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
