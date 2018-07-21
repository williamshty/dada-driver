import React from 'react';
import { connect } from 'dva';
// import { Map } from 'react-amap';
import loadPosition from '../utils/locater'
import {Map, DrivingRoute,Marker, NavigationControl, InfoWindow, TrafficLayer} from 'react-bmap'
class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation:this.props.currentLocation
    }
  }
  componentDidMount() {
    loadPosition(this.props.dispatch)
    // if ("geolocation" in navigator) {
    //   this.loadPosition();
    // }
  }
  // loadPosition = async () => {
  //   try {
  //     const position = await this.getCurrentPosition();
  //     const { latitude, longitude } = position.coords;
  //     this.setState({
  //       currentLocation:{
  //         lng:longitude,
  //         lat: latitude,
  //       }
  //     });
  //     console.log('position loaded')
  //     this.props.dispatch({
  //       type:'mapData/updateCurrentLocation',
  //       payload:{
  //         currentLocation:this.state.currentLocation
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getCurrentPosition = (options = {}) => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //   });
  // };
  render(){
    return (
      <Map style={{height: '100%'}} center={this.state.currentLocation} zoom="12">
       {(()=>{
         if(this.props.trafficActivated) return(<TrafficLayer/>)    
       })()}
       <Marker position={this.state.currentLocation}/>
       {/* <DrivingRoute start={this.state.currentLocation} end='牛市口'/>  */}
      </Map>
      );
  }
};

MapComponent.propTypes = {
};

function mapStateToProps(state) {
  return state.mapData
}

export default connect(mapStateToProps)(MapComponent);