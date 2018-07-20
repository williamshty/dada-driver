import React from 'react';
import { connect } from 'dva';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
import Anime from 'pile-ui/dist/components/anime';
import styles from './SideMenu.css'

const {CssTransform} = Anime

const sidebar = (<div className={styles.sidebar}>
  <img src={require('../assets/side-bg.png')} width={275}></img>
</div>)

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen:this.props.sideMenuOpen,
      buttonStyle:styles.button
    }
  }
  
  render(){
    return (
      <div>
          <div className={this.state.buttonStyle}>
          {/* <Button onClick={()=>this.onOpenChange()}>Clickme</Button> */}
          <img width={38} onClick={()=>this.onOpenChange()} src={require('../assets/avatar.png')}></img>
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
};

SideMenu.propTypes = {
  
};

function mapStateToProps(state) {
  return state.navigator
}

export default connect(mapStateToProps)(SideMenu);
