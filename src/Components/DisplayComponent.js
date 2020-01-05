import React from 'react';
import Alert from './Alert.js';

export default function DisplayComponent(props){

  if(!props.min || !props.max || !props.paramValue){
    return (
      <Alert alert={true} type="danger" msg={`No ${props.paramName} value found.`}/>
    );
  }
  const min = parseFloat(props.min);
  const max = parseFloat(props.max);
  const value = parseFloat(props.paramValue.split(' ')[0]);

  return(
        <div className="card">
        <div className="card-body">
          <center><h4 className="card-title">{props.paramName}</h4></center>
          <img src={props.url} style={{height:'250px',width:'250px'}} alt=" "/>
          {value>=max || value<=min?<center><h5 className="card-text text-danger">{props.paramValue+' '+props.type}</h5></center>:<center><h5 className="card-text text-success">{props.paramValue+' '+props.type}</h5></center>}
          </div>
        </div>
      );
}
