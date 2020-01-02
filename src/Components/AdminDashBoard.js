import React, {
  useState,
  useEffect
} from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Alert from './Alert';
import Loading from './Loading.js';
import axios from 'axios';
import server from '../server.js';


export default function AdminDashBoard(props) {
  const [loading,setLoading] = useState(false);
  const [successAlert,setSuccessAlert] = useState(null);
  const [deleteAlert,setDeleteAlert] = useState(null);
  const [nullAlert,setNullAlert] = useState(false);
  const [existAlert,setExistAlert] = useState(false);

  const handleSubmit =(event)=>{
    event.preventDefault();

    let body = event.target.children;
    let data = {}
    for(let i=0;i<body.length;i++){
      if(body[i].value && body[i].name!=='')
      data[body[i].name]=body[i].value;
    }
    axios({method:'post',url:server+`/createuser`,data,headers:{'x-access-token':props.token}})
    .then((res)=>{
      setSuccessAlert(true);
      setTimeout(()=>setSuccessAlert(null),3000)
    }).catch(err=>{
      if(err.status===403){
        setExistAlert(true);
        setTimeout(()=>setExistAlert(null),3000)
      }else{
        setSuccessAlert(false);
        setTimeout(()=>setSuccessAlert(null),3000)
      }

    }
    )

  }

  const handleDeleteUser =(event)=>{
    event.preventDefault();

    let body = event.target.children;
    let data = {}
    for(let i=0;i<body.length;i++){
      if(body[i].value && body[i].name!=='')
      data[body[i].name]=body[i].value;
    }
    axios({method:'get',url:server+`/deleteuser?userName=${data.userName}`,headers:{'x-access-token':props.token}})
    .then((res)=>{
      setDeleteAlert(true);
      setTimeout(()=>setDeleteAlert(null),3000)
    }).catch(err=>{
      if(err.status===404){
        setNullAlert(true);
        setTimeout(()=>setNullAlert(null),3000)
      }{
      setDeleteAlert(false);
      setTimeout(()=>setDeleteAlert(null),3000)
  }  }
    )

  }
  const killLogin=(event)=>{
    props.logout();
  }

  if(loading){
    return <Loading/>
  }
  else{
  if(!props.userName && !props.logoutRedirect){
    return(
      <div>
        <center>
        <h1>Access Forbidden</h1>
        <strong>Whoops! You can't access this page because you are not logged in.</strong>
        <Link to="/adminlogin">Click here to go to login page</Link>
        </center>
      </div>
    );
  }else if(props.logoutRedirect){
    return <Redirect to="/adminlogin"/>
  }
      return <div>
                <center><h1>Admin DashBoard</h1></center>
                <p>{`Hello ${props.userName}`}</p>
                <button className="btn btn-danger" onClick={killLogin}>Logout</button>

                <form onSubmit={handleSubmit}>
                <center><h2>Create User</h2></center>
                <Alert alert={existAlert} type="danger" msg="User or NodeID already exist."/>
                <Alert alert={successAlert===null?false:true} type={!successAlert?"danger":"success"} msg={!successAlert?"Error in creating user":"User Created"}/>
                <p>UserName</p>
                <input type="text" name="userName" id="userName" />
                <p>Password</p>
                <input type="password" name="password" id="password" />
                <p>NodeId</p>
                <input type="text" name="nodeId"  />
                <p>Minimum Pressure Limit</p>
                <input type="number" name="minPressure" id="minPressure" />
                <p>Maximum Pressure Limit</p>
                <input type="number" name="maxPressure" id="maxPressure"/>
                <p>Minimum Temperature Limit</p>
                <input type="number" name="minTemp" id="minTemp" />
                <p>Maximum Temperature Limit</p>
                <input type="number" name="maxTemp" id="maxTemp" />
                <p>Minimum Humidity Limit</p>
                <input type="number" name="minHumidity" id="minHumidity" />
                <p>Maximum Humidity Limit</p>
                <input type="number" name="maxHumidity" id="maxHumidity" />
                <input type="submit" className="btn btn-success" value="Create"/>
                </form>

                <form onSubmit={handleDeleteUser}>
                <center><h2>Delete User</h2></center>
                <Alert alert={nullAlert} type="danger" msg="No user found."/>
                <Alert alert={deleteAlert===null?false:true} type={!deleteAlert?"danger":"success"} msg={!deleteAlert?"Error in deleting user":"User Deleted"}/>
                <p>UserName</p>
                <input type="text" name="userName" id="userName" />
                <input type="submit" className="btn btn-danger" value="Delete"/>
                </form>
              </div>
}

}
