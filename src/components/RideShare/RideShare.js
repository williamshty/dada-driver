import React from "react";
import { connect } from "dva";
import styles from "./RideShare.css";
import SearchItem from "../Forms/SearchItem";
import { acceptOrder, verifyOrder } from "../../utils/webServices";
class RideShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderTakeFailure:false
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  backToTrip(){
    this.props.dispatch({
      type:'navigator/save',
      payload:{
        rideShareTriggered:false
      }
    })
  }
  async acceptOrderFunction() {
    console.log('accept order triggered')
    const order_status = await verifyOrder(
      this.props.driverStatus.shareOrder.id
    );
    console.log(order_status);
    if(order_status.data.data){
      const order_accepted = await acceptOrder({
        driver: localStorage.getItem("driverID"),
        _id: this.props.driverStatus.shareOrder.id,
        time: Date.now()
      });
      console.log(order_accepted);
      this.props.dispatch({
        type:"driverStatus/save",
        payload:{
          inShareOrder:true,
          firstOrder:this.props.driverStatus.currentOrder,
          secondOrder:this.props.driverStatus.shareOrder,
          currentOrder:this.props.driverStatus.shareOrder
        }
      })
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          orderGenerationTriggered: false,
          driverFoundTriggered: true,
          rideShareTriggered:false
        }
      });
    }
    else {
      this.setState({showOrderTakeFailure:true})
      setTimeout(()=>{
        this.props.dispatch({
          type: "navigator/save",
          payload: {
            rideShareTriggered:false
          }
        })
        // this.props.dispatch(routerRedux.push({ pathname: "/" }));
      },2000)
    }
  }
  render() {
    return (
      <div>
        <div className={styles.bottom__container}>
          <div className={styles.bottom__trip__card}>
            <div className={styles.bottom__card__corner__icon} />
            <div className={styles.bottom__trip__title}>发现拼单乘客</div>
            <div className={styles.bottom__trip__info}>
              请您确认是否接下本次拼单
            </div>
            <img
              className={styles.divider__title}
              src={require("../../assets/矩形 609.png")}
            />
            <div className={styles.start__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#1ad371"
                value={this.props.driverStatus.shareOrder.startTitle}
                onChange={this.onStartChange}
              />
            </div>
            <div className={styles.end__search__container}>
              <SearchItem
                placeholder=""
                iconColor="#ff0000"
                value={this.props.driverStatus.shareOrder.endTitle}
                onChange={this.onEndChange}
              />
            </div>
            <div className={styles.reject__button}
            onClick={()=>{
              this.backToTrip()
            }}
            >拒绝</div>
            <div className={styles.accept__button} onClick={
            ()=>{
              this.acceptOrderFunction()
            }
            }>拼单</div>
          </div>
        </div>
      </div>
    );
  }
}

RideShare.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RideShare);
