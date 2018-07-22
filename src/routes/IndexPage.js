import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MapComponent from '../components/MapComponent';
import SideMenu from '../components/SideMenu/SideMenu';
import OrderGeneration from '../components/OrderGeneration/OrderGeneration'
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // console.log(this.props)
  }
    render(){
      return (
        <div className={styles.normal}>
          {(()=>{
            if(!this.props.navigator.orderGenerationTriggered)
            return <SideMenu/>
            else return <OrderGeneration/>
          })()}
          <div className={styles.map__container}>
            <MapComponent/>
          </div>
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