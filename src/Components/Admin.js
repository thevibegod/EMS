import React,{useState} from 'react';
import Loading from './Loading';
import server from '../server';
import axios from 'axios';
import Alert from './Alert';
import {Redirect} from 'react-router-dom';
import Header from './Header.js';

export default function Admin({handleLogin,setLogoutRedirect}){

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [isalert,setIsAlert] = useState(false);
  const [redirect,setRedirect] = useState(false);

  const onChange = event => {
    if(event.target.name==='userName'){
      setUserName(event.target.value);
    }else{
    setPassword(event.target.value);
    }
  }

  const validateForm = () => userName.length > 0 && password.length > 0


  const onSubmit = async event => {
    event.preventDefault();
    setLogoutRedirect(false);
    setLoading(true);
    axios.post(server+'/admin',{userName:userName,password:password}).then(res=>{
      console.log(res)
      if(res.status===200){
      setRedirect(true);
      handleLogin(userName,res.data.token);

    }

  }).catch(err=>{setLoading(false);
   setIsAlert(true);
   setTimeout(()=>setIsAlert(false),3000);});
  }

if(redirect){

  return <Redirect to="/admindashboard"/>
}
else{
if(loading){
  return(<div>
    <Header/>
    <div className="container">
        <div className="row"  style={{justifyContent:"center"}}>
          <Loading/>
        </div>
    </div>
  </div>)

}
else{
  return(
    <div>
    <Header/>
    <center><h1>Admin Login</h1></center>
      <Alert alert={isalert} msg="Invalid user credentials.Try again" type="danger"/>
      <div className="container" >
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <form onSubmit = {onSubmit}
              style={{
                border : '1px solid gray',
                padding : '10px',
                borderRadius : '5px',
                boxShadow : '0px 0px 3px 3px gray'
              }}>
              <div className="form-group row">
                <label htmlFor="username" className="col-form-label col-12 col-md-2 h6">UserName </label>
                <div className="col-sm-8 offset-sm-1">
                  <input
                    type="text"
                    name="userName"
                    id="username"
                    className="form-control"
                    placeholder="UserName"
                    value = {userName}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-12 col-md-2 h6">Password </label>
                <div className="col-sm-8 offset-sm-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password"
                    value = {password}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="col-sm-8 offset-sm-2">
                <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}}}
