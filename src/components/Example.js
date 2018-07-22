import React from 'react';
import { connect } from 'dva';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render(){
    return (
        <div></div>
    );
  }

};

Example.propTypes = {
  
};

function mapStateToProps(state) {
  return this.state
}

export default connect(mapStateToProps)(Example);
