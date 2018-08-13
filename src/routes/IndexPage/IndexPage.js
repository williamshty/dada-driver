import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import { routerRedux } from "dva/router";
import DriverCard from "../../components/DriverCard/DriverCard";
import SideMenu from "../../components/SideMenu/SideMenu";
import OrderCard from "../../components/OrderCard/OrderCard";
import {
  openAndReceivingOrder,
  updateLocation,
  clientConfirmed
} from "../../utils/socket";
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socketTest: "hi",
      opened: false,
      closed: false,
      fillEmpty: false,
      fillIp: false,
      evaluationIp: false,
      evaluationFailed: false,
      verifyIp: false,
      verifyFailed: false
    };
  }
  componentWillMount() {
    localStorage.setItem("driverID", "5b5940e60db7b95f182204ad");
    // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    updateLocation(this.props.mapData.currentLocation);
    clientConfirmed((err, clientConfirmed) => {
      console.log(clientConfirmed);
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          clientConfirmed: true
        }
      });
    });
    // setInterval(()=>{
    //   console.log(this.props.mapData.currentLocation)
    //   updateLocation(this.props.mapData.currentLocation)
    // },3000)
  }
  componentDidMount(){
    console.log(this.props.driverStatus.currentOrder)
    openAndReceivingOrder((err, socketTest) => {
      if (this.props.driverStatus.clientIn) {
        console.log(this.props.driverStatus.clientIn)
        this.props.dispatch({
          type: "navigator/save",
          payload: {
            rideShareTriggered: true
          }
        });
        this.props.dispatch({
          type: "driverStatus/save",
          payload: {
            shareOrder: socketTest
          }
        });
      } else {
        this.props.dispatch({
          type: "driverStatus/save",
          payload: {
            orderList: [...this.props.driverStatus.orderList, socketTest],
            clientIn:true
          }
        });
      }
    });
  }
  toggleClose() {
    this.props.dispatch({
      type: "driverStatus/save",
      payload: {
        opened: false,
        closed: true
      }
    });
  }
  toggleOpen() {
    this.props.dispatch({
      type: "driverStatus/save",
      payload: {
        opened: true,
        closed: false
      }
    });
  }
  loadSideMenuStyle() {
    if (!this.props.navigator.sideMenuOpen) {
      return styles.side__menu__container__below;
    } else {
      return styles.side__menu__container;
    }
  }
  render() {
    // document.getElementsByTagName("META")[6].content='black-translucent';
    if (process.env.NODE_ENV !== "development") {
      document.getElementById("root").style.marginTop = "-0px";
      document.getElementsByTagName("META")[6].content = "black-translucent";
    }
    return (
      // <div className={}></div>
      <div>
        <div className={styles.base__container}>
          {(() => {
            if (this.props.driverStatus.closed) {
              return (
                <div>
                  <div className={styles.top__closed__text}>收车模式</div>
                  <div
                    className={styles.top__toggle__work}
                    onClick={() => this.toggleOpen()}
                  >
                    出车
                  </div>
                </div>
              );
            } else if (this.props.driverStatus.opened) {
              return (
                <div>
                  <div className={styles.top__logo__container} />
                  <div
                    className={styles.top__toggle__work}
                    onClick={() => this.toggleClose()}
                  >
                    收车
                  </div>
                </div>
              );
            } else {
              return <div className={styles.top__logo__container} />;
            }
          })()}

          <div className={this.loadSideMenuStyle()}>
            <SideMenu />
          </div>
          <div className={styles.driver__card__container}>
            <DriverCard
              balance="1.67"
              trip="8"
              time="1 h 36 min"
              rating="4.6"
            />
          </div>
          <div className={styles.driver__order__container} />
          <div className={styles.driver__status__container}>
            {/* open */}
            {(() => {
              if (this.props.driverStatus.opened) {
                return (
                  <div className={styles.driver__order__list}>
                    {(() => {
                      return this.props.driverStatus.orderList.map(order => (
                        <div
                          key={Math.random()}
                          className={styles.driver__order__item}
                          onClick={e => {
                            this.props.dispatch({
                              type: "driverStatus/save",
                              payload: {
                                currentOrder: order
                              }
                            });
                            this.props.dispatch(
                              routerRedux.push({ pathname: "/trip" })
                            );
                          }}
                        >
                          <OrderCard
                            startTitle={order.startTitle}
                            startInfo={order.startInfo}
                            endTitle={order.endTitle}
                            endInfo={order.endInfo}
                            time={order.duration}
                            price={order.price}
                          />
                        </div>
                      ));
                    })()}
                  </div>
                );
              }
            })()}
            {/* closed */}
            {(() => {
              if (this.props.driverStatus.closed) {
                return <div className={styles.driver__status__closed} />;
              }
            })()}
            {/* fill empty */}
            {(() => {
              if (this.props.driverStatus.fillEmpty) {
                return (
                  <div className={styles.driver__status__fill__empty}>
                    <div
                      className={styles.driver__status__button}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <div className={styles.driver__status__button__text}>
                        填写资料
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
            {/* fill ip */}
            {(() => {
              if (this.props.driverStatus.fillIp) {
                return (
                  <div className={styles.driver__status__fill__ip}>
                    <div
                      className={styles.driver__status__button}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <div className={styles.driver__status__button__text}>
                        填写资料
                      </div>
                    </div>
                  </div>
                );
              }
            })()}

            {/* evaluation ip */}
            {(() => {
              if (this.props.driverStatus.evaluationIp) {
                return (
                  <div className={styles.driver__status__evaluation__ip}>
                    <div
                      className={styles.driver__status__button}
                      style={{ backgroundColor: "#bbbbbb" }}
                    >
                      <div className={styles.driver__status__button__text}>
                        资料验证中
                      </div>
                    </div>
                  </div>
                );
              }
            })()}

            {/* evaluation failed */}
            {(() => {
              if (this.props.driverStatus.evaluationFailed) {
                return (
                  <div className={styles.driver__status__evaluation__failed}>
                    <div
                      className={styles.driver__status__button}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <div className={styles.driver__status__button__text}>
                        修改资料
                      </div>
                    </div>
                  </div>
                );
              }
            })()}

            {/* verify ip */}
            {(() => {
              if (this.props.driverStatus.verifyIp) {
                return (
                  <div className={styles.driver__status__verify__ip}>
                    <div
                      className={styles.driver__status__button}
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <div className={styles.driver__status__button__text}>
                        点击以开始验证
                      </div>
                    </div>
                  </div>
                );
              }
            })()}

            {/* verify failed */}
            {(() => {
              if (this.props.driverStatus.verifyFailed) {
                return (
                  <div className={styles.driver__status__verify__failed}>
                    <div
                      className={styles.driver__status__button}
                      style={{ backgroundColor: "#bbbbbb" }}
                    >
                      <div className={styles.driver__status__button__text}>
                        禁止验证类用户
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
