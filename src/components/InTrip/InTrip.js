import React from "react";
import { connect } from "dva";
import styles from "./InTrip.css";
import SearchItem from "../Forms/SearchItem";
class InTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div className={styles.bottom__container}>
          <div className={styles.bottom__trip__card}>
            <div className={styles.bottom__trip__title}>行程中</div>
            <div className={styles.bottom__trip__info}>
              已接到乘客，前往目的地时请注意安全
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
            <div
              className={styles.end__button}
              onClick={() =>
                this.props.dispatch({
                  type: "navigator/save",
                  payload: {
                    confirmTripEndTriggered: true,
                    inTripTriggered: false
                  }
                })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

InTrip.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(InTrip);
