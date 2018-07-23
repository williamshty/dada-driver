import dva from 'dva';
import './index.css';
var currentLocation = {lng: 104.06756279999999, lat: 30.551020799999996}
// {lng: 104.06756279999999, lat: 30.551020799999996}
//async
// navigator.geolocation.getCurrentPosition(editLocation);
// 1. Initialize
const app = dva({
    initialState:{
        navigator:{
            sideMenuStatus: false,
            orderGenerationTriggered:false,
            priceFocusTriggered: 0
        },
        mapData:{
            currentLocation:currentLocation
        }
    }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/navigator').default);
app.model(require('./models/mapData').default);
app.model(require('./models/trip').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
