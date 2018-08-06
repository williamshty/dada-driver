import React from 'react';
import { connect } from 'dva';
import styles from './HistoryCard.css'
class HistoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTitle:this.props.startTitle,
      startInfo:this.props.startInfo,
      endTitle:this.props.endTitle,
      endInfo:this.props.endInfo,
      timeStamp:this.props.timeStamp,
      price:this.props.price
    }
  }
  
  render(){
    return (
        // <div className={}></div>
        <div>
          <div style={{height:10}}/>
          <div className={styles.history__card}>
            <div className={styles.start__caption}>
            起始点
            </div>
            <div className={styles.start__title}>
            {this.state.startTitle}
            </div>
            <div className={styles.start__info}>
            {this.state.startInfo}
            </div>
            <div className={styles.end__caption}>
            目的地
            </div>
            <div className={styles.end__title}>
            {this.state.endTitle}
            </div>
            <div className={styles.end__info}>
            {this.state.endInfo}
            </div>
            <div className={styles.time__stamp}>
            {this.state.timeStamp}
            </div>
            <div className={styles.trip__price}>
            消费 {this.state.price} NAS
            </div>
            <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
        </div>
      </div>
    );
  }

};

HistoryCard.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(HistoryCard);
