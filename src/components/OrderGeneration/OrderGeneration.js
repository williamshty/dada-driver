import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import * as moment from 'moment'
import {SearchBar, List} from 'antd-mobile';
import styles from './OrderGeneration.css';
import {searchLocationByCoordinate,searchLocation,getEstimatedRoute} from '../../utils/baiduQuery'
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
        estimatedDistance:0,
        estimatedTime:0,
        estimatedPrice:0,
        routeShouldUpdate:true,
        riderNumber:0,
        paxSelected:0
    }
  }
  componentDidMount() {
    this.loadLocationByCoordinate.bind(this)(this.state.currentLocation)
    this.props.dispatch({
        type:'mapData/save',
        payload:{
            startLocation:this.state.currentLocation
        }
    })
  }
  componentDidUpdate() {
  }
  async loadLocationByCoordinate (coordinate) {
    const result = await searchLocationByCoordinate(coordinate)
    this.props.dispatch({
        type:'mapData/save',
        payload:{
            startLocationDescription:result
        }
    })
    this.setState({start:result})
    console.log(result)
  }
  async loadEstimatedRoute () {
    const result = await getEstimatedRoute(this.props.mapData.startLocation, this.props.mapData.endLocation)
    console.log(result)
    this.setState({
        estimatedDistance:(result.paths[0].distance/1000).toFixed(1),
        estimatedTime:Math.floor(result.paths[0].duration/60)+1,
        estimatedPrice:Math.floor(result.taxi_cost)+1,
        routeShouldUpdate:false
    })
    this.props.dispatch({
        type:'trip/save',
        payload:{
            price:Math.floor(result.taxi_cost)+1
        }
    })
  }
  async loadSearchedLocation (param) {
    const result = await searchLocation(param)
    // console.log(result)
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
  getBottomContainerClass = () =>{
      if(this.props.navigator.priceFocusTriggered===0)
      {
        return styles.bottom__container
      }
      else if(this.props.navigator.priceFocusTriggered===1){
          return styles.bottom__container__move__up
      }
      else return styles.bottom__container__move__down
  }
  loadSinglePaxStyle(){
    if(this.state.paxSelected===1){
        return styles.single__pax__activated
    }
    else return styles.single__pax
  }
  loadDoublePaxStyle(){
    if(this.state.paxSelected===2){
        return styles.double__pax__activated
    }
    else return styles.double__pax
  }

  render(){
    return (
        <div>
        <div className={styles.top__container}>
            <div className={styles.back__arrow} onClick={()=>{
                this.props.dispatch({
                    type:'navigator/save',
                    payload:{
                        orderGenerationTriggered:false,
                        returnInitialStateTriggered:true
                    }
                })
            }}>
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
                            this.setState({routeShouldUpdate:true})
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
                            this.setState({routeShouldUpdate:true})
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
        {(()=>{
            if(this.state.selectedEndLocation){
                if(this.state.routeShouldUpdate)this.loadEstimatedRoute.bind(this)()
                return (
                    <div className={this.getBottomContainerClass()}>
                    {/* <div className={styles.bottom__tittle__container}>
                    总路程{this.state.estimatedDistance}km，
                    预计耗时{this.state.estimatedTime}分钟
                    </div> */}
                    <div className={styles.bottom__rider__container}>
                        <div className={styles.bottom__distance__text}>
                        路程
                        </div>
                        <div className={styles.bottom__distance__number}>
                        {this.state.estimatedDistance}&nbsp;
                        <span className={styles.bottom__distance__unit}>Km</span>
                        </div>
                        <div className={styles.bottom__price__text}>
                        费用
                        </div>
                        <div className={styles.bottom__price__number}>
                        12.60&nbsp;
                        <span className={styles.bottom__price__unit}>NAS</span>
                        </div>
                        <div className={styles.bottom__time__text}>
                        时间
                        </div>
                        <div className={styles.bottom__time__number}>
                        {this.state.estimatedTime}&nbsp;
                        <span className={styles.bottom__time__unit}>Min</span>
                        </div>
                        <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
                        <div className={styles.pax__title}>
                        选择乘车人数
                        </div>
                        <div className={styles.single__pax__container} onClick={()=>{this.setState({paxSelected:1})}}>
                            <div className={this.loadSinglePaxStyle()}></div>
                        </div>
                        <div className={styles.double__pax__container} onClick={()=>{this.setState({paxSelected:2})}}>
                            <div className={this.loadDoublePaxStyle()}></div>
                        </div>
                    </div>
                    <div className={styles.bottom__rider__submit} onClick={()=>
                        this.props.dispatch({
                            type:'navigator/save',
                            payload:{
                                orderGenerationTriggered:false,
                                findingDriverTriggered:true
                            }
                        })
                        }>
                        发布订单
                    </div>
                </div>
                )
            }
        
      })()}  
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
