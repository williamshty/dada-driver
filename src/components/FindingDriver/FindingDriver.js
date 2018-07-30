import React from 'react';
import { connect } from 'dva';
import styles from './FindingDriver.css'
import ReactSVG from 'react-svg'
class FindingDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        waitingTime:0
    }
  }
  componentDidMount(){
    this.interval = setInterval(()=>{this.countTime()},1000)
  }
  componentDidUpdate(){
    if(this.state.waitingTime>15&&this.props.navigator.findingDriverTriggered){
        this.props.dispatch({
            type:'navigator/save',
            payload:{
                driverFoundTriggered:true,
                findingDriverTriggered:false
            }
        })
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  countTime(){
      this.setState({waitingTime:this.state.waitingTime+1})
      console.log('logged')
  }
  
  render(){
    return (
      <div>
        {/* <div className={styles.bottom__container__mask}>
        </div> */}
          <div className={styles.bottom__container}>
            <div className={styles.bottom__waiting__card}>
                <div className={styles.bottom__waiting__tittle}>
                等待司机接单
                </div>
                <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
                <div className={styles.bottom__waiting__time}>
                已等待
                &nbsp;{this.state.waitingTime}&nbsp;
                秒
                </div>
                <div className={styles.bottom__waiting__cancel}>
                取消订单
                </div>
            </div>
           
            {/* <div className={styles.bottom__submit__button}>
            确认行程完成</div> */}
          </div>
       </div> 
    );
  }

};

FindingDriver.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(FindingDriver);
