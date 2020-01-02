import React from 'react';

export default function Alert({alert,msg,type}){
  if(alert){
    return <div className={"alert alert-" +type}><strong>{msg}</strong></div>
  }
  return <div className="container"><p>&nbsp;</p></div>;
}
