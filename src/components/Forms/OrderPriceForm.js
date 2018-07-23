import React from 'react';
import ReactDOM from 'react-dom';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './OrderPriceForm.css'
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class OrderPriceForm extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    type: 'money',
  }
  updateFocusStatus(){
    this.props.dispatch({
      type:'navigator/save',
      payload:{
        priceFocusTriggered:1
      }
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div className={styles.price__input}>
          <InputItem
            {...getFieldProps('money2', {
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                  if (v === '.') {
                    return '0.';
                  }
                  return prev;
                }
                return v;
              },
            })}
            value={this.props.trip.price?this.props.trip.price:0}
            type={type}
            placeholder=""
            ref={el => this.inputRef = el}
            onBlur={()=>{
              this.props.dispatch({
                type:'navigator/save',
                payload:{
                  priceFocusTriggered:2
                }
              })
            }}
            onVirtualKeyboardConfirm={v => {
                this.props.dispatch({
                  type:'trip/save',
                  payload:{
                      price:v
                  }
                })
                this.props.dispatch({
                  type:'navigator/save',
                  payload:{
                    priceFocusTriggered:2
                  }
                })
            }}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            onFocus={()=>this.updateFocusStatus()}
          ></InputItem>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state
}
export const OrderPriceFormWrapper = createForm()(OrderPriceForm);
export default connect(mapStateToProps)(OrderPriceFormWrapper);