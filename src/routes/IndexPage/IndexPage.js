import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {routerRedux} from 'dva/router';
import MapComponent from '../../components/MapComponent';
import SideMenu from '../../components/SideMenu/SideMenu';
import OrderGeneration from '../../components/OrderGeneration/OrderGeneration'
import FindingDriver from '../../components/FindingDriver/FindingDriver'
import DriverFound from '../../components/DriverFound/DriverFound'
import InTrip from '../../components/InTrip/InTrip'
import TripFinished from '../../components/TripFinished/TripFinished'
import ConfirmTripEnd from '../../components/ConfirmTripEnd/ConfirmTripEnd'
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // console.log(this.props)
    if(!localStorage.getItem('isLoggedIn')){
      console.log('not logged in')
      this.props.dispatch(routerRedux.push({pathname:'/login'}))
    }
  }
    render(){
      return (
        <div className={styles.normal}>
          {(()=>{
            if(this.props.navigator.returnInitialStateTriggered){
            return (
              <div>
              <div className={styles.button__bottom} onClick={()=>
                this.props.dispatch({type:'navigator/save',payload:{
                  returnInitialStateTriggered:false,
                  orderGenerationTriggered:true
                }})}>
               <div className={styles.button__bottom__filler}></div>
              </div>
              <SideMenu/>
            </div>
            )}
            else if(this.props.navigator.orderGenerationTriggered){
              return <OrderGeneration/>
            } 
            else if(this.props.navigator.findingDriverTriggered){
              return (
                <div>
                  <SideMenu/>
                  <FindingDriver/>
                </div>
              )
            }
            else if(this.props.navigator.driverFoundTriggered){
              return(
                <div>
                  <SideMenu/>
                  <DriverFound/>
                </div>
              )
            } 
            else if(this.props.navigator.inTripTriggered){
              return(
                <div>
                  <SideMenu/>
                  <InTrip/>
                </div>
              )
            }
            else if(this.props.navigator.confirmTripEndTriggered){
              return(
                <div>
                  <SideMenu/>
                  <ConfirmTripEnd/>
                </div>
              )
            }
            else if(this.props.navigator.tripFinishedTriggered){
              return(
                <div>
                  <SideMenu/>
                  <TripFinished/>
                </div>
              )
            }
            
          })()}
          {/* <SideMenu/> */}
          {/* <FindingDriver/> */}
          {/* <DriverFound/> */}
          {/* <InTrip/> */}
          {/* <TripFinished/> */}
          {/* <ConfirmTripEnd/> */}
          <div className={styles.map__container}>
            <MapComponent/>
          </div>
       </div>
        
      )
    }
}

IndexPage.propTypes = {
};


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(IndexPage);