import React from "react";
import { connect } from "dva";
import styles from "./RideShare.css";
import SearchItem from "../Forms/SearchItem";
class RideShare extends React.Component {
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
            <div className={styles.bottom__card__corner__icon} />
            <div className={styles.bottom__trip__title}>发现拼单乘客</div>
            <div className={styles.bottom__trip__info}>
              请您确认是否接下本次拼单
            </div>
            <img
              className={styles.divider__title}
              src={require("../../assets/矩形 609.png")}
            />
            <div className={styles.start__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#1ad371"
                value={this.props.driverStatus.shareOrder.startTitle}
                onChange={this.onStartChange}
              />
            </div>
            <div className={styles.end__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#ff0000"
                value={this.props.driverStatus.shareOrder.endTitle}
                onChange={this.onEndChange}
              />
            </div>
            <div className={styles.reject__button}>拒绝</div>
            <div className={styles.accept__button}>拼单</div>
          </div>
        </div>
      </div>
    );
  }
}

RideShare.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RideShare);
