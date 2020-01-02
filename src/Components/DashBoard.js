import React, {
  useState,
  useEffect
} from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import DisplayComponent from './DisplayComponent.js';
import Loading from './Loading.js';
import axios from 'axios';
import server from '../server.js';
import GraphComponent from './GraphComponent.js';
import LimitBox from './LimitBox.js';

export default function DashBoard(props) {
  const [data, setData] = useState({time:null,pressure:null,temperature:null,humidity:null});
  const [status,setStatus] = useState({status:null,lastSeen:null});
  const [pressureData, setPressureData] = useState(null);
  const [graphData,setGraphData] = useState({pressureData:null,temperatureData:null,humidityData:null});
  const [limits, setLimits] = useState({maxTemp: null,
  minTemp: null,
  maxPressure: null,
  minPressure: null,
  maxHumidity: null,
  minHumidity: null});
  const [loading,setLoading] = useState(false);

  const getGraphData = () =>{
    if(props.userName!==null && props.userName!=='admin' && props.token){
    axios({method:'get',url:server+`/graphdata?userName=${encodeURIComponent(props.userName)}`,headers:{'x-access-token':props.token}}).then(res=>{
        let data = res.data;
        let pData = [],tData=[],hData=[];
        if(data){
        data.time.map((item,ind)=>{
          pData.push({x:item,y:data.pressure[ind]})
          tData.push({x:item,y:data.temperature[ind]})
          hData.push({x:item,y:data.humidity[ind]})

        })
        setGraphData({pressureData:pData,temperatureData:tData,humidityData:hData});
      }
    })
  }
  }

  const killLogin=(event)=>{
    props.logout();
  }

  useEffect(()=> {
    const rerender = () =>{
      if (props.userName!==null && props.userName!=='admin' && props.token) {
        axios.all([
          axios({method:'get',url:server+`/lastdata?userName=${encodeURIComponent(props.userName)}`,headers:{'x-access-token':props.token}}),
          axios({method:'get',url:server+`/status?userName=${encodeURIComponent(props.userName)}`,headers:{'x-access-token':props.token}})
        ]).then(resArr=>{
          if(resArr[0].status===200){
                setData({time:resArr[0].data.time,pressure:resArr[0].data.pressure,temperature:resArr[0].data.temperature,humidity:resArr[0].data.humidity});
                setLimits(resArr[0].data.limits);
          }
        if(resArr[1].status===200){
              setStatus(resArr[1].data)
        }
      }).catch(err=>console.log(err));
      }
    }

    const setDataAndLimits = () =>{
      if (props.userName!==null && props.userName!=='admin' && props.token) {
        setLoading(true);
        axios.all([
          axios({method:'get',url:server+`/lastdata?userName=${encodeURIComponent(props.userName)}`,headers:{'x-access-token':props.token}}),
          axios({method:'get',url:server+`/status?userName=${encodeURIComponent(props.userName)}`,headers:{'x-access-token':props.token}})
        ]).then(resArr=>{
          if(resArr[0].status===200){
                setData({time:resArr[0].data.time,pressure:resArr[0].data.pressure,temperature:resArr[0].data.temperature,humidity:resArr[0].data.humidity});
                setLimits(resArr[0].data.limits);
          }
        if(resArr[1].status===200){
              setStatus(resArr[1].data)
        }
        }).then(()=>{
        setLoading(false);
      }).catch(err=>console.log(err));
      }
    }
  setDataAndLimits();
  getGraphData();
  setInterval(()=>getGraphData(),3000);
  setInterval(()=>rerender(),3000);
  },[]);

  if(loading){
    return <Loading/>
  }
  else{
  if((!props.userName && !props.logoutRedirect) || props.userName==='admin'){
    return(
      <div>
        <center>
        <h1>Access Forbidden</h1>
        <strong>Whoops! You can't access this page because you are not logged in.</strong>
        <Link to="/login">Click here to go to login page</Link>
        </center>
      </div>
    );
  }else if(props.logoutRedirect){
    return <Redirect to="/login"/>
  }
  else{
      return <div>
                <center><h1>User Dashboard</h1></center>
                <p>{`Hello ${props.userName}`}</p>
                <p>{`Data recorded at ${data.time}`}</p>
                <div className="">
                  {!status.lastSeen?<p>{`Device Status: ${status.status}`} <i className="fas fa-toggle-on"></i></p>:<p>{`Device Status: ${status.status}`} <span className="fas fa-toggle-off"></span> {` Last seen: ${status.lastSeen}`}</p>}
                </div>
                <button className="btn btn-danger" onClick={killLogin}>Logout</button>
                <DisplayComponent min={limits.minPressure} max={limits.maxPressure} paramValue={data.pressure} paramName="Pressure" type='mb'/>
                <DisplayComponent min={limits.minTemp} max={limits.maxTemp} paramValue={data.temperature} paramName="Temperature" type='C'/>
                <DisplayComponent min={limits.minHumidity} max={limits.maxHumidity} paramValue={data.humidity} paramName="Humidity" type='%'/>
                <LimitBox token={props.token} userName={props.userName} values={limits}/>
                <GraphComponent data={ graphData.pressureData} yVal="Pressure" graphTitle="Pressure" unit="mb"/>
                <GraphComponent data={ graphData.temperatureData} yVal="Temperature" graphTitle="Temperature" unit={'\u2103'}/>
                <GraphComponent data={ graphData.humidityData} yVal="Humidity" graphTitle="Humidity" unit="%"/>
              </div>
  }
}
}
