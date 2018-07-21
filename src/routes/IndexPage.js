import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import 'pile-ui/dist/styles/pile.min.css';
import MapComponent from '../components/MapComponent';
import SideMenu from '../components/SideMenu/SideMenu'
function IndexPage() {
    return (
      <div className={styles.normal}>
        <div className={styles.page__head}>
          <SideMenu/>
      </div>
        <div className={styles.map__container}>
          <MapComponent/>
        </div>
     </div>
      
    )
}

IndexPage.propTypes = {
};



export default connect()(IndexPage);
