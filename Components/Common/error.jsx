import React,{useState, useEffect} from 'react';

import Styles from '../../Assets/css/error.css';

const Error = (props) => {

  return(
    <div>
    {
      props.errorFlag ? <div className={Styles.BackDrop} >
        <div className={Styles.Modal} >
          <div className={ props.title === 'Success' ? Styles.Success : Styles.Failure} >
            {props.title}
            <span className={Styles.Close} onClick={() => props.close()} >&times;</span>
          </div>
          <hr/>
          <div className={Styles.Body} >
            <i className="fa fa-info-circle" aria-hidden="true"></i> {props.message}
          </div>
          <hr/>
          <div className={Styles.ActionButton} >
            <button className="btn btn-info" onClick={() => props.close()} >Close</button>
          </div>
        </div>
      </div> : null
    }
    </div>
  )
}

export default Error;
