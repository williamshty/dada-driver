import React from 'react';
import { connect } from 'dva';
import styles from './OrderCard.css'
class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTitle:this.props.startTitle,
      startInfo:this.props.startInfo,
      endTitle:this.props.endTitle,
      endInfo:this.props.endInfo,
      time:this.props.time,
      price:this.props.price
    }
  }
  
  render(){
    return (
        // <div className={}></div>
        <div>
          <div style={{height:10}}/>
          <div className={styles.history__card} onClick={()=>{
            if(this.props.onClick){
              this.props.onClick.bind(this)
            }
          }}>
            <div className={styles.start__caption}>
            起点
            </div>
            <div className={styles.start__title}>
            {(() => {
            if(this.state.startTitle.length>12){
              return <span>{this.state.startTitle.substr(0,12)}...</span>
            } else return <span>{this.state.startTitle}</span>
            })()}
            </div>
            <div className={styles.start__info}>
            {(() => {
            if(this.state.startInfo.length>13){
              return <span>{this.state.startInfo.substr(0,13)}...</span>
            } else return <span>{this.state.startInfo}</span>
            })()}
            </div>
            <div className={styles.end__caption}>
            终点
            </div>
            <div className={styles.end__title}>
            {(() => {
            if(this.state.endTitle.length>12){
              return <span>{this.state.endTitle.substr(0,12)}...</span>
            } else return <span>{this.state.endTitle}</span>
            })()}
            </div>
            <div className={styles.end__info}>
            {(() => {
            if(this.state.endInfo.length>13){
              return <span>{this.state.endInfo.substr(0,13)}...</span>
            } else return <span>{this.state.endInfo}</span>
            })()}
            
            </div>
            <div className={styles.time__stamp}>
            {this.state.time}
            </div>
            <div className={styles.trip__price}>
            {this.state.price} NAS
            </div>
            <div className={styles.time__icon}/>
            <div className={styles.divider__vertical}/>
        </div>
      </div>
    );
  }

};

OrderCard.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(OrderCard);
