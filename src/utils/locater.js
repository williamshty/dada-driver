export default async function loadPosition (dispatch) {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const currentLocation={
        lng:longitude,
        lat: latitude,
      }
      console.log('position loaded')
      dispatch({
        type:'mapData/updateCurrentLocation',
        payload:{
          currentLocation:currentLocation,                                                                                                                   
          startLocation:currentLocation
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  function getCurrentPosition (options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
