import React,{useState} from 'react';
import Loading from './Loading';
import server from '../server';
import axios from 'axios';
import Alert from './Alert';
import {Redirect} from 'react-router-dom';

export default function PasswordReset(){

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [OTP,setOTP] = useState('');
  const [loading,setLoading] = useState(false);
  const [isalert,setIsAlert] = useState(false);
  const [isPasswordForm,setIsPasswordForm] = useState(false);
  const [redirect,setRedirect] = useState(false);
  const [redirectAlert,setRedirectAlert] = useState(false);

  const onChange = event => {
    if(event.target.name==='userName'){
      setUserName(event.target.value);
    }else if(event.target.name==='password'){
      setPassword(event.target.value);
    }else{
      setOTP(event.target.value);
    }
  }

  const validateForm = () => userName.length > 0

  const validateOTPForm = () => userName.length > 0 && password.length > 0 && OTP.length > 0

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    axios.post(server+'/otprequest',{userName:userName}).then(res=>{
      if(res.status===200){
      setLoading(false);
      setIsPasswordForm(true);
    }

   }).catch(err=>{setLoading(false);
   setIsAlert(true);
   setTimeout(()=>setIsAlert(false),3000);})
  }

  const onSubmitOTP = async event => {
    event.preventDefault();
    setLoading(true);
    axios.post(server+'/passwordchange',{userName:userName,password:password,OTP:OTP}).then(res=>{
      if(res.status===200){
      setLoading(false);
      setRedirectAlert(true);
      setTimeout(()=>{setRedirectAlert(false);setRedirect(true);},3000);

    }

   }).catch(err=>{setLoading(false);
   setIsAlert(true);
   setTimeout(()=>setIsAlert(false),3000);})
  }

if(redirect){
  return(
    <Redirect to="/login" />
  );
}

if(loading){
  return(<div>
    <center><h2>Password Reset</h2></center>
    <div className="container">
        <div className="row"  style={{justifyContent:"center"}}>
          <Loading/>
        </div>
    </div>
  </div>)

}
if(isPasswordForm){
  return (
    <div>
    <center><h2>Password Reset</h2></center>
      <Alert alert={isalert} msg="Invalid OTP.Try again" type="danger"/>
      <Alert alert={redirectAlert} msg="Password changed Successfully.Redirecting to login page." type="success"/>
      <div className="container" >
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <p>An OTP has been sent to your registered mobile number.</p>
            <form onSubmit = {onSubmitOTP}
              style={{
                border : '1px solid gray',
                padding : '10px',
                borderRadius : '5px',
                boxShadow : '0px 0px 3px 3px gray'
              }}>
              <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-12 col-md-2 h6">New Password</label>
                <div className="col-12 col-md-10">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value = {password}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="otp" className="col-form-label col-12 col-md-2 h6">OTP</label>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="form-control"
                    placeholder="OTP"
                    value = {OTP}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="col-12 col-md-4 offset-md-2">
                <button type="submit" className="btn btn-primary btn-block" disabled={!validateOTPForm()}>Change Password</button>
                <button onClick={onSubmit} className="btn btn-primary btn-block" >Resend OTP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
  return(
    <div>
    <center><h2>Password Reset</h2></center>
      <Alert alert={isalert} msg="Inavalid User Credentials.Try again" type="danger"/>
      <div className="container" >
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <form onSubmit = {onSubmit}
              style={{
                border : '1px solid gray',
                padding : '10px',
                borderRadius : '5px',
                boxShadow : '0px 0px 3px 3px gray'
              }}>
              <div className="form-group row">
                <label htmlFor="username" className="col-form-label col-12 col-md-2 h6">UserName </label>
                <div className="col-12 col-md-10">
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
              <div className="col-12 col-md-4 offset-md-2">
                <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>Send OTP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
