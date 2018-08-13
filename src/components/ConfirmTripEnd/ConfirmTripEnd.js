import React from "react";
import Lottie from "react-lottie";
import { connect } from "dva";
import styles from "./ConfirmTripEnd.css";
import { routerRedux } from "dva/router";
import * as coinAnimData from "../../assets/anim/coin.json";
class ConfirmTripEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate() {
    if (this.state.activatedStars > 0 && !this.state.starViewed) {
      setTimeout(() => this.setState({ starViewed: true }), 10);
    }
    if (this.state.starViewed && !this.state.starRated) {
      setTimeout(() => this.setState({ starRated: true }), 1000);
    }
  }
  componentWillUnmount() {}

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: coinAnimData,
      rendererSettings: {
        scaleMode: "noScale",
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
      }
    };
    return (
      <div>
        <div className={styles.bottom__background__mask}>
          {(() => {
            if (this.props.navigator.clientConfirmed) {
              return (
                <Lottie options={defaultOptions} height={667} width={375} />
              );
            }
          })()}
        </div>

        <div className={styles.bottom__container}>
          <div className={styles.bottom__confirm__card}>
            <div className={styles.bottom__card__title}>行程完成</div>
            <div className={styles.bottom__card__info}>
              待乘客确认行程后方可结束本行程
            </div>
            <img
              className={styles.divider__title}
              src={require("../../assets/矩形 609.png")}
            />
            <div className={styles.bottom__distance__title}>路程</div>
            <div className={styles.bottom__distance}>
              {this.props.driverStatus.tripFinished.distance} Km
            </div>
            <div className={styles.bottom__pax__title}>拼车人数</div>
            <div className={styles.bottom__pax}>
              {this.props.driverStatus.tripFinished.pax} 人
            </div>
            <div className={styles.bottom__time__title}>时间</div>
            <div className={styles.bottom__time}>
              {this.props.driverStatus.tripFinished.duration} Min
            </div>
            <div className={styles.end__icon} />
          </div>
        </div>
        {/* <div className={styles.bottom__submit__button} onClick={()=>{
              this.props.dispatch({
                type:'navigator/save',
                payload:{
                    confirmTripEndTriggered:false,
                    tripFinishedTriggered:true
                }
              })
            }}>
            确认行程完成
            </div> */}
        <div className={styles.button__disabled}>等待确认完成</div>
        {(() => {
          if (this.props.navigator.clientConfirmed) {
            return (
              <div>
                <div className={styles.finished__pop__up__container}>
                  <div className={styles.pop__info}>
                    乘客已确认本次行程完成，金额已结算
                  </div>
                  <div className={styles.pop__price}>
                    +{this.props.driverStatus.tripFinished.price} NAS
                  </div>
                  <div className={styles.pop__icon} />
                </div>
                {(() => {
                  if (!this.props.driverStatus.inShareOrder) {
                    return (
                      <div
                        className={styles.button__confirm}
                        onClick={() => {
                          this.props.dispatch({
                            type: "navigator/save",
                            payload: {
                              confirmTripEndTriggered: false,
                              orderGenerationTriggered: true,
                              clientConfirmed: false
                            }
                          });
                          this.props.dispatch(
                            routerRedux.push({ pathname: "/" })
                          );
                        }}
                      >
                        返回接单页
                      </div>
                    );
                  } else {
                    return(
                      <div
                        className={styles.button__confirm}
                        onClick={() => {
                          this.props.dispatch({
                            type: "navigator/save",
                            payload: {
                              confirmTripEndTriggered: false,
                              clientConfirmed: false,
                              inTripTriggered: true
                            }
                          });
                          this.props.dispatch({
                            type: "driverStatus/save",
                            payload: {
                              inShareOrder: false,
                              currentOrder: this.props.driverStatus.secondOrder
                            }
                          });
                        }}
                      >
                        继续下位乘客
                      </div>
                    )
                  }
                })()}
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

ConfirmTripEnd.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ConfirmTripEnd);
