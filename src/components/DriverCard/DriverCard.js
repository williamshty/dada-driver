import React from 'react';
import { connect } from 'dva';
import styles from './DriverCard.css'
class DriverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance:this.props.balance,
      trip:this.props.trip,
      time:this.props.time,
      rating:this.props.rating
    }
  }
  
  render(){
    return (
        // <div className={}></div>
        <div>
          <div className={styles.driver__card}>
            <div className={styles.card__title}>
            今日营业额
            </div>
            <div className={styles.card__balance}>
            {this.props.balance}&nbsp;
            <span className={styles.card__balance__unit}>
            NAS</span>
            </div>
            <div className={styles.trip__title}>
            接单次数
            </div>
            <div className={styles.trip__number}>
            {this.props.trip} 次
            </div>
            <div className={styles.time__title}>
            运营时间
            </div>
            <div className={styles.time__number}>
            {this.props.time}
            </div>
            <div className={styles.rating__title}>
            用户评价
            </div>
            <div className={styles.rating__number}>
            {this.props.rating} 分
            </div>
            <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
          </div>
        </div>
    );
  }

};

DriverCard.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(DriverCard);
