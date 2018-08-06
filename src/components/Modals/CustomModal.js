import React from 'react';
import { connect } from 'dva';
import styles from './CustomModal.css'

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        leftColor:'#333333',
        rightColor:'#333333',
        title: this.props.title,
        info:this.props.info
    }
    if(this.props.leftColor){
        this.state.leftColor = this.props.leftColor
    }
    if(this.props.rightColor){
        this.state.rightColor = this.props.rightColor
    }
  }
  
  render(){
    return (
        <div>
            {/* <div className={}></div> */}
            <div className={styles.background__mask}></div>
            <div className={styles.modal__container}>
            <div className={styles.modal__title}>
            {this.props.title}
            </div>
            <div className={styles.modal__info} dangerouslySetInnerHTML={{__html: this.props.info}}>
            </div>
            <div className={styles.left__button__container}>
                <div className={styles.left__button__content} onClick={()=>{
                    this.props.onLeftClick.bind(this)()
                }}>
                    <div className={styles.left__button__text} style={{color:this.state.leftColor}}>
                    {this.props.leftText}
                    </div>
                </div>
            </div>
            <div className={styles.right__button__container}>
                <div className={styles.right__button__content} onClick={()=>{
                    this.props.onRightClick.bind(this)()
                }}>
                    <div className={styles.right__button__text} style={{color:this.state.rightColor}}>
                    {this.props.rightText}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
  }

};

CustomModal.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(CustomModal);
