import React, { Fragment, Component } from 'react';
import { PanelHeader } from "components";
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { CardAuthor, CardCategory } from "components";
import Notification from "../../components/Notification/Notification";
import {
    Card,
    CardBody,
    Row,
    Col,
    CardHeader,
    CardTitle,
    Badge
} from "reactstrap";
import InfoBar from "../Member/InfoBar";
import Loading from "../../components/Loading/Loading";
let { PrivateKey, key_utils } = require('voilk/lib/auth/ecc');
require('isomorphic-fetch');


class CreditMarket extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();
        this.state = {
            username: cookies.get("VOILK_USERNAME"),
            privatekey: cookies.get("VOILK_POSTING"),
            posting_pubkey: cookies.get("VOILK_POSTINGPUB"),
            active_pubkey: cookies.get("VOILK_ACTIVEPUB"),
            amountvalidity: false,
            keyvalidity: false,
            selectValidity: false,
            loading: false
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
        //console.log(this.state.username);
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


    handleamount = (e) => {
        console.log(this.state.amount);
        if(!isNaN(e.target.value)){
            this.setState({
            amount: e.target.value,
            error: e.target.value + " Input value is valid  ✅",
            amountvalidity: true
            });
        }
        else{
          this.setState({
            amount: null,
            error: "Input value is invalid",
            amountvalidity: false
          }); 
        }
    }
    get_public_key(privWif) {
        var pubWif = PrivateKey.fromWif(privWif);
        pubWif = pubWif.toPublic().toString();
        return pubWif;
      };
    handlecheck = (e) => {
        if(e.target.checked){
        this.setState({
          check: e.target.checked,
          error: "Selection Checked  ✅",
          selectValidity: true
        });
        }
        else{
            this.setState({
                check: e.target.checked,
                error: "Selection Unchecked",
                selectValidity: false
              });
        }
    }
    handlekey = (e) => {
        let pub;
        try {
          pub = this.get_public_key(e.target.value);
        } catch (error) {
          this.setState({ error: "Invalid Key", keyvalidity: false })
        }
        if (pub === this.state.active_pubkey) {
          this.setState({
            activekey: e.target.value,
            error: "Your key is valid ✅",
            keyvalidity: true
          })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault();
    
        if(this.state.selectValidity&&this.state.keyvalidity&&this.state.amountvalidity)
        {
            this.setState({loading: true});
            let amount = parseFloat(this.state.amount);
            amount = amount.toFixed(3).toString() + " VSD";
            this.notify("tr", (<div>Sending Add Credit Request - <b>{amount}</b></div>))
                        
            fetch('https://graphql.voilk.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: '{ add_credit (username: "' + this.state.username + '",wif: "' + this.state.activekey + '",amount: "'+ amount +'") { error nModified nUpserted nMatched } }' }),
              })
                .then(res => res.json())
                .then(res => {
                  console.log(this.state.username);
                  if (res.data.add_credit !== null) {
                    if(res.data.add_credit.nModified===1){
                        this.setState(
                        {
                            error: "Success  ✅",
                        }
                        );
                        this.notify("tr", (<div>Credit Added Successfully - {res.data.add_credit.nModified}</div>))
                        window.location.href = "/credit"
                    }
                    else{
                        this.setState(
                            {
                                error: "Failed  ",
                            }
                            );
                            this.notify("tr", (<div>Credit was not added - {res.data.add_credit.error} - Try again</div>))
                            
                    }


                  }
                  else {
                    this.setState(
                      {
                        error: "Account does not exist ",
                        availbtn: true,
                        username: ""
                      }
                    );
                    this.notify("tr", (<div>Notification alert - {this.state.error} - <b>{this.state.username}</b></div>))
          
                    return;
                  }
                });
        }
    }

    render() {
        return (
            <Fragment>
                {this.isLoggedIn()}
                <PanelHeader size="sm" />
                <div className="content">
                    <NotificationAlert ref="notificationAlert" />
                    <div class="row">
                        <div class="col-md-12 ml-auto">
                            <div className="card">
                                <div class="card-header">
                                    <h5 class="card-category">Credit Conversion Place</h5>
                                    <h4 class="card-title">Convert VSD to Credits</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div class="col-md-6">
                                            <div class="card ">
                                                <div class="card-header ">
                                                    <h4 class="card-title">Conversion Form</h4>
                                                </div>
                                                <div class="card-body ">
                                                    <form method="#" action="#">
                                                        <label>Type Amount</label>
                                                        <div class="form-group">
                                                            <input type="number" class="form-control" min="0" onChange={this.handleamount}/>
                                                        </div>
                                                        <label>Type Active Key</label>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" onChange={this.handlekey}/>
                                                        </div>
                                                        <div class="form-check mt-3">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" onChange={this.handlecheck}/>
                                                                <span class="form-check-sign"></span>
                                                                We cannot convert Ad Credits back to VSD
                                                            </label>
                                                        </div>
                                                        <div class="form-check mt-3">
                                                            <label class="form-check-label">
                                                                {this.state.error}
                                                            </label>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="card-footer ">
                                                    <button type="submit" class="btn btn-fill btn-primary" onClick={this.handlesubmit}>{this.state.loading?(<img
                height={"50px"}
                src={
                  "https://loading.io/spinners/pies/lg.pie-chart-loading-gif.gif"
                }
                alt={"Loading..."}
                                                    />):null}Convert</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <Query
                                                query={gql`
                                                {
                                                    account(name: "${this.state.username}") {
                                                    id
                                                    name
                                                    owner {
                                                        key_auths
                                                        weight_threshold
                                                        account_auths
                                                    }
                                                    posting {
                                                        key_auths
                                                        weight_threshold
                                                        account_auths
                                                    }
                                                    active {
                                                        key_auths
                                                        weight_threshold
                                                        account_auths
                                                    }
                                                    memo_key
                                                    json_metadata {
                                                        name
                                                        location
                                                        about
                                                        profile_image
                                                        cover_image
                                                        website
                                                    }
                                                    
                                                    vsd_balance
                                                    balance
                                                    }
                                                }
                                                `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading)
                                                        return (
                                                            <Loading
                                                                header={false}
                                                                color={"white"}
                                                                message={"Fetching User Data..."}
                                                            />
                                                        );
                                                    if (error) return <p>Error :(</p>;

                                                    if (data.account === null) {
                                                        return (
                                                            <Notification
                                                                message={"User Not found .."}
                                                                color={"while"}
                                                                header={false}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <React.Fragment>
                                                            <Row>
                                                                        <Col md={12} xs={24}>
                                                                            <InfoBar
                                                                                color={"primary"}
                                                                                icon={"fas fa-funnel-dollar"}
                                                                                info={"VSD"}
                                                                                stats={data.account.vsd_balance}
                                                                            />
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
                                    }
                                    }
                                `}
                                                                            >
                                                                                {({ loading, error, data }) => {
                                                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                                                    if (error) return <p>Error :(</p>;
                                                                                    return (
                                                                                        <InfoBar
                                                                                            color={"info"}
                                                                                            icon={"fas fa-fill-drip"}
                                                                                            info={"Ad Credits"}
                                                                                            stats={data.get_ads_profile.credit}
                                                                                        />
                                                                                    )
                                                                                }}
                                                                            </Query>
                                                                            <InfoBar
                                                                                color={"primary"}
                                                                                icon={"fas fa-coins"}
                                                                                info={"VOILK"}
                                                                                stats={data.account.balance}
                                                                            />


                                                                        </Col>
                                                                    </Row>
                                                        </React.Fragment>
                                                    );
                                                }}
                                            </Query>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreditMarket;