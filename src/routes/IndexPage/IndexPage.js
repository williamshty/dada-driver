import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import { routerRedux } from "dva/router";
import DriverCard from "../../components/DriverCard/DriverCard";
import SideMenu from "../../components/SideMenu/SideMenu";
import OrderCard from "../../components/OrderCard/OrderCard";
import {socketConnect} from '../../utils/socket';
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socketTest :'hi',
      opened: false,
      closed: false,
      fillEmpty: false,
      fillIp: false,
      evaluationIp: false,
      evaluationFailed: false,
      verifyIp: false,
      verifyFailed: false,
      mockOrderData: [
        {
          startTitle: "锦江瑞康医院",
          startInfo: "成都市成华区牛市口",
          startLat: "104.124269",
          startLng: "30.606301",
          endTitle: "天府软件园A区",
          endInfo: "四川省成都市武侯区天府三街",
          endLat: "104.077183",
          endLng: "30.555715",
          time: "1h 12min",
          price: "13.70",
          distance: "12",
          pax: "2"
        },
        {
          startTitle: "锦江瑞康医院",
          startInfo: "成都市成华区牛市口",
          startLat: "104.124269",
          startLng: "30.606301",
          endTitle: "天府软件园A区",
          endInfo: "四川省成都市武侯区天府三街",
          endLat: "104.077183",
          endLng: "30.555715",
          time: "2h 12min",
          price: "1.37",
          distance: "14",
          pax: "1"
        },
        {
          startTitle: "锦江瑞康医院",
          startInfo: "成都市成华区牛市口",
          startLat: "104.124269",
          startLng: "30.606301",
          endTitle: "天府软件园A区",
          endInfo: "四川省成都市武侯区天府三街",
          endLat: "104.077183",
          endLng: "30.555715",
          time: "1h 24min",
          price: "23",
          distance: "1",
          pax: "1"
        }
      ]
    };
  }
  componentDidMount() {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    // socketConnect((err,socketTest)=>{console.log(socketTest)})
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
                      return this.state.mockOrderData.map(order => (
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
                            time={order.time}
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
  // render(){
  //   return(
  //     <OrderCard
  //     startTitle='锦江瑞康医院'
  //     startInfo='成都市成华区牛市口'
  //     endTitle='天府软件园A区'
  //     endInfo='四川省成都市武侯区天府三街'
  //     time='1h 12min'
  //     price='13.70'
  //     />
  //   )
  // }
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
