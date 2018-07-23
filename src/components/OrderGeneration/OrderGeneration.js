import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import {SearchBar, List} from 'antd-mobile';
import styles from './OrderGeneration.css';
import {searchLocationByCoordinate,searchLocation} from '../../utils/baiduQuery'
import OrderPriceForm from '../Forms/OrderPriceForm'
// import pile from 'pile-ui'
const Item = List.Item;
const Brief = Item.Brief;
class OrderGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentLocation:this.props.mapData.currentLocation,
        start:'',
        end:'',
        locationHintList:[],
        selectedStartLocation:this.props.mapData.startLocation,
        startLocationActivated:false,
        selectedEndLocation:'',
        endLocationActivated:false,
    }
  }
  componentDidMount() {
    this.loadLocationByCoordinate.bind(this)(this.state.currentLocation)
  }
  async loadLocationByCoordinate (coordinate) {
    const result = await searchLocationByCoordinate(coordinate)
    this.setState({start:result})
    console.log(result)
  }
  async loadSearchedLocation (param) {
    const result = await searchLocation(param)
    console.log(result)
    this.setState({locationHintList:result})
  }
  onStartChange = (value) => {
    this.setState({ start:value });
  };
  onEndChange = (value) => {
    this.setState({ end:value });
  };

  onSubmitStart = (value) => {
    this.loadSearchedLocation.bind(this)(value)
    this.setState({startLocationActivated:true})
  }
  onSubmitEnd = (value) => {
    this.loadSearchedLocation.bind(this)(value)
    this.setState({endLocationActivated:true})
  }

  render(){
    return (
        <div>
        <div className={styles.top__container}>
            <div className={styles.back__arrow} onClick={()=>this.props.dispatch({type:'navigator/toggleOrderGeneration'})}>
            <img width={12.5} src={require('../../assets/backArrow.png')}></img>
            </div>
            <div className={styles.search__container}>
                <SearchBar
                placeholder="起点"
                maxLength={8}
                showCancelButton
                onChange={this.onStartChange}
                onSubmit={(value)=>{this.onSubmitStart(value)}}
                value={this.state.start}
                cancelText=" "/>
                <SearchBar
                placeholder="终点"
                maxLength={8}
                showCancelButton
                onChange={this.onEndChange}
                onSubmit={(value)=>{this.onSubmitEnd(value)}}
                value={this.state.end}
                cancelText=" "/>
            </div>
            {(()=>{
            if(this.state.startLocationActivated){
                return (
                    <div className={styles.start__hint__container}>
                    <List>
                    {(()=>{
                        return this.state.locationHintList.map((hint)=>
                        <Item key={hint.uid} onClick={()=>{
                            this.setState({start:hint.name})
                            this.setState({startLocationActivated:false})
                            this.setState({selectedStartLocation:{
                                lng:hint.location.lng,
                                lat:hint.location.lat
                            }})
                            this.props.dispatch({
                                type:'mapData/save',
                                payload:{
                                    startLocation:{
                                        lng:hint.location.lng,
                                        lat:hint.location.lat
                                    }
                                }
                            })
                            this.props.dispatch({
                                type:'mapData/save',
                                payload:{
                                    startLocationDescription:hint.name
                                }
                            })
                        }}>
                        {hint.name}
                        <Brief>{hint.address}</Brief>
                        </Item>)
                    })()}
                    </List>
                </div>
                )
            } else if (this.state.endLocationActivated){
                return (
                    <div className={styles.end__hint__container}>
                    <List>
                    {(()=>{
                        return this.state.locationHintList.map((hint)=>
                        <Item key={hint.uid} onClick={()=>{
                            this.setState({end:hint.name})
                            this.setState({endLocationActivated:false})
                            this.setState({selectedEndLocation:{
                                lng:hint.location.lng,
                                lat:hint.location.lat
                            }})
                            this.props.dispatch({
                                type:'mapData/save',
                                payload:{
                                    endLocation:{
                                        lng:hint.location.lng,
                                        lat:hint.location.lat
                                    }
                                }
                            })
                            this.props.dispatch({
                                type:'mapData/save',
                                payload:{
                                    endLocationDescription:hint.name
                                }
                            })
                        }}>
                        {hint.name}
                        <Brief>{hint.address}</Brief>
                        </Item>)
                    })()}
                    </List>
                </div>
                )
            }
            })()}
                 
        </div>
        <div className={this.props.navigator.priceFocusTriggered ? styles.bottom__container__move__up:styles.bottom__container}>
            <div className={styles.bottom__tittle__container}>
                <div className={styles.bottom__tittle}>
                填写订单信息
                </div>
                <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
            </div>
            <div className={styles.bottom__rider__container}>
                <div className={styles.bottom__rider__text}>
                请选择您的乘车人数
                </div>
                <div className={styles.bottom__rider__number}>
                </div>
                <div className={styles.bottom__rider__estimate__distance}>
                    <div className={styles.bottom__rider__typography}>
                    总路程共计X.XX千米，预计99分钟后到达
                    </div>
                </div>
                <div className={styles.bottom__rider__estimate__price}>
                    <div className={styles.bottom__rider__typography}>
                    建议价格XX.XX元
                    </div>
                </div>
                <div className={styles.bottom__rider__price}>
                <img className={styles.money__sign} src={require('../../assets/组 18.png')}/>
                    <OrderPriceForm/>
                    <img className={styles.divider__price} src={require('../../assets/矩形 609.png')}/>
                </div>
                <div className={styles.bottom__rider__submit}>
                </div>
            </div>
        </div>
    </div>
    );
  }

};

OrderGeneration.propTypes = {

};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(OrderGeneration);
