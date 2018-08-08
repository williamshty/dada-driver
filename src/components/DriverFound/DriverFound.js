import React from "react";
import { connect } from "dva";
import styles from "./DriverFound.css";
import CustomModal from "../Modals/CustomModal";
import SearchItem from "../Forms/SearchItem";
class DriverFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelConfirmationActivated: false,
      cancelConfirmed: false
    };
  }
  // componentDidMount(){
  //   setTimeout(()=>{this.props.dispatch({
  //     type:'navigator/save',
  //     payload:{
  //         driverFoundTriggered:false,
  //         inTripTriggered:true
  //     }
  //   })}, 4000)
  // }

  render() {
    return (
      <div>
        {/* modal to ask whether must cancel */}
        {(() => {
          if (this.state.cancelConfirmationActivated) {
            return (
              <CustomModal
                title="提示"
                info={"已有司机接单，取消订单将扣除20%费用<br/>是否确认取消"}
                leftText="返回"
                rightColor="#ff5151"
                rightText="取消行程"
                onLeftClick={() => {
                  this.setState({ cancelConfirmationActivated: false });
                }}
                onRightClick={() => {
                  this.setState({
                    cancelConfirmationActivated: false,
                    cancelConfirmed: true
                  });
                }}
              />
            );
          }
        })()}
        {/* confirmed cancel */}
        {(() => {
          if (this.state.cancelConfirmed) {
            return (
              <div className={styles.cancel__mask}>
                <div className={styles.cancel__confirmed__info} />
              </div>
            );
          }
        })()}
        <div className={styles.bottom__container}>
          <div className={styles.bottom__car__card}>
            <div
              className={styles.cancel__button}
              onClick={() => {
                this.setState({ cancelConfirmationActivated: true });
              }}
            />
            <div className={styles.bottom__card__title}>已接单</div>
            <div className={styles.bottom__card__info}>
              已为您标注乘客位置，请前往
            </div>
            <img
              className={styles.divider__title}
              src={require("../../assets/矩形 609.png")}
            />
            <div className={styles.start__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#1ad371"
                value={this.props.driverStatus.currentOrder.startTitle}
                onChange={this.onStartChange}
              />
            </div>
            <div className={styles.end__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#ff0000"
                value={this.props.driverStatus.currentOrder.endTitle}
                onChange={this.onEndChange}
              />
            </div>
            <div
              className={styles.redirection__button}
              onClick={() =>
                window.open(
                  `http://api.map.baidu.com/direction?origin=${
                    this.props.driverStatus.currentOrder.startTitle
                  }&destination=${
                    this.props.driverStatus.currentOrder.endTitle
                  }&mode=driving&region=成都&output=html&src=webapp.dada.testdemo`,
                  "_blank"
                )
              }
            />
            <div className={styles.status__icon} />
          </div>
        </div>
      </div>
    );
  }
}

DriverFound.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DriverFound);
