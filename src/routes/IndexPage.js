import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MapComponent from '../components/MapComponent';
import SideMenu from '../components/SideMenu/SideMenu';
import OrderGeneration from '../components/OrderGeneration/OrderGeneration'
import FindingDriver from '../components/FindingDriver/FindingDriver'
import DriverFound from '../components/DriverFound/DriverFound'
import InTrip from '../components/InTrip/InTrip'
import TripFinished from '../components/TripFinished/TripFinished'
import ConfirmTripEnd from '../components/ConfirmTripEnd/ConfirmTripEnd'
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // console.log(this.props)
  }
    render(){
      return (
        <div className={styles.normal}>
          {/* {(()=>{
            if(!this.props.navigator.orderGenerationTriggered)
            return (
              <div>
              <div className={styles.button__bottom} onClick={()=>this.props.dispatch({type:'navigator/toggleOrderGeneration'})}>
               <div className={styles.button__bottom__filler}></div>
              </div>
              <SideMenu/>
            </div>
            )
            else return <OrderGeneration/>
          })()} */}
          <SideMenu/>
          {/* <FindingDriver/> */}
          {/* <DriverFound/> */}
          {/* <InTrip/> */}
          {/* <TripFinished/> */}
          <ConfirmTripEnd/>
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