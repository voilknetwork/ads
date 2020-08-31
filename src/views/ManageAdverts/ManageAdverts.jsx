import React, { Component, Fragment } from 'react';
import { PanelHeader } from "components";
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';
import {
  Card,
  CardBody,
  Badge
} from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../../components/Loading/Loading";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Slider from 'react-rangeslider'
require("isomorphic-fetch");

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

class ManageAdverts extends Component {
  constructor(props) {
    super(props);
    let cookies = new Cookies();
    this.state = {
      username: cookies.get("VOILK_USERNAME"),
      privatekey: cookies.get("VOILK_POSTING"),
      posting_pubkey: cookies.get("VOILK_POSTINGPUB"),
      volume: 0
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  state = {
    key: 0
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
      this.state.posting_pubkey == "null" ||
      this.state.username == undefined ||
      this.state.posting_pubkey == undefined ||
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
  removead(e) {

    e.preventDefault();
    let advertId = e.target.getAttribute("data-info");
    this.notify("tr", (<div>Sending Delete request - {advertId}</div>));
    this.notify("tr", (<div>Kindly don't close this window - while we process your request</div>));
    fetch('https://graphql.voilk.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ delete_advert (username: "' + this.state.username + '", wif: "' + this.state.privatekey + '", advert_id: "' + advertId + '") { error nMatched nModified nUpserted }}' }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.delete_advert !== null) {
          this.notify("tr", (<div>Your advert was deleted successfully - {res.data.delete_advert.nModified}</div>))
          //this.setState({key:1})
          window.location.href = "/manage";
        }
        else {
          this.notify("tr", (<div>We could not delete your advert- Try again later</div>))
          return null;
        }
      }
      )

  }
  advertactive(e) {

    e.preventDefault();
    let advertId = e.target.getAttribute("data-info");
    let ctive = e.target.getAttribute("data-adveactive");
    let adactive = !(ctive==="true"?true:false);

    let msg = adactive==true?"Starting":"Stopping";

    this.notify("tr", (<div>Sending <b>{msg}</b> request - {advertId}</div>));
    this.notify("tr", (<div>Kindly don't close this window - while we process your request</div>));
    fetch('https://graphql.voilk.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ act_dec_advert (username: "' + this.state.username + '", wif: "' + this.state.privatekey + '", advert_id: "' + advertId + '", toggle: '+adactive+') { error nMatched nModified nUpserted }}' }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.act_dec_advert !== null) {
          this.notify("tr", (<div>Your {msg} request was successfully processed - {res.data.act_dec_advert.nModified}</div>))
          //this.setState({key:1})
          window.location.href = "/manage";
        }
        else {
          this.notify("tr", (<div>We could not process your request- Try again later</div>))
          return null;
        }
      }
      )

  }

  createrows(adverts, credit) {
    return adverts.map((advert, key) => {
      let timeAgo = new TimeAgo('en-US')
      return (
        <Fragment>
        <div className="col-md-6" key={key}>
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                <a href={advert.ad_target}>
                <img width={advert.ad_width} height={advert.ad_height} src={advert.ad_link} alt="..." />
                </a></div>
                <br />
                <table className="table table-borderedtable table-striped table-bordered dataTable dtr-inline">
                  <tbody>
                    <tr>
                      <th className="text-right">
                        Impressions
                      </th>
                      <td>
                      {advert.ad_impressions.length}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Clicks
                      </th>
                      <td>
                        {advert.ad_clicks.length}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Credits
                      </th>
                      <td>
                      <Badge color="primary">{advert.ad_credits}</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Status
                      </th>
                      <td>
                        {(advert.ad_active === "true") ? "Running": "Stopped"}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Size
                      </th>
                      <td>
                        {advert.ad_width +"x"+advert.ad_height}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Created
                      </th>
                      <td>
                      {timeAgo.format(new Date(parseInt(advert.created_at)))}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Reports
                      </th>
                      <td>
                      <a href={"/reports/"+advert._id}>Report</a>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-right">
                        Actions
                      </th>
                      <td>
                        <div className="btn-group">
                        <button data-adveactive={advert.ad_active} data-info={advert._id} onClick={this.advertactive.bind(this)} className={`btn btn-${advert.ad_active == "true" ? "warning" : "info"} btn-round`}>{(advert.ad_active === "true") ? (<Fragment>{"Stop "}<i class="fas fa-pause" disabled></i></Fragment>) : (<Fragment>{"Start "}<i class="fas fa-play" disabled></i></Fragment>)}</button>
                      
                        <button type="button" rel="tooltip" data-placement="left" title="Remove item" 
                          class="btn btn-info btn-round" data-info={advert._id} onClick={this.removead.bind(this)}>
                            Delete <i class="now-ui-icons ui-1_simple-remove"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <small>Assign Credits: </small>
                
                <Slider
                  min = {0}
                  max = {credit}
                  value={this.state[key]}
                  step={1}
                  orientation="horizontal"
                  onChange={(value) => {this.setState({
                    [key]: value
                  })}}
                  onChangeComplete={(value) => {
                    this.notify("tr", (<div> Assigning {" " + this.state[key] + " "} Credit to your advert - {advert._id}</div>))
                    fetch('https://graphql.voilk.com/graphql', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ query: '{ add_credit_to_advert (username: "' + this.state.username + '", wif: "' + this.state.privatekey + '", advert_id: "' + advert._id + '", credit: '+this.state[key]+') { error nMatched nModified nUpserted }}' }),
                    })
                      .then(res => res.json())
                      .then(res => {
                        if (res.data.add_credit_to_advert !== null) {
                          if(res.data.add_credit_to_advert.nModified===1)
                          {
                            this.notify("tr", (<div>Your request was successfully processed - {res.data.add_credit_to_advert.nModified}</div>))
                            //this.setState({key:1})
                            window.location.href = "/manage";
                        
                          }else{
                            this.notify("tr", (<div>Your request was not processed - {res.data.add_credit_to_advert.error}</div>))
            
                          }
                        }  
                        else {
                          this.notify("tr", (<div>We could not process your request- Try again later</div>))
                          return null;
                        }
                      }
                      )
                  }}
                  data-id={key}
                />
                <br />
                <br />
                <Badge color={advert.ad_status == "approved" ? "success" : "danger"} >{advert.ad_status}</Badge> <br />  
          
              </div>
            </div>
          
        </div>
        {/* <tr>
          <td></td>
          <td></td>
          <td colSpan={2} className="text-right"> </td>
          <td></td>
        </tr> */}
        </Fragment>
      )
    })
  }

  render() {
    return (
      <Fragment>
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
                      ad_credits
                      ad_clicks{
                        ad_browser
                        ad_platform
                        ad_url
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
                        ad_url
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
              let adverts = data.get_ads_profile.ads;
              let credit = data.get_ads_profile.credit;
              let clicks = [];
              for (let advert of adverts) {
                for (let cl of advert.ad_clicks) {
                  clicks.push(cl);
                }
              }
              let impressions = [];
              for (let advert of adverts) {
                for (let impression of advert.ad_impressions) {
                  impressions.push(impression);
                }
              }

              return (
                <Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <Card>
                        <CardBody>
                          <div class="row">
                            <div class="col-lg-4 col-md-12 text-center">
                              <div class="card card-contributions">
                                <div class="card-body ">
                                  <h1 class="card-title">{impressions.length}</h1>
                                  <h3 class="card-category">Total Advert Impressions</h3>
                                  <p class="card-description">When your advertisement is displayed to a user's mobile or desktop screen, we record it as an impression or a view.</p>
                                </div>
                                <hr />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-12 text-center">
                              <div class="card card-contributions">
                                <div class="card-body ">
                                  <h1 class="card-title">{clicks.length}</h1>
                                  <h3 class="card-category">Total Advert Clicks</h3>
                                  <p class="card-description">When a user clicks on your advertisement, to actually visit your target link. We record it as a click.</p>
                                </div>
                                <hr />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-12 text-center">
                              <div class="card card-contributions">
                                <div class="card-body ">
                                  <h1 class="card-title">{credit}</h1>
                                  <h3 class="card-category">Ad credits</h3>
                                  <p class="card-description">Impressions and clicks are charged in adcredits, CPI(cost per impress) and CPC can change depending upon your advert.</p>
                                </div>
                                <hr />
                              </div>
                            </div>
                          </div><Card>
                            <div class="card-header">
                              <h4 class="card-title"> Your advertisements</h4>
                            </div>
                            <div class="card-body">
                              <div className="row">
                                {this.createrows(adverts, credit)}
                              </div>
                            </div>
                          </Card>

                        </CardBody>
                      </Card>

                    </div>

                  </div>
                </Fragment>
              )
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

export default ManageAdverts;