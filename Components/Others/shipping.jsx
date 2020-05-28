import React from 'react';
import Axios from 'axios';

import Styles from '../../Assets/css/shipping.css';

import Header from '../Common/header.jsx';
import Alert from '../Common/alert.jsx';
import Error from '../Common/error.jsx';
import Environment from '../Common/environment.jsx';

var token = "";

class Shipping extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      indexes: [],
      errorFlag: false,
      alertFlag: false,
      title: "",
      message: ""
    }
  }

  componentDidMount(){
    token = window.sessionStorage.getItem('Auth-token');
    this.getShippingProducts();
  }

  getShippingProducts(){
    Axios.get(Environment.environment.shippingProducts + "?user=" + token)
    .then(res => {
      let data = res.data;
      if(data.message === "success"){
        this.setState({indexes: data.data});
        console.log(data.data);
      }
      else{
        this.setState({
          alertFlag: true,
          title: "Failure",
          message: "Kindly reload the page!"
        })
      }
    })
    .catch(err => {
      this.setState({
        errorFlag: true,
        title: "Failure",
        message: "Uh-Oh! Something went Wrong!"
      })
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

  render(){
    const {products, indexes, errorFlag, alertFlag, title, message} = this.state;
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        {
          indexes.map((i, index) => {
            return <div key={index} >
              <div className={Styles.Header} >Below products price in INR : {i.totalprice}</div>
              <div className={Styles.ShippingOuterDiv} >
              <div className="card-deck" >
              {
                i.products.map((product, index) => {
                  return <div key={index} className="col-sm-3" >
                    <div className="card h-100" >
                      <img className="card-img-top" height="250" width="180" src={this.base64String(product.productImage)} alt={product.productName}/>
                      <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text"><b>Description:</b> {product.productDescription.substring(0, 120) + "..."} </p>
                        <p className="card-text" ><b>Price:</b> {product.productPrice}</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">{product.productID}</small>
                        <p className={Styles.Status}>Shipping<i className="fa fa-truck fa-flip-horizontal" aria-hidden="true"></i></p>
                      </div>
                    </div>
                  </div>
                })
              }
              </div>
            </div>
          </div>
          })
        }
      </div>
    )
  }
}

export default Shipping;
