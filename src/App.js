import React,{useState} from 'react';
import Login from './Components/Login';
import Admin from './Components/Admin';
import PasswordReset from './Components/PasswordReset';
import NotFound from './Components/NotFound';
import DashBoard from './Components/DashBoard';
import AdminDashBoard from './Components/AdminDashBoard';
import {Route,Switch,Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

function App() {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [logoutRedirect,setLogoutRedirect] = useState(false);
  const handleLogin = (user,token) => {
    setUser(user);
    setToken(token);
  }
  const logout =()=>{setUser(null);setLogoutRedirect(true)}
  return (
    <div>
    <div className="jumbotron" style={{textAlign:'center'}}>
      <h1>Environment Monitoring System</h1>
    </div>
    <Switch>
      <Route exact path={'/'} component={()=><Redirect to="/login"/>}/>
      <Route exact path={'/adminlogin'} component={()=><Admin handleLogin={handleLogin} setLogoutRedirect={setLogoutRedirect}/>}/>
      <Route exact path={'/login'} component={()=><Login handleLogin={handleLogin} setLogoutRedirect={setLogoutRedirect}/>}/>
      <Route exact path={'/passwordreset'} component={()=><PasswordReset handleLogin={handleLogin}/>}/>
      <Route exact path={'/admindashboard'} component={()=><AdminDashBoard userName={user} token={token} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route exact path={'/dashboard'} component={()=><DashBoard userName={user} token={token} logout={logout} logoutRedirect={logoutRedirect}/>}/>
      <Route component={NotFound}/>
    </Switch>
    </div>
  );
}

export default App;
