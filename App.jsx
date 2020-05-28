import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

//Custom Pages .jsx
import LandingPage from './Components/Others/landingPage.jsx';
import Login from './Components/Others/login.jsx';
import Register from './Components/Others/register.jsx';
import Cart from './Components/Others/cart.jsx';
import Shipping from './Components/Others/shipping.jsx';
import ProductForm from './Components/Others/productForm.jsx';
import CheckoutForm from './Components/Others/checkoutform.jsx';
import NotFound from './Components/Common/notFound.jsx';

class App extends Component{
 constructor(props){
    super(props);
    this.state = {
      admin: ''
    }
 }

 componentDidMount(){
   this.setState({admin: window.sessionStorage.getItem('admin')});
 }

 render(){
    const {admin} = this.state;
  return(
   <div>
    <Switch>
     <Route path="/" exact={true} component={LandingPage} />
     <Route path="/login" component={Login} />
     <Route path="/register" component={Register} />
     <Route path="/cart" component={Cart} />
     <Route path="/shipping" component={Shipping} />
     <Route path="/checkoutform" component={CheckoutForm} />
     { admin === 'Y' ? <Route path="/productform" component={ProductForm} /> : null }
     <Route path="**" component={NotFound} />
    </Switch>
   </div>
  );
 }
}

export default App;
