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
        <div style={value>=max || value<=min?containerStyle1:containerStyle2}>
          <p>{props.paramName}</p>
          <p>{props.paramValue+' '+props.type}</p>
        </div>
      );
}


const containerStyle1 = {
  border:'2px solid black',
  display:'flex',
  justifyContent:'space-around',
  flexDirection:'row',
  margin:'50px 0',
  fontSize:'20px',
  backgroundColor:'rgba(255,0,0,0.2)'
}

const containerStyle2 = {
  border:'2px solid black',
  display:'flex',
  justifyContent:'space-around',
  flexDirection:'row',
  margin:'50px 0',
  fontSize:'20px',
  backgroundColor:'rgba(255,255,255,0.2)'
}
