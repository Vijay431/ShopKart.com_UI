import React from 'react';
import Styles from '../../Assets/css/products.css';

import JSON from '../../Assets/JSON/products.js';

class Products extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quantity: 0,
      addFlag: false,
      minusFlag: true
    }
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
  }

  add(){
    if(this.state.quantity >= 0){
      var adding = this.state.quantity + 1;
      this.setState({addFlag: true});
      this.setState({quantity: adding});
    }
    else{
      this.setState({addFlag: false});
    }
  }

  minus(){
    if(this.state.quantity < 0){
      var subtracting = this.state.quantity - 1;
      this.setState({minusFlag: true});
      this.setState({quantity: subtracting});
    }
    else{
      this.setState({minusFlag: false});
    }
  }

  render(){
    return(
      <div className={Styles.ProductOuterDiv} >
        <div className="card-deck">
          {
            JSON.products.map((item, index) => {
              return <div key={index} className="col-sm-3" >
                <div className="card" >
                  <img className="card-img-top" height="250" width="150" src={item.image} alt={item.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><b>Description:</b> {item.description}</p>
                    <p className="card-text" ><b>Price:</b> {item.price}</p>
                    <div className={Styles.buttonGroup} >
                      <div className="btn-group" role="toolbar" >
                        <div>
                          <button type="button" className="btn btn-dark" disabled={this.state.addFlag} onClick={this.add} >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </div>
                        <div>
                          <input type="button" className="btn btn-warn" value={this.state.quantity} readOnly />
                        </div>
                        <div>
                          <button type="button" className="btn btn-danger" disabled={this.state.minusFlag} onClick={this.minus} >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
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
