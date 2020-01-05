import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import DisplayComponent from './DisplayComponent.js';
import Loading from './Loading.js';
import axios from 'axios';
import server from '../server.js';
import Header from './Header.js';
import Navbar from './Navbar.js';
import pressureImage from '../Images/pressure.png';
import temperatureImage from '../Images/temperature.png';
import humidityImage from '../Images/humidity.png';
import clockImage from '../Images/clock.png';

export default class DashBoard extends React.Component {
    state = {
      data: {
        time: null,
        pressure: null,
        temperature: null,
        humidity: null
      },
      limits:{maxTemp: null,
      minTemp: null,
      maxPressure: null,
      minPressure: null,
      maxHumidity: null,
      minHumidity: null},
      status: {
        status: null,
        lastSeen: null
      },
      loading: false
    }

    killLogin = (event) => {

      this.props.logout();
    }
    rerender = () => {
      if (this.props.userName !== null && this.props.userName !== 'admin' && this.props.token) {
        axios.all([
          axios({
            method: 'get',
            url: server + `/lastdata?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          }),
          axios({
            method: 'get',
            url: server + `/status?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          })
        ]).then(resArr => {
          if (resArr[0].status === 200) {
            this.setState({
              data: {
                time: resArr[0].data.time,
                pressure: resArr[0].data.pressure,
                temperature: resArr[0].data.temperature,
                humidity: resArr[0].data.humidity
              }
            });
            this.setState({
              limits:resArr[0].data.limits
            });
          }
          if (resArr[1].status === 200) {
            this.setState({
              status: resArr[1].data
            });
          }
        }).catch(err => console.log(err));
        console.log('rerender');
      }
    }

    setDataAndLimits = () => {
      if (this.props.userName !== null && this.props.userName !== 'admin' && this.props.token) {
        this.setState({
          loading: true
        });
        axios.all([
          axios({
            method: 'get',
            url: server + `/lastdata?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          }),
          axios({
            method: 'get',
            url: server + `/status?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          })
        ]).then(resArr => {
          if (resArr[0].status === 200) {
            this.setState({
              data: {
                time: resArr[0].data.time,
                pressure: resArr[0].data.pressure,
                temperature: resArr[0].data.temperature,
                humidity: resArr[0].data.humidity
              }
            });
            this.setState({
              limits:resArr[0].data.limits
            });
          }
          if (resArr[1].status === 200) {
            this.setState({
              status: resArr[1].data
            });
          }
        }).then(() => {
          this.setState({
            loading: false
          });
        }).catch(err => console.log(err));
        console.log('setDataAndLimits');
      }
    }
    componentDidMount = () => {
      if (!window.localStorage.getItem('user')) {
        window.location.reload();
      }
      this.setDataAndLimits();
      setInterval(this.rerender, 8000);
    }

    render() {
      if (this.state.loading) {

        return ( < div >
          <
          Header / >
          <
          Loading / >
          <
          /div>)
        }
        else {
          if ((!window.localStorage.getItem('user') && !this.props.logoutRedirect && !this.state.limits) || this.props.userName === 'admin') {
            return ( <
              div >
              <
              Header / >
              <
              center >
              <
              h1 > Access Forbidden < /h1> <
              strong > Whoops!You can 't access this page because you are not logged in.</strong> <
              Link to = "/login" > Click here to go to login page < /Link> <
              /center> <
              /div>
            );
          } else if (this.props.logoutRedirect) {
            return <Redirect to = "/login" / >
          } else {
            return <div >
              <
              Navbar userName = {
                this.props.userName
              }
            status = {
              this.state.status.status
            }
            lastSeen = {
              this.state.status.lastSeen
            }
            killLogin = {
              this.killLogin
            }
            /> <
            Header / >
              <
              center > < h1 > User Dashboard < /h1></center >


              <div class="row offset-1">
              <
              DisplayComponent  min = {
                this.state.limits.minPressure
              }
            max = {
              this.state.limits.maxPressure
            }
            paramValue = {
              this.state.data.pressure
            }
            paramName = "Pressure"
            type = 'mb' url={pressureImage}/ >
              <
              DisplayComponent  min = {
                this.state.limits.minTemp
              }
            max = {
              this.state.limits.maxTemp
            }
            paramValue = {
              this.state.data.temperature
            }
            paramName = "Temperature"
            type = {'\u2103'}
            url={temperatureImage}/ >
              <
              DisplayComponent min = {
                this.state.limits.minHumidity
              }
            max = {
              this.state.limits.maxHumidity
            }
            paramValue = {
              this.state.data.humidity
            }
            paramName = "Humidity"
            type = '%'
            url={humidityImage}
            / >
            <div className="card">
            <div className="card-body">
              <center><h4 className="card-title">Timestamp</h4></center>
              <img src={clockImage} style={{height:'250px',width:'250px'}} alt=""/>
              <center><h5 className="card-text text-primary">{this.state.data.time}</h5></center>
              </div>
            </div>
            </div>

              </div>
          }
        }
      }
    }
