import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = (props) => {
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(true);
  const [loggedOut, setloggedOut] = useState();

  useEffect(() => {
    setloggedIn(props.loggedIn);
    setloggedOut(props.loggedOut);
  }, [])

  const toLogin = () => {
    history.push('/login');
  }

  const toRegister = () => {
    history.push('/register');
  }

  const toCart = () => {
    history.push('/cart');
  }

  const toLogout = () => {
  }

  return(
      <nav className="navbar fixed-top navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i> ShopKart.com
        </Link>
        { loggedIn ? <div className="btn-group" role="toolbar" >
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
        </div> : null }

        { loggedOut ? <div className="btn-group" role="toolbar" aria-label="Basic example" >
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
        </div> : null }
      </nav>
  )
}

export default Header;
