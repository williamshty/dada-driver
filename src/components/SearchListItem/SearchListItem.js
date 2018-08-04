import React from 'react';
import { connect } from 'dva';
import styles from './SearchListItem.css'

class SearchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        titleText :this.props.title,
        detailText :this.props.detail,
        type :this.props.type,

    }
  }
  
  render(){
    if(this.state.type==='home'){
        return (
            <div className={styles.list__item} onClick={()=>{
                if(this.props.onClick){
                    this.props.onClick.bind(this)()
                }
            }}>
             <div className={styles.list__title}>{this.state.titleText}</div>
             <div className={styles.list__detail__container}>
                <div className={styles.list__detail}>
                {this.state.detailText}
                </div>
             </div>
             <div className={styles.list__icon__home}></div>
             <img className={styles.list__divider} src={require('../../assets/矩形 609.png')}/>
            </div>
        );
    } else if(this.state.type==='locate'){
        return (
            <div className={styles.list__item__small} onClick={()=>{
                if(this.props.onClick){
                    this.props.onClick.bind(this)()
                }
            }}>
             <div className={styles.list__title}>{this.state.titleText}</div>
             <div className={styles.list__detail__container}>
                <div className={styles.list__detail}>
                {this.state.detailText}
                </div>
             </div>
             <div className={styles.list__icon__locate}></div>
             <img className={styles.list__divider__small} src={require('../../assets/矩形 609.png')}/>
            </div>
        )
    } else if(this.state.type==='current'){
        return (
            <div className={styles.list__item__small} onClick={()=>{
                if(this.props.onClick){
                    this.props.onClick.bind(this)()
                }
            }}>
             <div className={styles.list__title}>{this.state.titleText}</div>
             <div className={styles.list__detail__container}>
                <div className={styles.list__detail}>
                {this.state.detailText}
                </div>
             </div>
             <div className={styles.list__icon__current}></div>
             <img className={styles.list__divider__small} src={require('../../assets/矩形 609.png')}/>
            </div>
        )
    }
  }

};

SearchListItem.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(SearchListItem);
