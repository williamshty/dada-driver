import React from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd-mobile';
import styles from './SideMenu.css'
import loadPosition from '../../utils/locater'
const sidebar = (<div className={styles.sidebar}>
  <img alt="background" src={require('../../assets/side-bg.png')} width={275}></img>
</div>)

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen:this.props.sideMenuOpen,
      buttonStyle:styles.button,
      trafficActivated:false
    }
  }
  
  render(){
    return (
      <div>
          <div className={this.state.buttonStyle}>
          <img alt="avatar" width={38} onClick={()=>this.onOpenChange()} src={require('../../assets/avatar.png')}></img>
          </div>
          <div className={styles.button__bottom}>
            <div className={styles.button__bottom__filler}></div>
          </div>
          {(()=>{
            if(!this.state.trafficActivated){
              return (
                <div className={styles.button__traffic__deactive} onClick={()=>this.onToggleTraffic()}>
                  <div className={styles.button__side__filler}></div>
                </div>
              ) 
            }
            else {
              return (
                <div className={styles.button__traffic__active} onClick={()=>this.onToggleTraffic()}>
                  <div className={styles.button__side__filler}></div>
                </div>
              ) 
            }
          })()}
          <div className={styles.button__focus} onClick={()=>loadPosition(this.props.dispatch)}>
            <div className={styles.button__side__filler}></div>
          </div>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          sidebar={sidebar}
          open={this.state.sideMenuOpen}
          onOpenChange={()=>this.onOpenChange()}
        >
        </Drawer>
      </div>
    );
  }

  onOpenChange () {
    if (this.state.buttonStyle!==styles.button__animated){
      this.setState({
        sideMenuOpen:!this.state.sideMenuOpen,
        buttonStyle:styles.button__animated
      });
    }
    else {
      this.setState({
        sideMenuOpen:!this.state.sideMenuOpen,
        buttonStyle:styles.button__animated_reverse
      });
    }
    
    
    // this.moveAlone.play()
  }
  onToggleTraffic(){
    this.setState({trafficActivated:!this.state.trafficActivated})
    this.props.dispatch({
      type:'mapData/toggleTraffic',
      payload:{
        trafficActivated:!this.state.trafficActivated
      }
    })
  }
};

SideMenu.propTypes = {
  
};

function mapStateToProps(state) {
  return state.navigator
}

export default connect(mapStateToProps)(SideMenu);
