import React from 'react';
import { connect } from 'dva';
import styles from './DriverFound.css'
class DriverFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render(){
    return (
      <div className={styles.bottom__container}>
      <div className={styles.bottom__car__card}>
        <div className={styles.bottom__card__title__icon}>
        </div>
        <div className={styles.bottom__card__title}>
        司机已接单
        </div>
        <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
        <div className={styles.bottom__card__corner__icon}>
        </div>
        <div className={styles.bottom__brand__title}>
        车辆品牌
        </div>
        <div className={styles.bottom__brand}>
        </div>
        <div className={styles.bottom__color__title}>
        车辆颜色
        </div>
        <div className={styles.bottom__color}>
        紫色
        </div>
        <div className={styles.bottom__license__title}>
        车牌号
        </div>
        <div className={styles.bottom__license}>
        川A · 5CW77
        </div>
        <div className={styles.bottom__car__cancel}>
        取消订单
        </div>
      </div>
      </div>
    );
  }

};

DriverFound.propTypes = {
  
};

function mapStateToProps(state) {
  return this.state
}

export default connect(mapStateToProps)(DriverFound);
