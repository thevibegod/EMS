import React from 'react';
import Alert from './Alert.js';
import CanvasJSReact from '../canvasjs.react';
 var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GraphComponent(props){
  let interval = null;
  let axisLabel = null;
  let organizedData = [];
  let gap =null;
  if(props.data){
    const checkLimits = data => {
      const start = data[0].x;
      const end = data[data.length-1].x;
      const seconds = Math.floor(( new Date(end).getTime()- new Date(start).getTime())/1000);
      data.map(obj=>{
        organizedData.push({x:new Date(obj.x),y:parseFloat(obj.y)})
        return 200;
      })
      if(seconds<60){
        gap=10;
        interval="second";
        axisLabel="hh mm ss TT"
      }else if(seconds<3600){
        gap=5;
        interval="minute"
        axisLabel="hh mm ss TT"
      }else if(seconds<3600*24){
        gap=2;
        interval="hour"
        axisLabel="hh mm ss TT"
      }else{
        gap=1;
        interval ="day"
        axisLabel="DD MM YY"
      }
    }
    checkLimits(props.data);
  }

  const options = {
      title:{
        text: props.graphTitle
      },
      toolTip: {
			contentFormatter: function (e) {
				return "<strong>Time:</strong>"+" "+e.entries[0].dataPoint.x.toString() + " " +"<strong>"+props.graphTitle+":</strong>"+" "+e.entries[0].dataPoint.y+" "+props.unit;
			}
		},
      axisX:{
        title: "time",
        gridThickness: 0,
        interval:gap,
        intervalType: interval,
        valueFormatString: axisLabel,
        labelAngle: -20
      },
      axisY:{
        title: props.yVal + " ("+props.unit+")",
        gridThickness: 0,
      },
      data: [
      {
        markerColor: "red",
        type: "spline",
        dataPoints:
          organizedData
      }
      ]
    }

  return (
     <div>
      <Alert type="danger" alert={!props.data} msg={"No "+props.graphTitle+ " data found."}/>
       <CanvasJSChart options = {options}/>
     </div>
   );
}
