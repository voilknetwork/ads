import React, { Component } from 'react';
import InfoItem from "../../components/InfoPanel/InfoItem";
import Browser from "../../components/ImpRecorder/general";
import PropTypes from "prop-types";
class Balance extends Component {
    state = { 
      browser: Browser.getBrowserName()
    }
    render() { 
        return ( 
            <InfoItem
            info={{
              icon_color: "icon icon-info",
              icon: "fas fa-hand-pointer",
              value: "Clicks",
              fname: this.props.count
            }}
          />
         );
    }
}
Balance.propTypes = {
  count: PropTypes.string
};  
export default Balance;