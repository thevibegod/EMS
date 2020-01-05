import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Loading from './Loading.js';
import axios from 'axios';
import server from '../server.js';
import GraphComponent from './GraphComponent.js';
import Header from './Header.js';
import Navbar from './Navbar.js';

export default class GraphVisualiser extends React.Component {
    state = {
      status: {
        status: null,
        lastSeen: null
      },
      graphData: {
        pressureData: null,
        temperatureData: null,
        humidityData: null
      },
      loading: false
    }


    getGraphData = () => {
      if (this.props.userName !== null && this.props.userName !== 'admin' && this.props.token) {
        axios({
          method: 'get',
          url: server + `/graphdata?userName=${encodeURIComponent(this.props.userName)}`,
          headers: {
            'x-access-token': this.props.token
          }
        }).then(res => {
          let data = res.data;
          let pData = [],
            tData = [],
            hData = [];
          if (data) {
            data.time.map((item, ind) => {
              pData.push({
                x: item,
                y: data.pressure[ind]
              })
              tData.push({
                x: item,
                y: data.temperature[ind]
              })
              hData.push({
                x: item,
                y: data.humidity[ind]
              })
              return 200;
            })
            this.setState({
              graphData: {
                pressureData: pData,
                temperatureData: tData,
                humidityData: hData
              }
            });
          }
        })
        console.log('getGraphData');
      }
    }

    killLogin = (event) => {

      this.props.logout();
    }
    rerender = () => {
      if (this.props.userName !== null && this.props.userName !== 'admin' && this.props.token) {
          axios({
            method: 'get',
            url: server + `/status?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          }).then(res=> {
          if (res.status === 200) {
            this.setState({
              status: res.data
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
          axios({
            method: 'get',
            url: server + `/status?userName=${encodeURIComponent(this.props.userName)}`,
            headers: {
              'x-access-token': this.props.token
            }
          }).then(res => {
          if (res.status === 200) {
            this.setState({
              status: res.data
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
      this.getGraphData();
      setInterval(this.getGraphData, 20000);
      setInterval(this.rerender, 15000);
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

             <
            GraphComponent data = {
              this.state.graphData.pressureData
            }
            yVal = "Pressure"
            graphTitle = "Pressure"
            unit = "mb" / >
              <
              GraphComponent data = {
                this.state.graphData.temperatureData
              }
            yVal = "Temperature"
            graphTitle = "Temperature"
            unit = {
              '\u2103'
            }
            /> <
            GraphComponent data = {
              this.state.graphData.humidityData
            }
            yVal = "Humidity"
            graphTitle = "Humidity"
            unit = "%" / >
              <
              /div>
          }
        }
      }
    }
