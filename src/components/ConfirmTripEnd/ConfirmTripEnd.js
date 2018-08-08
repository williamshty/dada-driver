import React from "react";
import { connect } from "dva";
import styles from "./ConfirmTripEnd.css";
import { routerRedux } from "dva/router";
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
    return (
      <div>
        {/* <div className={styles.bottom__background__mask}></div> */}
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
            <div className={styles.bottom__distance}>42 Km</div>
            <div className={styles.bottom__pax__title}>拼车人数</div>
            <div className={styles.bottom__pax}>2 人</div>
            <div className={styles.bottom__time__title}>时间</div>
            <div className={styles.bottom__time}>48 Min</div>
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
                  <div className={styles.pop__price}>+16.67 NAS</div>
                  <div className={styles.pop__icon} />
                </div>
                <div
                  className={styles.button__confirm}
                  onClick={() => {
                    this.props.dispatch({
                      type: "navigator/save",
                      payload: {
                        confirmTripEndTriggered: false
                      }
                    });
                    this.props.dispatch(routerRedux.push({ pathname: "/" }));
                  }}
                >
                  返回接单页
                </div>
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
