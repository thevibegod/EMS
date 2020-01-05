import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Loading from './Loading.js';
import axios from 'axios';
import server from '../server.js';
import LimitBox from './LimitBox.js';
import Header from './Header.js';
import Navbar from './Navbar.js';

export default class Limits extends React.Component{
  state={status:{status:null,lastSeen:null},limits:{maxTemp: null,
  minTemp: null,
  maxPressure: null,
  minPressure: null,
  maxHumidity: null,
  minHumidity: null},loading:false}


   killLogin=(event)=>{

    this.props.logout();
  }
 rerender = () =>{
    if (this.props.userName!==null && this.props.userName!=='admin' && this.props.token) {
      axios.all([
        axios({method:'get',url:server+`/lastdata?userName=${encodeURIComponent(this.props.userName)}`,headers:{'x-access-token':this.props.token}}),
        axios({method:'get',url:server+`/status?userName=${encodeURIComponent(this.props.userName)}`,headers:{'x-access-token':this.props.token}})
      ]).then(resArr=>{
        if(resArr[0].status===200){
              this.setState({limits:resArr[0].data.limits});
        }
      if(resArr[1].status===200){
            this.setState({status:resArr[1].data});
      }
    }).catch(err=>console.log(err));
      console.log('rerender');
    }
  }


 setDataAndLimits = () =>{
    if (this.props.userName!==null && this.props.userName!=='admin' && this.props.token) {
      this.setState({loading:true});
      axios.all([
        axios({method:'get',url:server+`/lastdata?userName=${encodeURIComponent(this.props.userName)}`,headers:{'x-access-token':this.props.token}}),
        axios({method:'get',url:server+`/status?userName=${encodeURIComponent(this.props.userName)}`,headers:{'x-access-token':this.props.token}})
      ]).then(resArr=>{
        if(resArr[0].status===200){
          this.setState({limits:resArr[0].data.limits});
        }
      if(resArr[1].status===200){
        this.setState({status:resArr[1].data});
      }
      }).then(()=>{
      this.setState({loading:false});
    }).catch(err=>console.log(err));
      console.log('setDataAndLimits');
    }
  }
  componentDidMount=()=> {
    if(!window.localStorage.getItem('user')){
        window.location.reload();
    }
  this.setDataAndLimits();
  setInterval(this.rerender,15000);
  }

render(){
  if(this.state.loading){

    return (<div>
    <Header/>
    <Loading/>
    </div>)
  }
  else{
  if((!window.localStorage.getItem('user') && !this.props.logoutRedirect && !this.state.limits) || this.props.userName==='admin'){
    return(
      <div>
      <Header/>
        <center>
        <h1>Access Forbidden</h1>
        <strong>Whoops! You can't access this page because you are not logged in.</strong>
        <Link to="/login">Click here to go to login page</Link>
        </center>
      </div>
    );
  }else if(this.props.logoutRedirect){
    return <Redirect to="/login"/>
  }
  else{
      return <div>
                <Navbar userName={this.props.userName} status={this.state.status.status} lastSeen={this.state.status.lastSeen} killLogin={this.killLogin}/>
                <Header/>
                <center><h1>User Dashboard</h1>
                <h2>Change Limits</h2>
                </center>
                <LimitBox token={this.props.token} userName={this.props.userName} values={this.state.limits}/>
              </div>
  }
}
}}
