import React from 'react';
import { Map } from 'react-amap';
const MapComponent = () => {
  return (
    <Map
      plugins={['ToolBar']}
      zoomEnable={true}
      amapkey={'6ef645bb8bc53ec110461982c1455e04'}/>
  );
};

MapComponent.propTypes = {
};

export default MapComponent;
