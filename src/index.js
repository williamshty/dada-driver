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
      currentOrder: {
        startTitle: "锦江瑞康医院",
        startInfo: "成都市成华区牛市口",
        startLat: "104.124269",
        startLng: "30.606301",
        endTitle: "天府软件园A区",
        endInfo: "四川省成都市武侯区天府三街",
        endLat: "104.077183",
        endLng: "30.555715",
        duration: "1h 12min",
        price: "13.70",
        distance: "12",
        pax: "2",
        clientTel: "13840243280"
      },
      shareOrder: {
        startTitle: "share锦江瑞康医院",
        startInfo: "成都市成华区牛市口",
        startLat: "104.124269",
        startLng: "30.606301",
        endTitle: "天府软件园A区share",
        endInfo: "四川省成都市武侯区天府三街",
        endLat: "104.077183",
        endLng: "30.555715",
        duration: "1h 12min",
        price: "13.70",
        distance: "12",
        pax: "2",
        clientTel: "13840243280"
      }
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
