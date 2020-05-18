import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

//Custom Pages .jsx
import LandingPage from './Components/Others/landingPage.jsx';
import Login from './Components/Others/login.jsx';
import Register from './Components/Others/register.jsx';
import Cart from './Components/Others/cart.jsx';
import Shipping from './Components/Others/shipping.jsx';
import ProductForm from './Components/Others/productForm.jsx';

class App extends Component{
   constructor(props){
      super(props);
   }

   render(){
      return(
         <div>
            <Switch>
               <Route path="/" exact={true} component={LandingPage} />
               <Route path="/login" component={Login} />
               <Route path="/register" component={Register} />
               <Route path="/cart" component={Cart} />
               <Route path="/shipping" component={Shipping} />
               <Route path="/productForm" component={ProductForm} />
            </Switch>
         </div>
      );
   }
}

export default App;


