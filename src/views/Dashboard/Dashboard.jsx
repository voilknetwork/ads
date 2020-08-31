import React from "react";

import { PanelHeader } from "components";
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';
import Member from "../Member/Member";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../../components/Loading/Loading";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let cookies = new Cookies();
    this.state = {
      username: cookies.get("VOILK_USERNAME"),
      privatekey: cookies.get("VOILK_POSTING"),
      posting_pubkey: cookies.get("VOILK_POSTINGPUB")
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  isLoggedIn = () => {
    // let cookies = new Cookies();
    // this.setState({
    //   username: cookies.get("VOILK_USERNAME"),
    //   privatekey: cookies.get("VOILK_POSTING"),
    //   posting_pubkey: cookies.get("VOILK_POSTINGPUB")
    // });
    console.log(this.state.username);
    if (this.state.username == "null" || 
    this.state.privatekey == "null" || 
    this.state.posting_pubkey == "null"|| 
    this.state.username == undefined || 
    this.state.posting_pubkey == undefined||
    this.state.privatekey == undefined
    ) {
      window.location.href = "/login"
    }
  }

  onDismiss() { }
  notify(place, msg) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    type = "info";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          {msg}
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 10
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  
  render() {
    return (
      <React.Fragment>
        {this.isLoggedIn()}
          <PanelHeader size="sm" />
          <div className="content">
            <NotificationAlert ref="notificationAlert" />
            <Query query={gql`
                {
                  get_ads_profile(
                    username: "${this.state.username}",
                    private_posting_key: "${this.state.privatekey}"
                  ) {
                    _id
                    name
                    username
                    credit
                    ads {
                      _id
                      ad_type
                      ad_link
                      ad_target
                      ad_width
                      ad_height
                      ad_status
                      ad_active
                      ad_clicks{
                        ad_browser
                        ad_platform
                        created_at
                        geoplugin_areaCode
                        geoplugin_city
                        geoplugin_continentCode
                        geoplugin_continentName
                        geoplugin_countryCode
                        geoplugin_countryName
                        geoplugin_currencyCode
                        geoplugin_currencyConverter
                        geoplugin_currencySymbol
                        geoplugin_currencySymbol_UTF8
                        geoplugin_delay
                        geoplugin_dmaCode
                        geoplugin_euVATrate
                        geoplugin_inEU
                        geoplugin_latitude
                        geoplugin_locationAccuracyRadius
                        geoplugin_timezone
                        geoplugin_status
                        geoplugin_request
                        geoplugin_regionName
                        geoplugin_regionCode
                        geoplugin_region
                        geoplugin_longitude
                      }
                      ad_impressions{
                        ad_browser
                        ad_platform
                        created_at
                        geoplugin_areaCode
                        geoplugin_city
                        geoplugin_continentCode
                        geoplugin_continentName
                        geoplugin_countryCode
                        geoplugin_countryName
                        geoplugin_currencyCode
                        geoplugin_currencyConverter
                        geoplugin_currencySymbol
                        geoplugin_currencySymbol_UTF8
                        geoplugin_delay
                        geoplugin_dmaCode
                        geoplugin_euVATrate
                        geoplugin_inEU
                        geoplugin_latitude
                        geoplugin_locationAccuracyRadius
                        geoplugin_timezone
                        geoplugin_status
                        geoplugin_request
                        geoplugin_regionName
                        geoplugin_regionCode
                        geoplugin_region
                        geoplugin_longitude
                      }
                      created_at
                      updated_at
                      ad_status
                    }
                    created_at
                    updated_at
                    error
                  }
                }
            `}
           >
        {({ loading, error, data }) => {
          if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
          if (error) return <p>Error :(</p>;
          return(
            <Member info={data.get_ads_profile}/>
            )
          }}
          </Query>
          </div>
          
        </React.Fragment>
    );
  }
}

export default Dashboard;
