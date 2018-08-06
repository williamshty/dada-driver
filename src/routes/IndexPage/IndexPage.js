import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {routerRedux} from 'dva/router';
import DriverCard from '../../components/DriverCard/DriverCard'
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
    render(){
      return (
        <div>
        <DriverCard
        balance='1.67'
        trip='8'
        time='1 h 36 min'
        rating='4.6'
        />
       </div>
        
      )
    }
}

IndexPage.propTypes = {
};


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(IndexPage);