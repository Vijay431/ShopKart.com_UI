import React from 'react';
import Styles from '../../Assets/css/horizontalBar.css';

const HorizontalBar = () => {
  const products = ['All', 'Accessories', 'Furniture', 'Clothes', 'Shoes', 'Books'];

  const itemDetail = (i) => {
    console.log("clicked " + i);
  }

  return(
    <div className={Styles.navbar} >
      <ul className={Styles.unorderedItems} >
        {
          products.map((item, index) => {
            return <li key={index} className={Styles.listedItem} onClick={() => itemDetail(index)} >{item}</li>
          })
        }
      </ul>
    </div>
  )
}

export default HorizontalBar;
