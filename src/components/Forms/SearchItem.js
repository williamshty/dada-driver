import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SearchItem.css';

class SearchItem extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    funcOnChange:this.props.onChange,
    funcOnBlur:this.isFunction(this.props.onBlur)?this.props.onBlur:()=>{},
    funcOnFocus:this.isFunction(this.props.onFocus)?this.props.onFocus:()=>{},
    enteredValue:this.props.value?this.props.value:'',
    enteredCaption:this.props.caption?this.props.caption:'',
    enteredPlaceholder: this.props.placeholder?this.props.placeholder:'',
    focused:false,
    blurred:false,
    iconColor:this.props.iconColor
    // error:this.props.error
  }
  isFunction(property){
      if(typeof property==='function') return true
      else {
          // console.log('notFunction')
        return false
      }
  }
  loadInputStyle(){
      if (this.props.error==='true'&&!this.state.focused){return styles.search__error}
      else if (this.state.focused){return styles.search__focused}
      else return styles.search__blurred
      
    //   else {return styles.search__blurred} 
  }
  handleChange(e){
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }
  handleSubmit(){
    const { onSubmit } = this.props;
    // onSubmit()
    console.log('sss')
  }
  handleKeyPress(e){
    const {onKeyPress} = this.props;
    onKeyPress(e)
  }
  render() {
      return(
        <div className={styles.search__blurred}>
            {/* <div className={styles.search__caption}>{this.state.enteredCaption}</div> */}
            <div className={styles.search__icon} style={{backgroundColor:this.state.iconColor}}></div>
            <input className={styles.search__field__normal}
            error={this.props.error}
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            onBlur={()=>{
                this.state.funcOnBlur
                this.setState({
                    blurred:true,
                    focused:false
                })
            }}
            onFocus={()=>{
                this.state.funcOnBlur
                this.setState({
                    focused:true
                })
            }}
            placeholder={this.state.enteredPlaceholder}
            disabled={true}
            />
        </div>
      )
  }
}
export default SearchItem;