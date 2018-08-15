 /* eslint-disable */
import dva from "dva";
import "./index.css";
var currentLocation = { lng: 104.06756279999999, lat: 30.551020799999996 };
// {lng: 104.06756279999999, lat: 30.551020799999996}
//async
// navigator.geolocation.getCurrentPosition(editLocation);
// 1. Initialize
const app = dva({
  initialState: {
    navigator: {
      sideMenuOpen: false,
      orderGenerationTriggered: true,
      driverFoundTriggered: false,
      inTripTriggered: false,
      rideShareTriggered: false,
      confirmTripEndTriggered: false,
      clientConfirmed: false,
      isLoggedIn: false
    },
    mapData: {
      currentLocation: currentLocation
    },
    trip: {
      start: "",
      end: "",
      length: "",
      price: ""
    },
    driverStatus: {
      opened: true,
      closed: false,
      fillEmpty: false,
      fillIp: false,
      evaluationIp: false,
      evaluationFailed: false,
      verifyIp: false,
      verifyFailed: false,
      orderList:[],
      currentOrder: false,
      shareOrder: false,
      clientIn:false,
      inShareOrder:false,
      firstOrder:{},
      secondOrder:{}
    }
  }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require("./models/navigator").default);
app.model(require("./models/mapData").default);
app.model(require("./models/driverStatus").default);
// app.model(require('./models/trip').default);
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
