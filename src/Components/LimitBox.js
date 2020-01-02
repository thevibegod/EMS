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
        <form>
        <Alert alert={successAlert===null?false:true} type={!successAlert?"danger":"success"} msg={!successAlert?"Error in updating limits":"Limits successfully updated"}/>
          <p>Minimum Pressure Limit</p>
          <input type="number" name="minPressure" id="minPressure" onChange={handleChange} value={limits.minPressure}/>
          <p>Maximum Pressure Limit</p>
          <input type="number" name="maxPressure" id="maxPressure" onChange={handleChange} value={limits.maxPressure}/>
          <p>Minimum Temperature Limit</p>
          <input type="number" name="minTemp" id="minTemp" onChange={handleChange} value={limits.minTemp}/>
          <p>Maximum Temperature Limit</p>
          <input type="number" name="maxTemp" id="maxTemp" onChange={handleChange} value={limits.maxTemp}/>
          <p>Minimum Humidity Limit</p>
          <input type="number" name="minHumidity" id="minHumidity" onChange={handleChange} value={limits.minHumidity}/>
          <p>Maximum Humidity Limit</p>
          <input type="number" name="maxHumidity" id="maxHumidity" onChange={handleChange} value={limits.maxHumidity}/>
          <button className="btn btn-success" onClick={handleSubmit}>OK</button>
        </form>
      );
}



const containerStyle = {
  border:'2px solid black',
  display:'flex',
  justifyContent:'space-around',
  flexDirection:'row',
  margin:'50px 0',
  fontSize:'20px',
  backgroundColor:'rgba(255,255,255,0.2)'
}
