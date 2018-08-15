import React from "react";
import ReactDOM from "react-dom";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import * as moment from "moment";
import { SearchBar, List } from "antd-mobile";
import styles from "./OrderGeneration.css";
import {
  searchLocationByCoordinate,
  searchLocation,
  getEstimatedRoute
} from "../../utils/baiduQuery";
import { acceptOrder, verifyOrder } from "../../utils/webServices";
import OrderPriceForm from "../Forms/OrderPriceForm";
import SearchItem from "../Forms/SearchItem";
import SearchListItem from "../SearchListItem/SearchListItem";
import Toast from "../../components/Toast/Toast";
// import pile from 'pile-ui'
const Item = List.Item;
const Brief = Item.Brief;
class OrderGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: this.props.mapData.currentLocation,
      start: "",
      end: "",
      locationHintList: [],
      selectedStartLocation: this.props.mapData.startLocation,
      startLocationActivated: false,
      selectedEndLocation: "",
      endLocationActivated: false,
      estimatedDistance: 0,
      estimatedTime: 0,
      estimatedPrice: 0,
      routeShouldUpdate: true,
      riderNumber: 0,
      paxSelected: 0,
      showOrderTakeFailure:false
    };
  }
  componentDidMount() {
    this.loadLocationByCoordinate.bind(this)(this.state.currentLocation);
    this.props.dispatch({
      type: "mapData/save",
      payload: {
        startLocation: this.state.currentLocation
      }
    });
  }
  componentDidUpdate() {
    if(this.state.showOrderTakeFailure){
      setTimeout(()=>{
        this.setState({showOrderTakeFailure:false})
        this.props.dispatch(routerRedux.push({ pathname: "/" }));
      },2000)
    }
  }
  async loadLocationByCoordinate(coordinate) {
    const result = await searchLocationByCoordinate(coordinate);
    this.props.dispatch({
      type: "mapData/save",
      payload: {
        startLocationDescription: result
      }
    });
    this.setState({
      start: result
    });
    console.log(result);
  }
  async loadEstimatedRoute() {
    const result = await getEstimatedRoute(
      this.props.mapData.startLocation,
      this.props.mapData.endLocation
    );
    console.log(result);
    this.setState({
      estimatedDistance: (result.paths[0].distance / 1000).toFixed(1),
      estimatedTime: Math.floor(result.paths[0].duration / 60) + 1,
      estimatedPrice: Math.floor(result.taxi_cost) + 1,
      routeShouldUpdate: false
    });
    this.props.dispatch({
      type: "trip/save",
      payload: {
        price: Math.floor(result.taxi_cost) + 1
      }
    });
  }
  async loadSearchedLocation(param) {
    const result = await searchLocation(param);
    // console.log(result)
    this.setState({
      locationHintList: result
    });
  }
  async acceptOrderFunction() {
    console.log('accept order triggered')
    const order_status = await verifyOrder(
      this.props.driverStatus.currentOrder.id
    );
    console.log(order_status);
    if(order_status.data.data){
      const order_accepted = await acceptOrder({
        driver: localStorage.getItem("driverID"),
        _id: this.props.driverStatus.currentOrder.id,
        time: Date.now()
      });
      console.log(order_accepted);
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          orderGenerationTriggered: false,
          driverFoundTriggered: true
        }
      });
      this.props.dispatch({
        type: "driverStatus/save",
        payload: {
          clientIn:true
        }
      });
    }
    else {
      this.setState({showOrderTakeFailure:true})
    }
  }
  onStartChange = value => {
    this.setState({
      start: value
    });
  };
  onEndChange = value => {
    this.setState({
      end: value
    });
  };

  onSubmitStart = value => {
    this.loadSearchedLocation.bind(this)(value);
    this.setState({
      startLocationActivated: true
    });
  };
  onSubmitEnd = value => {
    this.loadSearchedLocation.bind(this)(value);
    this.setState({
      endLocationActivated: true
    });
  };
  getBottomContainerClass = () => {
    if (this.props.navigator.priceFocusTriggered === 0) {
      return styles.bottom__container;
    } else if (this.props.navigator.priceFocusTriggered === 1) {
      return styles.bottom__container__move__up;
    } else return styles.bottom__container__move__down;
  };
  loadSinglePaxStyle() {
    if (this.state.paxSelected === 1) {
      return styles.single__pax__activated;
    } else return styles.single__pax;
  }
  loadDoublePaxStyle() {
    if (this.state.paxSelected === 2) {
      return styles.double__pax__activated;
    } else return styles.double__pax;
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.showOrderTakeFailure) {
            return <Toast text="订单已失效" />;
          }
        })()}
        <div className={styles.top__container}>
          <div
            className={styles.back__arrow}
            onClick={() => {
              this.props.dispatch(routerRedux.push({ pathname: "/" }));
            }}
          >
            <img width={8} src={require("../../assets/backArrow.png")} />
          </div>
          <div className={styles.start__search__container}>
            <SearchItem
              placeholder=""
              iconColor="#1ad371"
              value={this.props.driverStatus.currentOrder.startTitle}
              onChange={this.onStartChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.onSubmitStart(this.state.start);
                }
              }}
            />
          </div>
          <div className={styles.end__search__container}>
            <SearchItem
              placeholder=""
              iconColor="#ff0000"
              value={this.props.driverStatus.currentOrder.endTitle}
              onChange={this.onEndChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.onSubmitEnd(this.state.end);
                }
              }}
            />
          </div>
          <img
            className={styles.top__divider}
            src={require("../../assets/矩形 609.png")}
          />
        </div>
        {(() => {
          return (
            <div>
              <div className={styles.top__info__container}>
                <div className={styles.bottom__distance__text}>预计路程</div>
                <div className={styles.bottom__distance__number}>
                  {this.props.driverStatus.currentOrder.distance}
                  &nbsp;
                  <span className={styles.bottom__distance__unit}>Km</span>
                </div>
                <div className={styles.bottom__pax__text}>人数</div>
                <div className={styles.bottom__pax__number}>
                  {this.props.driverStatus.currentOrder.pax}
                  &nbsp;
                  <span className={styles.bottom__pax__unit}>人</span>
                </div>
                <div className={styles.bottom__time__text}>预计时间</div>
                <div className={styles.bottom__time__number}>
                  {this.props.driverStatus.currentOrder.duration}
                </div>
              </div>
              <div className={this.getBottomContainerClass()}>
                <div className={styles.bottom__rider__container}>
                  <div className={styles.price__text}>本单金额</div>
                  <div className={styles.price}>
                    {this.props.driverStatus.currentOrder.price}
                    &nbsp;NAS
                  </div>
                </div>
                <div
                  className={styles.bottom__rider__submit}
                  onClick={()=>{
                    this.acceptOrderFunction()
                    
                  }}
                >
                  抢单
                  {/* {() => {
                    this.props.dispatch({
                      type: "navigator/save",
                      payload: {
                        orderGenerationTriggered: false,
                        driverFoundTriggered: true
                      }
                    });
                  }} */}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }
}

OrderGeneration.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(OrderGeneration);
