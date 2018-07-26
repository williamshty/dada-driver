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
                <div className={styles.bottom__waiting__icon}>
                </div>
                <div className={styles.bottom__waiting__tittle}>
                等待司机接单
                </div>
                <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
                {/* <div className={styles.bottom__waiting__time}>
                您已等待
                &nbsp;{Math.floor(this.state.waitingTime/60)}&nbsp;
                分
                &nbsp;{this.state.waitingTime-60*Math.floor(this.state.waitingTime/60)}&nbsp;
                秒
                </div>
                <div className={styles.bottom__waiting__cancel}>
                取消订单
                </div>      */}
                <img className={styles.loading__anim} src={require('./Rolling.svg')} alt="rolling"/>
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
  return this.state
}

export default connect(mapStateToProps)(FindingDriver);
