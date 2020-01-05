import React,{useState} from 'react';
import Alert from './Alert.js';
import axios from 'axios';
import server from '../server.js';

export default function LimitBox({values,userName,token}){
  const [limits,setLimits] = useState(values);
  const [successAlert,setSuccessAlert] = useState(null);
  const handleChange=(event)=>{
    if(event.target.name==="minPressure"){
      setLimits({minPressure:event.target.value,maxPressure:limits.maxPressure,minTemp:limits.minTemp,maxTemp:limits.maxTemp,minHumidity:limits.minHumidity,maxHumidity:limits.maxHumidity})
    }else if(event.target.name==="maxPressure"){
      setLimits({minPressure:limits.minPressure,maxPressure:event.target.value,minTemp:limits.minTemp,maxTemp:limits.maxTemp,minHumidity:limits.minHumidity,maxHumidity:limits.maxHumidity})
    }
    else if(event.target.name==="minTemp"){
      setLimits({minPressure:limits.maxPressure,maxPressure:limits.maxPressure,minTemp:event.target.value,maxTemp:limits.maxTemp,minHumidity:limits.minHumidity,maxHumidity:limits.maxHumidity})
    }else if(event.target.name==="maxTemp"){
      setLimits({minPressure:limits.maxPressure,maxPressure:limits.maxPressure,minTemp:limits.minTemp,maxTemp:event.target.value,minHumidity:limits.minHumidity,maxHumidity:limits.maxHumidity})
    }else if(event.target.name==="minHumidity"){
      setLimits({minPressure:limits.maxPressure,maxPressure:limits.maxPressure,minTemp:limits.minTemp,maxTemp:limits.maxTemp,minHumidity:event.target.value,maxHumidity:limits.maxHumidity})
    }else{
      setLimits({minPressure:limits.maxPressure,maxPressure:limits.maxPressure,minTemp:limits.minTemp,maxTemp:limits.maxTemp,minHumidity:limits.minHumidity,maxHumidity:event.target.value})
    }
  }

  const handleSubmit =(event)=>{
    event.preventDefault();
    axios({method:'post',url:server+`/changelimits?userName=${encodeURIComponent(userName)}`,data:{minPressure:limits.minPressure,maxPressure:limits.maxPressure,minTemp:limits.minTemp,maxTemp:limits.maxTemp,minHumidity:limits.minHumidity,maxHumidity:limits.maxHumidity},headers:{'x-access-token':token}})
    .then((res)=>{
      setSuccessAlert(true);
      setTimeout(()=>setSuccessAlert(null),3000)
    }).catch(err=>{
      setSuccessAlert(false);
      setTimeout(()=>setSuccessAlert(null),3000)
    }
    )

  }

  if(!values){
    return (
      <Alert alert={true} type="danger" msg={`No limits found.`}/>
    );
  }

  return(
        <form style={{  border : '1px solid gray',
          padding : '10px',
          borderRadius : '5px',
          boxShadow : '0px 0px 3px 3px gray'}} className="col-sm-5 offset-sm-4 ">
        <Alert alert={successAlert===null?false:true} type={!successAlert?"danger":"success"} msg={!successAlert?"Error in updating limits":"Limits successfully updated"}/>
        <div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Minimum Pressure Limit&nbsp;</label>
        <input type="number" name="minPressure" className="col-sm-5 offset-sm-2" id="minPressure"  onChange={handleChange} value={limits.minPressure}/>
        </div><div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Maximum Pressure Limit</label>
        <input type="number" name="maxPressure" className="col-sm-5 offset-sm-2" id="maxPressure" onChange={handleChange} value={limits.maxPressure}/>
        </div><div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Minimum Temperature Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="number" name="minTemp" className="col-sm-5 offset-sm-1" id="minTemp" onChange={handleChange} value={limits.minTemp}/>
        </div><div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Maximum Temperature Limit&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="number" name="maxTemp" className="col-sm-5 offset-sm-1" id="maxTemp" onChange={handleChange} value={limits.maxTemp} />
        </div><div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Minimum Humidity Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="number" name="minHumidity" className="col-sm-5 offset-sm-1" id="minHumidity" onChange={handleChange} value={limits.minHumidity}/>
        </div><div className="row" style={{padding:'10px'}}>
        <label className="col-form-label offset-1 h6">Maximum Humidity Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="number" name="maxHumidity" className="col-sm-5 offset-sm-1" id="maxHumidity"  onChange={handleChange} value={limits.maxHumidity}/>
        </div><div className="col-sm-4 offset-4" style={{paddingTop:'10px',paddingBottom:'0'}} >
        <button className="btn btn-success" onClick={handleSubmit}>OK</button>
        </div>

        </form>
      );
}
