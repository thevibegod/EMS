import React, {
  useState
} from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Alert from './Alert';
import axios from 'axios';
import server from '../server';
import Header from './Header';
import Navbar from './AdminNavbar';

export default function AdminDashBoard(props) {
  const [successAlert,setSuccessAlert] = useState(null);
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


  const killLogin=(event)=>{
    props.logout();
  }
  if(!window.localStorage.getItem('user') && !props.logoutRedirect && props.userName!=='admin'){
    return(
      <div>
      <Header/>
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
      <Navbar killLogin={killLogin} userName={props.userName}/>
      <Header/>

              <center><h2>Create User</h2></center>
              <Alert alert={existAlert} type="danger" msg="User or NodeID already exist."/>
              <Alert alert={successAlert===null?false:true} type={!successAlert?"danger":"success"} msg={!successAlert?"Error in creating user":"User Created"}/>
              <div className="col-sm-5 offset-sm-4 ">
                <form onSubmit={handleSubmit}   style={{
                    border : '1px solid gray',
                    padding : '10px',
                    borderRadius : '5px',
                    boxShadow : '0px 0px 3px 3px gray'
                  }}>


            <div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">UserName&nbsp;&nbsp;</label>
                <input type="text" name="userName" className="col-sm-5 offset-sm-4" id="userName" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1  h6">Password&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="password" name="password" className="col-sm-5 offset-sm-4" id="password" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">NodeId&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" name="nodeId"  className="col-sm-5 offset-sm-4" id="nodeId"/>
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Minimum Pressure Limit&nbsp;</label>
                <input type="number" name="minPressure" className="col-sm-5 offset-sm-2" id="minPressure" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Maximum Pressure Limit</label>
                <input type="number" name="maxPressure" className="col-sm-5 offset-sm-2" id="maxPressure"/>
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Minimum Temperature Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="number" name="minTemp" className="col-sm-5 offset-sm-1" id="minTemp" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Maximum Temperature Limit&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="number" name="maxTemp" className="col-sm-5 offset-sm-1" id="maxTemp" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Minimum Humidity Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="number" name="minHumidity" className="col-sm-5 offset-sm-1" id="minHumidity" />
                </div><div className="row" style={{padding:'10px'}}>
                <label className="col-form-label offset-1 h6">Maximum Humidity Limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="number" name="maxHumidity" className="col-sm-5 offset-sm-1" id="maxHumidity" />
              </div><div style={{paddingTop:'10px',paddingBottom:'0'}} className="col-sm-4 offset-4">
                <input type="submit" className="btn btn-success" value="Create"/>
                </div>
                </form>
                </div>
              </div>
}
