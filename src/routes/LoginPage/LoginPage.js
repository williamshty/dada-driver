import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import InputItem from '../../components/Forms/InputItem'
import {routerRedux} from 'dva/router';
import {getLoginVerificationCode} from '../../utils/webServices'
import SearchItem from '../../components/Forms/SearchItem'
import SearchListItem from '../../components/SearchListItem/SearchListItem'
import CustomModal from '../../components/Modals/CustomModal'
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tel:'',
        enteredVerification:'',
        receivedVerification:'',
        phoneError:'',
        verificationSent:false,
        verificationError:'',
        countDownTime:60,
        phoneNotRegistered:false
    }
  }
  componentDidUpdate(){
    if(this.state.verificationSent&&this.state.phoneError==='true'){
      this.setState({phoneError:''})
    }
    if(this.state.countDownTime<=0){
      this.triggerClearInterval()
      this.setState({
        verificationSent:false,
        countDownTime:60
      })
    }
  }
  async loadLoginVerificationCode(){
      if(this.state.tel.toString().length!==11) {
          this.setState({phoneError:'true'})
          return
        }
    const verification_code = await getLoginVerificationCode(this.state.tel)
    console.log(verification_code)
    if(verification_code.data.code!==1001&&verification_code.data.code!==1002){
      this.setState({phoneError:'true'})
          return
    } else if(verification_code.data.code===1002){
      this.setState({
        phoneError:'true',
        phoneNotRegistered:true
      })
          return
    }
    else{
      this.setState({
        verificationSent:true,
        phoneNotRegistered:false,
        receivedVerification:verification_code.data.data.code
      })
      this.triggerCountDownTimer()
    }
  }
  countDown(){
    this.setState({countDownTime:this.state.countDownTime-1})
  }
  triggerCountDownTimer(){
    this.interval = setInterval(()=>{this.countDown()},1000)
  }
  triggerClearInterval(){
    clearInterval(this.interval)
  }
  submitLoginForm(){
    
    if(this.state.enteredVerification!==this.state.receivedVerification||this.state.enteredVerification===''){
      this.setState({verificationError:'true'})
      return
    } else{
      this.props.dispatch({
        type:'navigator/save',
        payload:{
          isLoggedIn:true
        }
      })
      localStorage.setItem('isLoggedIn',true)
      this.props.dispatch(routerRedux.push({pathname:'/'}))
    }
  }
  componentDidMount(){
    // console.log(this.props)
  }
    // render(){
    //   return (
    //     <div className={styles.base__container}>
    //     <div className={styles.status__bar__filler}></div>
    //         <div className={styles.back__button}></div>
    //         <div className={styles.login__icon}></div>
    //         <div className={styles.login__text}>
    //           验证登录
    //         </div>
    //         <div className={styles.login__hint__text}>
    //         为确保该手机为本人登陆，请输入验证码
    //         </div>
    //         {/* <div className={styles.tel__container}>
    //             <InputItem
    //             error={this.state.phoneError}
    //             caption='手机号'
    //             placeholder=''
    //             value={this.state.tel}
    //             onChange={(v)=>{this.setState({tel:v})}}/>
    //         </div> */}
    //         <div className={styles.verification__container}>
    //             <InputItem
    //             error={this.state.verificationError}
    //             caption='验证码'
    //             placeholder=''
    //             value={this.state.verificationEntered}
    //             onChange={(v)=>{this.setState({enteredVerification:v})}}/>
    //         </div>

    //         {(()=>{
    //           if(!this.state.verificationSent){return(
    //             <div className={styles.verification__button} 
    //             onClick={this.loadLoginVerificationCode.bind(this)}>
    //               发送验证码
    //             </div>
    //           )}
    //           else return(
    //             <div className={styles.verification__sent}>
    //               {this.state.countDownTime}s
    //             </div>
    //           )
    //         })()}
    //         {(()=>{
    //         if(this.state.verificationError==='true'){return (
    //             <div>
    //             <div className={styles.error__icon}>
    //             </div>
    //             <div className={styles.error__text}>
    //               验证码输入错误
    //             </div>`
    //             </div>
    //           )}
    //         })()}

    //         <div className={styles.submit__botton} onClick={()=>this.submitLoginForm()}>
    //        登录
    //         </div>
    //         <div className={styles.logo__container}>
    //         </div>
    //    </div>
        
    //   )
    // }
    render(){
      return(
        // <SearchItem
        // placeholder='牛市口'
        // iconColor='#1ad371'
        // onKeyPress={(e)=>{console.log(e.key)}}/>
       <div>
        <CustomModal
        title='提示'
        info={`已有司机接单，取消订单将扣除20%费用\r\n是否确认取消`}
        leftText='返回'
        rightColor='#ff5151'
        rightText='取消行程'
        onLeftClick={()=>{console.log('left clicked')}}
        onRightClick={()=>{console.log('right clicked')}}
        />
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