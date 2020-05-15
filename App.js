import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

//Custom Pages .jsx
import LandingPage from './Components/Others/landingPage.jsx';
import Login from './Components/Others/login.jsx';
import Register from './Components/Others/register.jsx';
import Cart from './Components/Others/cart.jsx';
import Shipping from './Components/Others/shipping.jsx';
import ProductForm from './Components/Others/productForm.jsx';

class App extends Component{
   render(){
      return(
         <React.Fragment>
            <Router>
               <Switch>
                  <Route path="/" exact={true} component={LandingPage} />
                  <Route path="/login" exact={true} component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/shipping" component={Shipping} />
                  <Route path="/productForm" component={ProductForm} />
               </Switch>
            </Router>
         </React.Fragment>
      );
   }
}

export default App;


