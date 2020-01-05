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

export default function DeleteUser(props) {
  const [deleteAlert,setDeleteAlert] = useState(null);
  const [nullAlert,setNullAlert] = useState(false);



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
      }
      setDeleteAlert(false);
      setTimeout(()=>setDeleteAlert(null),3000)
    }
    )

  }
  const killLogin=(event)=>{
    props.logout();
  }

  if(!props.userName && !props.logoutRedirect && props.userName!=='admin'){
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
      <center><h2>Delete User</h2></center>
      <Alert alert={nullAlert} type="danger" msg="No user found."/>
      <Alert alert={deleteAlert===null?false:true} type={!deleteAlert?"danger":"success"} msg={!deleteAlert?"Error in deleting user":"User Deleted"}/>
      <form onSubmit={handleDeleteUser}  style={{
                    border : '1px solid gray',
                    padding : '10px',
                    borderRadius : '5px',
                    boxShadow : '0px 0px 3px 3px gray'
                  }} className="col-sm-4 offset-sm-4">

                  <div className="form-group row">
                    <label htmlFor="username" className="col-form-label offset-1 h6">UserName </label>
                    <div className="col-sm-6 offset-1">
                      <input
                        type="text"
                        name="userName"
                        id="username"
                        className="form-control"
                        placeholder="UserName"
                        />
                    </div>
                  </div>
                  <div className="col-8 offset-2">
                    <button type="submit" className="btn btn-primary btn-block">Delete</button>
                  </div>
                </form>
              </div>
}
