import React from 'react';
import { Link } from 'react-router-dom';

import Styles from '../../Assets/css/productForm.css';
import Header from '../Common/header.jsx';

class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productName: '',
      productID: Date.now(),
      productDescription: '',
      productCategory: '',
      productImage: '',
      productPrice: '',
      whichButton: true
    }
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount(){
    if(Object.keys(this.props.location.state).length != 0){
      let item = this.props.location.state;
      this.setState({
        productName: item.name,
        productID: item.id,
        productDescription: item.description,
        productCategory: item.category,
        productPrice: item.price,
        productImage: item.image,
        whichButton: false
      })
    }
  }

  fileValidator(event){
    let file = event.target.files[0];
    let value = event.target.value;
    if(file !== null && file !== "" && (file.type === 'image/jpeg' || file.type === 'image/png')){
      this.setState({productImage: value});
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
    const {productName, productID, productDescription, productCategory, productImage, productPrice} = this.state;
    if(productName !== "" && productID !== "" && productDescription !== "" && productCategory !== "" && productPrice !== ""  || productImage!= "" ){
      console.log("added");
    }
    else{
      //alert Component
    }
  }

  updateProduct(){

  }

  render(){
    const {productName, productID, productDescription, productCategory, productImage, productPrice} = this.state;
    return(
      <div>
        <Header loggedIn={false} loggedOut={false} />
        <div className={Styles.Card} >
          <div className="card" >
            <h3 className="card-header" >Add/Update Item</h3>
            <div className="card-body" >
              <div className="card-text" >
                <label htmlFor="productName" >Product Name</label><span className={Styles.Required} >*</span>
                <input type="text" name="productName" id="productName" value={productName} onChange={() => this.formValidator(event)} required />
              </div>
              <div className="card-text" >
                <label htmlFor="productID" >Product ID</label><span className={Styles.Required} >*</span>
                <input type="text" name="productID" id="productID" value={productID} disabled={true} required />
              </div>
              <div className="card-text" >
                <label htmlFor="productDescription" >Product Description</label><span className={Styles.Required} >*</span>
                <input type="text" name="productDescription" id="productDescription" height="20" value={productDescription} onChange={() => this.formValidator(event)} required />
              </div>
              <div className="card-text" >
                <label htmlFor="productCategory" >Product Category</label><span className={Styles.Required} >*</span>
                <input type="text" name="productCategory" id="productCategory" value={productCategory} onChange={() => this.formValidator(event)} required />
              </div>
              <div className="card-text" >
                <label htmlFor="productPrice" >Product Price</label><span className={Styles.Required} >*</span>
                <input type="text" name="productPrice" id="productPrice" value={productPrice} onChange={() => this.formValidator(event)} required />
              </div>
              <div className="card-text" >
                { 
                  this.state.whichButton ? <div>
                    <label htmlFor="productImage" >Product Image</label>
                    <input type="file" name="productImage" id="productImage" value={productImage} onChange={() => this.fileValidator(event)} />
                  </div> : <img src={productImage} height="150" width="150" />
                }
              </div>
              <div className="btn btn-group" role="toolbar">
                { this.state.whichButton ? <div className={Styles.Button} >
                  <button type="submit" className="btn btn-success" onClick={this.addProduct} >Add</button>
                </div> : <div className={Styles.Button} >
                  <button type="submit" className="btn btn-success" onClick={this.updateProduct} >Update</button>
                </div> }
                <div className={Styles.Button} >
                  <Link to="/"><button type="button" className="btn btn-danger" >Cancel</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductForm;
