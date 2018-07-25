import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import InputItem from '../components/Forms/InputItem'
import {routerRedux} from 'dva/router'
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tel:'',
        verificationEntered:''
    }
  }
  componentDidMount(){
    // console.log(this.props)
  }
    render(){
      return (
        <div className={styles.base__container}>
            <div className={styles.login__icon}></div>
            <div className={styles.login__text}>
                <span className={styles.login__character}>登录</span>
                &nbsp;&nbsp; 
                <span className={styles.login__letter}>LOGIN</span>
            </div>
            <div className={styles.tel__container}>
                <InputItem
                caption='手机号'
                placeholder=''
                value={this.state.tel}
                onChange={(v)=>{this.setState({tel:v})}}/>
            </div>
            <div className={styles.verification__container}>
                <InputItem
                caption='验证码'
                placeholder=''
                value={this.state.verificationEntered}
                onChange={(v)=>{this.setState({verificationEntered:v})}}/>
            </div>

            <div className={styles.verification__button}>
            发送验证码
            </div>

            <div className={styles.submit__botton}>
            提交
            </div>
            <div className={styles.registration__text} onClick={()=>{
              this.props.dispatch(routerRedux.push({pathname:'/'}))
              }}>
            注册账号
            </div>
            <div className={styles.logo__container}>
            </div>
       </div>
        
      )
    }
}

LoginPage.propTypes = {
};


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(LoginPage);