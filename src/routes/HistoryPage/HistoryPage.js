import React from 'react';
import { connect } from 'dva';
import styles from './HistoryPage.css';

function HistoryPage() {
  return (
    <div className={styles.base__container}>
      {/* <div className={}></div> */}
      <div className={styles.top__container}>
        <div className={styles.back__arrow} onClick={() => {}}>
                <img width={8} src={require('../../assets/backArrow.png')}></img>
        </div>
        <div className={styles.top__title}>
        历史订单
        </div>
      </div>
    </div>
  );
}

HistoryPage.propTypes = {
};
function mapStateToProps(state) {
    return state
  }

export default connect(mapStateToProps)(HistoryPage);
