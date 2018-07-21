
export default {

    namespace: 'navigator',
  
    state: {
        sideMenuOpen:false
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
      // toggleSideMenu(state){
      //     return{sideMenuOpen:!state.sideMenuOpen};
      // }
    },
  
  };
  