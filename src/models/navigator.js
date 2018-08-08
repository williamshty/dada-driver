import { routerRedux } from "dva/router";
export default {
  namespace: "navigator",

  state: {
    sideMenuOpen: false,
    orderGenerationTriggered: true,
    driverFoundTriggered: true,
    inTripTriggered: false,
    rideShareTriggered: false,
    confirmTripEndTriggered: false,
    clientConfirmed: false,
    isLoggedIn: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put();
    },
    *toLogIn({ call, put }) {
      yield put(routerRedux.push({ pathname: "/login" }));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    // toggleSideMenu(state){
    //     return{sideMenuOpen:!state.sideMenuOpen};
    // }
    toggleOrderGeneration(state) {
      return {
        ...state,
        orderGenerationTriggered: !state.orderGenerationTriggered
      };
    },
    toLogIn(state) {
      routerRedux.push({ pathname: "/login" });
      return { ...state };
    }
  }
};
