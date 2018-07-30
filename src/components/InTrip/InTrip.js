import React from 'react';
import { connect } from 'dva';
import styles from './InTrip.css'
class InTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    setTimeout(()=>{this.props.dispatch({
      type:'navigator/save',
      payload:{
          confirmTripEndTriggered:true,
          inTripTriggered:false
      }
    })}, 4000)
  }
  componentWillUnmount(){
  }
  
  render(){
    return (
      <div>
          <div className={styles.bottom__container}>
            <div className={styles.bottom__trip__card}>
                <div className={styles.bottom__trip__title}>
                行程中
                </div>
                <div className={styles.bottom__distance__title}>
                目的地距离
                </div>
                <div className={styles.bottom__distance}>
                3.67km
                </div>
                <div className={styles.bottom__time__title}>
                预计需要时间
                </div>
                <div className={styles.bottom__time}>
                1h12m
                </div>
            </div>
          </div>
       </div> 
    );
  }

};

InTrip.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(InTrip);
