import React from "react";
import { connect } from "dva";
import styles from "./TripPage.css";
import { routerRedux } from "dva/router";
import MapComponent from "../../components/MapComponent";
import SideMenu from "../../components/SideMenu/SideMenu";
import OrderGeneration from "../../components/OrderGeneration/OrderGeneration";
import FindingDriver from "../../components/FindingDriver/FindingDriver";
import DriverFound from "../../components/DriverFound/DriverFound";
import InTrip from "../../components/InTrip/InTrip";
import TripFinished from "../../components/TripFinished/TripFinished";
import ConfirmTripEnd from "../../components/ConfirmTripEnd/ConfirmTripEnd";
import RideShare from "../../components/RideShare/RideShare";
class TripPage extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount(){
  //   if(!localStorage.getItem('isLoggedIn')){
  //     console.log('not logged in')
  //     this.props.dispatch(routerRedux.push({pathname:'/login'}))
  //   }
  // }
  render() {
    // document.getElementById("root").style.marginTop = '-10px';
    // document.getElementsByTagName("META")[6].content='white';
    return (
      <div className={styles.normal}>
        <div className={styles.bottom__mask} onTouchMove={
          (e)=>{
            e.preventDefault()
            console.log('touched')
          }
          }/>
        <div className={styles.top__mask} />
        {(() => {
          if (this.props.navigator.orderGenerationTriggered) {
            return <OrderGeneration />;
          } else if (this.props.navigator.driverFoundTriggered) {
            return (
              <div>
                <DriverFound />
              </div>
            );
          } else if (this.props.navigator.inTripTriggered) {
            return (
              <div>
                <InTrip />
                {(() => {
                  if (this.props.navigator.rideShareTriggered) {
                    return (
                      <div>
                        <RideShare />
                      </div>
                    );
                  }
                })()}
              </div>
            );
          } else if (this.props.navigator.confirmTripEndTriggered) {
            return (
              <div>
                <ConfirmTripEnd />
              </div>
            );
          }
        })()}

        <div className={styles.map__container}>
          <MapComponent />
        </div>
      </div>
    );
  }
}

TripPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TripPage);
