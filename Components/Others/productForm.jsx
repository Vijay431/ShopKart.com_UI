import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Styles from '../../Assets/css/productForm.css';
import Header from '../Common/header.jsx';
import Items from '../../Assets/JSON/navProducts.js';
import Environment from '../Common/environment.jsx';
import Alert from '../Common/alert.jsx';
import Error from '../Common/error.jsx';
const NavItems = Items.navitems;
var formdata = new FormData();
var item = {};
var imageBuffer = {};

class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: 'Add Form',
      productName: '',
      productID: Date.now(),
      productDescription: '',
      productCategory: '',
      productPrice: '',
      whichButton: true,
      imageButton: true,
      isImageAlreadyAttached: true,
      popupTitle: '',
      message: '',
      alertFlag: false,
      errorFlag: false
    }
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.base64String = this.base64String.bind(this);
  }

  componentDidMount(){
    item = this.props.location.state;
    if(item !== undefined && item !== null){
      this.setState({
        title: 'Update Form',
        productName: item.productName,
        productID: item.productID,
        productDescription: item.productDescription,
        productCategory: item.productCategory,
        productPrice: 0, //item.productPrice
        whichButton: false,
        imageButton: false
      })
      imageBuffer = item.productImage;
    }
  }

  base64String(){
    let data = "";
    let imageBufferArray = new Uint8Array(imageBuffer.imgdata.data);
    let stringBuffer = String.fromCharCode.apply(null, imageBufferArray);
    let base64String = btoa(stringBuffer);
    let imageurl = `data:${imageBuffer.contentType};base64,` + base64String;
    return imageurl;
  }

  fileValidator(event){
    let file = event.target.files[0];
    this.setState({isImageAlreadyAttached: false});
    if(file !== null && file !== "" && (file.type === 'image/jpeg' || file.type === 'image/png')){
      formdata.append('productImage', file);
      return true;
    }
    else{
      return false;
    }
  }

  formValidator(event){
    this.setState({[event.target.name]: event.target.value});
  }

  addProduct(){
    const {productName, productID, productDescription, productCategory, productPrice} = this.state;
    if(productName !== "" && productID !== "" && productDescription !== "" && productCategory !== "" && productPrice !== ""){
      formdata.append('productName', productName);
      formdata.append('productID', productID);
      formdata.append('productDescription', productDescription);
      formdata.append('productCategory', productCategory);
      formdata.append('productPrice', productPrice);
      formdata.append('quantity', 0);

      Axios.post(Environment.environment.addProducts, formdata)
      .then((res) => {
        let data = res.data;
        if(data.message === "success"){
          formdata = {};
          this.setState({
            alertFlag: true,
            popupTitle: 'Success',
            message: 'Product added successfully!',
            productName: '',
            productID: Date.now(),
            productCategory: '',
            productDescription: '',
            productPrice: ''
          })
        }
        else{
          this.setState({
            alertFlag: true,
            popupTitle: 'Failure',
            message: 'Try again! After sometime'
          })
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorFlag: true,
          popupTitle: 'Failure',
          message: 'Uh-Oh! Something went Wrong!'
        })
      })
    }
    else{
      this.setState({
        errorFlag: true,
        popupTitle: 'Failure',
        message: 'All fields are mandatory. Kindly fill the empty fields'
      })
    }
  }

  updateProduct(){
    const {productName, productID, productDescription, productCategory, productPrice, isImageAlreadyAttached} = this.state;
    if(productName !== "" && productID !== "" && productDescription !== "" && productCategory !== "" && productPrice !== ""){
      formdata.append('objectid', item._id);
      formdata.append('productName', productName);
      formdata.append('productID', productID);
      formdata.append('productDescription', productDescription);
      formdata.append('productCategory', productCategory);
      formdata.append('productPrice', productPrice);
      formdata.append('quantity', 0);

      Axios.post(Environment.environment.updateProducts, formdata)
      .then(res => {
        let data = res.data;
        if(data.message === "success"){
          this.setState({
            alertFlag: true,
            popupTitle: 'Success',
            message: 'Product successfully updated!'
          })
        }
        else{
          this.setState({
            errorFlag: false,
            popupTitle: 'Failure',
            message: 'Try again! After sometime'
          })
        }
      })
      .catch(err => {
        this.setState({
          errorFlag: false,
          popupTitle: 'Failure',
          message: 'Uh-Oh! Something went Wrong!'
        })
      })
    }
  }

  close(){
    this.props.history.push('/');
    window.location.reload(true);
  }

  render(){
    const {title, productName, productID, productDescription, productCategory, productPrice, popupTitle, alertFlag, errorFlag, message} = this.state;
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        <div className={Styles.Card} >
          <div className="card" >
            <h3 className="card-header" >{title}</h3>
            <div className="card-body" >
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="productName"><i className="fa fa-at" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" name="productName" placeholder="Product Name" aria-label="productName" value={productName} onChange={() => this.formValidator(event)} required aria-describedby="productName" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="productID"><i className="fa fa-key" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" title="automatically generatable key" aria-label="productID" name="productID" value={productID} required disabled={true} aria-describedby="productID" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="productDescription" ><i className="fa fa-list-alt" aria-hidden="true"></i></span>
                </div>
                <textarea className="form-control" aria-label="description" name="productDescription" placeholder="Product Description" value={productDescription} onChange={() => this.formValidator(event)} required aria-describedby="productDescription" ></textarea>
              </div>
              <div className="input-group mb-3" >
              <div className="input-group-prepend">
                <span className="input-group-text" id="productCategory" ><i className="fa fa-list-ul" aria-hidden="true"></i></span>
              </div>
                <select className="form-control" name="productCategory" title="select a category" value={productCategory} onChange={() => this.formValidator(event)} required>
                  <option>...</option>
                  {
                    NavItems.map((category, index) => {
                      if(category.name !== 'All' && category.name !== 'Add'){
                        return <option key={index} value={category.name} >
                          {category.name}
                        </option>
                      }
                    })
                  }
                </select>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-inr" aria-hidden="true"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Price" name="productPrice" id="productPrice" aria-label="Amount in INR" value={productPrice} onChange={() => this.formValidator(event)} required />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
              <div className="card-text" >
                {
                  this.state.imageButton ? <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-file-image-o" aria-hidden="true"></i></span>
                    </div>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="productImage" onChange={() => this.fileValidator(event)} />
                      <label className="custom-file-label" htmlFor="productImage">Choose file</label>
                    </div>
                  </div> : <div className={Styles.Image} >
                    <label htmlFor="productImage" >Product Image</label>
                    <i className="fa fa-times" title="remove image" onClick={() => this.setState({imageButton: true})}  aria-hidden="true"></i>
                    <img src={this.base64String()} id="productImage" height="200" width="250" />
                  </div>
                }
              </div>
            </div>
            <div className="btn btn-group" role="toolbar">
              {
                this.state.whichButton ? <div className={Styles.Button} >
                  <button type="submit" className="btn btn-success" onClick={this.addProduct} >Add</button>
                </div> : <div className={Styles.Button} >
                  <button type="submit" className="btn btn-success" onClick={this.updateProduct} >Update</button>
                </div>
              }
              <div className={Styles.Button} >
                <Link to="/"><button type="button" className="btn btn-danger" >Cancel</button></Link>
              </div>
            </div>
          </div>
        </div>
        <Alert alertFlag={alertFlag} title={popupTitle} message={message} close={() => this.close() } />
        <Error errorFlag={errorFlag} title={popupTitle} message={message} close={() => this.setState({errorFlag: false}) } />
      </div>
    )
  }
}

export default ProductForm;
