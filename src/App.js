import React,{useState} from 'react';
import Login from './Components/Login';
import Admin from './Components/Admin';
import PasswordReset from './Components/PasswordReset';
import NotFound from './Components/NotFound';
import DashBoard from './Components/DashBoard';
import AdminDashBoard from './Components/AdminDashBoard';
import DeleteUser from './Components/DeleteUser';
import {Route,Switch,Redirect} from 'react-router-dom';
import Limits from './Components/Limits';
import GraphVisualiser from './Components/GraphVisualiser';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

function App() {
  let storage = window.localStorage;

  const [logoutRedirect,setLogoutRedirect] = useState(false);
  const handleLogin = (user,token) => {
    storage.clear()
    storage.setItem('user',user);
    storage.setItem('token',token);
  }
  const logout =()=>{storage.clear();setLogoutRedirect(true)}
  return (
    <Switch>
      <Route exact path={'/'} component={()=><Redirect to="/login"/>}/>
      <Route exact path={'/adminlogin'} component={()=><Admin handleLogin={handleLogin} setLogoutRedirect={setLogoutRedirect}/>}/>
      <Route exact path={'/login'} component={()=><Login handleLogin={handleLogin} setLogoutRedirect={setLogoutRedirect}/>}/>
      <Route exact path={'/passwordreset'} component={()=><PasswordReset handleLogin={handleLogin}/>}/>
      <Route exact path={'/admindashboard'} component={()=><AdminDashBoard userName={storage.getItem('user')} token={storage.getItem('token')} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route exact path={'/dashboard'} component={()=><DashBoard userName={storage.getItem('user')} token={storage.getItem('token')} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route exact path={'/changelimits'} component={()=><Limits userName={storage.getItem('user')} token={storage.getItem('token')} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route exact path={'/deleteuser'} component={()=><DeleteUser userName={storage.getItem('user')} token={storage.getItem('token')} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route exact path={'/viewdetails'} component={()=><GraphVisualiser userName={storage.getItem('user')} token={storage.getItem('token')} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route component={NotFound}/>
    </Switch>
  );
}

export default App;
