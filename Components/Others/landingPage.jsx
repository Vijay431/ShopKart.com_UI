import React from 'react';

import Header from '../Common/header.jsx';
import HorizontalBar from './horizontalBar.jsx';
import Products from './Products.jsx';

class LandingPage extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <HorizontalBar />
                <Products />
            </div>
        )
    }
}

export default LandingPage;
