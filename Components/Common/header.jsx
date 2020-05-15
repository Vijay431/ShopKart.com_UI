import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Styles from '../../Assets/css/header.css';

const Header = (props) => {
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState();
  const [goBack, setgoBack] = useState();

  const toLogin = () => {
    setloggedIn(true);
    // history.push('/login');
  }

  const toRegister = () => {
    history.push('/register');
  }

  const toCart = () => {
    history.push('/cart');
  }

  const toLogout = () => {
    setloggedIn(false);
  }

  return(
      <nav className="navbar fixed-top navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i> ShopKart.com
        </a>
        { !loggedIn ? <div className="btn-group" role="toolbar" >
          <div>
            <button type="button" className="btn btn-success" onClick={toLogin} >
              Login <i className="fa fa-sign-in" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-dark" onClick={toRegister} >
              Signup <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div> : <div className="btn-group" role="toolbar" aria-label="Basic example" >
          <div>
            <button type="button" className="btn btn-warning" onClick={toCart} >
              Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-danger" onClick={toLogout} >
              Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        </div> }
      </nav>
  )
}

export default Header;
