import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Styles from '../../Assets/css/header.css';

const Header = (props) => {
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(true);
  const [loggedOut, setloggedOut] = useState();
  const [shipping, setshipping] = useState();

  useEffect(() => {
    setloggedIn(props.loggedIn);
    setloggedOut(props.loggedOut);
    setshipping(props.shipping);
  }, [props.loggedin, props.loggedOut, props.shipping])

  const toLogin = () => {
    history.push('/login');
  }

  const toRegister = () => {
    history.push('/register');
  }

  const toCart = () => {
    history.push('/cart');
  }

  const toShipping = () =>{
    history.push('/shipping');
  }

  const toLogout = () => {
    window.sessionStorage.removeItem('Auth-token');
    window.sessionStorage.removeItem('admin');
    window.location.reload(true);
  }

  return(
      <nav className="navbar fixed-top navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
            <h5 className={Styles.Header} ><i className="fa fa-shopping-bag" aria-hidden="true"></i>ShopKart.com</h5>
        </Link>
        {
          loggedIn ? <div className="btn-group" role="toolbar" >
            <div className={Styles.Button} >
              <button type="button" className="btn btn-success" onClick={toLogin} >
                Login <i className="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </div>
            <div className={Styles.Button} >
              <button type="button" className="btn btn-dark" onClick={toRegister} >
                Signup <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          </div> : null
        }

        {
          loggedOut ? <div className="btn-group" role="toolbar" >
            <div className={Styles.Button} >
              <button type="button" className="btn btn-warning" onClick={toCart} >
                Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </button>
            </div>
            <div className={Styles.Button} >
              <button type="button" className="btn btn-danger" onClick={toLogout} >
                Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>
            </div>
          </div> : null
        }
        {
          shipping ? <div className={Styles.Button} >
              <button type="button" className="btn btn-warning" onClick={toShipping} >
                Shipping <i className="fa fa-truck fa-flip-horizontal" aria-hidden="true"></i>
              </button>
            </div> : null
        }
      </nav>
  )
}

export default Header;
