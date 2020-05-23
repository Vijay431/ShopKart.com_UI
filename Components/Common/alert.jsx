import React, {useState, useEffect} from 'react';

import Styles from '../../Assets/css/alert.css';

const Alert = (props) => {
  return(
    <div>
      {
        props.alertFlag ? <div className={Styles.BackDrop} >
          <div className={Styles.Modal} >
            <div className={Styles.Header}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Alert
            </div>
            <hr/>
            <div className={Styles.Body} >
              <span className={props.title === 'Success' ? Styles.Success : Styles.Failure} >{props.title}</span><br/>
              <span className={Styles.Message} ><i className="fa fa-info-circle" aria-hidden="true"></i> {props.message}</span>
            </div>
            <hr/>
            <div className={Styles.ActionButton}>
              <button className="btn btn-info" onClick={props.close} >Okay</button>
            </div>
          </div>
        </div> : null
      }
    </div>
  )
}

export default Alert;
