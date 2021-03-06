
export default {

    namespace: 'driverStatus',
  
    state: {
      opened:false,
      closed:false,
      fillEmpty:false,
      fillIp:false,
      evaluationIp:false,
      evaluationFailed:false,
      verifyIp:false,
      verifyFailed:false,
      clientIn:false,
      currentOrder:{},
      shareOrder:{},
      orderList:[],
      tripFinished:{},
      inShareOrder:false,
      firstOrder:{},
      secondOrder:{}
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  