import React from 'react';
import { connect } from 'dva';
import styles from './ConfirmTripEnd.css'
class ConfirmTripEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
  }
  componentDidUpdate(){
      if(this.state.activatedStars>0&&!this.state.starViewed){
          setTimeout(()=>this.setState({starViewed:true}),10)
      }
      if(this.state.starViewed&&!this.state.starRated){
        setTimeout(()=>this.setState({starRated:true}),1000)
    }
  }
  componentWillUnmount(){
  }
  
  render(){
    return (
      <div>
          <div className={styles.bottom__background__mask}></div>
          <div className={styles.bottom__container}>
            <div className={styles.bottom__confirm__card}>
                <div className={styles.bottom__card__title}>
                请确认行程是否完成
                </div>
                <div className={styles.bottom__card__info}>
                与 3 人一同拼车，共 36 公里，耗时 2 小时 1 分钟
                </div>
                <div className={styles.bottom__card__contact}>
                未完成,联系客服
                </div>
            </div>
            <div className={styles.bottom__submit__button} onClick={()=>{
              this.props.dispatch({
                type:'navigator/save',
                payload:{
                    confirmTripEndTriggered:false,
                    tripFinishedTriggered:true
                }
              })
            }}>
            确认行程完成
            </div>
          </div>
       </div> 
    );
  }

};

ConfirmTripEnd.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(ConfirmTripEnd);
