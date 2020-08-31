import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';

let { PrivateKey, key_utils } = require('voilk/lib/auth/ecc');
require('isomorphic-fetch');

var ps;

class Login extends React.Component {

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

  state = {
    username: "",
    privatekey: "",
    msg: "",
    posting_pubkey: "",
    available: false
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
  validate_account_name = (value) => {
    let i, label, len, length, ref;

    if (!value) {
      return "Account name Should not be empty";
    }
    length = value.length;
    if (length < 3) {
      return "Account name should be at least 3 characters";
    }
    if (length > 16) {
      return "Account name should be shorter than 16 characters";
    }
    ref = value.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      if (!/^[a-z]/.test(label)) {
        return "Account name can only consist upon small letters, digits, and dashes!";
      }
      if (!/^[a-z0-9-]*$/.test(label)) {
        return "Account name can only consist upon letters, digits and dashes";
      }
      if (/--/.test(label)) {
        return "Account name can only have 1 dash in a row";
      }
      if (!/[a-z0-9]$/.test(label)) {
        return "Account name should end with a letter or digit";
      }
      if (!(label.length >= 3)) {
        return "each account segment should be longer";
      }

    }
    
    return null;
  }
  username_exists = (e) => {
    //this.notify("tr", (<div>Contacting blockchain <b> for verification</b> - of your account </div>))
    //this.validate_account_name(e);
    
    fetch('https://graphql.voilk.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ account(name: "' + e + '") { name posting {key_auths} active {key_auths} } }' }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        if (res.data.account !== null) {
          this.setState(
            {
              error: "Account exists on blockchain  ✅",
              available: true,
              username: res.data.account.name,
              posting_pubkey: res.data.account.posting.key_auths[0][0],
              active_pubkey: res.data.account.active.key_auths[0][0]
            }
          );
          this.notify("tr", (<div>Notification alert - {this.state.error} - <b>{this.state.username}</b></div>))
          this.verifykey(this.state.privatekey);
          return;
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
  handlechange = (e) => {
    this.setState({ genbtn: true });
    let msg = this.validate_account_name(e.target.value);
    if (msg !== null) {
      this.setState(
        {
          username: "",
          genbtn: true,
          error: msg
        }
      );
      return;
      //this.notify("tr", (<div>Notification alert - {this.state.error}</div>))
    }
    else {
      this.setState({
        username: e.target.value,
        genbtn: true,
        error: "Username is Valid  ✅"
      });
      //this.notify("tr", (<div>Notification alert - {this.state.error}</div>))
    }
    
  }
  get_public_key(privWif) {
    var pubWif = PrivateKey.fromWif(privWif);
    pubWif = pubWif.toPublic().toString();
    return pubWif;
  };
  handlekey = (e) => {
    
    console.log(this.state.posting_pubkey);
    this.setState({
      privatekey: e.target.value
    });
    
  }

  verifykey = (e) => {
    let pub;
    try {
      pub = this.get_public_key(e);
    } catch (error) {
      this.setState({ error: "Invalid Key" })
    }
    if (pub === this.state.posting_pubkey) {
      this.setState({
        privatekey: e,
        error: "Your key is valid ✅"
      })
    }
    this.notify("tr", (<div>Notification Alert: {this.state.error}</div>))
    if (pub === this.state.posting_pubkey && this.state.available == true)
    {
      const cookies = new Cookies();
      cookies.set('VOILK_USERNAME', this.state.username);
      cookies.set('VOILK_POSTING', this.state.privatekey);
      cookies.set('VOILK_POSTINGPUB', this.state.posting_pubkey); 
      cookies.set('VOILK_ACTIVEPUB', this.state.active_pubkey); 
      this.notify("tr", (<div>Logging you in with <b>{cookies.get("VOILK_USERNAME")} </b>  
      {cookies.get("VOILK_POSTING")}
      </div>))
      this.notify("tr", (<div>We are redirecting you to <b>Dashboard</b> - in 5 seconds</div>))
      this.wait(5000);
      window.location.href = "/dashboard"
    }
    else {
      const cookies = new Cookies();
      cookies.set('VOILK_USERNAME', null);
      cookies.set('VOILK_POSTING', null);
      this.notify("tr", (<div>Notification Alert: We Could not login {cookies.get("VOILK_USERNAME")} -
      {cookies.get("VOILK_POSTING")}
      </div>))    
    }
  }
	wait = (ms) =>
	{
		var d = new Date();
		var d2 = null;
		do { d2 = new Date(); }
		while(d2-d < ms);
	}
  handleLogin = () => {
    const msg = (
      <div>
        <img
                height={"30px"}
                src={
                  "https://loading.io/spinners/pies/lg.pie-chart-loading-gif.gif"
                }
                alt={"Loading..."}
              />
              Hold on <b>We are contacting blockchain</b><br />- to verify your information.
      </div>
    );
    this.notify("tr", msg);
    this.username_exists(this.state.username);    
    
  }

  componentDidMount() {

    if(!(this.state.username=="null"||this.state.username==undefined))
    {
      window.location.href = "/dashboard";
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    return (
      <div>

        <nav class="navbar navbar-expand-lg navbar-transparent  navbar-absolute bg-primary fixed-top">
          <div class="container-fluid">
            <div class="navbar-wrapper">
              <div class="navbar-toggle">
                <button type="button" class="navbar-toggler">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
                </button>
              </div>
              <a class="navbar-brand" href="/">Voilk Advertisements</a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-bar navbar-kebab"></span>
              <span class="navbar-toggler-bar navbar-kebab"></span>
              <span class="navbar-toggler-bar navbar-kebab"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navigation">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a href="/dashboard" class="nav-link">
                    <i class="now-ui-icons design_app"></i> Dashboard
            </a>
                </li>
                <li class="nav-item ">
                  <a href="https://voilk.com/register" class="nav-link">
                    <i class="now-ui-icons tech_mobile"></i> Register
            </a>
                </li>
                <li class="nav-item  active ">
                  <a href="/login" class="nav-link">
                    <i class="now-ui-icons users_circle-08"></i> Login
            </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="wrapper wrapper-full-page ">
          <div
            class="full-page login-page section-image"
            filter-color="white"
            style={{ backgroundImage: `url("https://i.imgur.com/Xy9BjPr.jpg")` }}
          >
            <div class="content" data-color="rose">
              <NotificationAlert ref="notificationAlert" />
              <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                  <div class="form">
                    <div class="card card-login card-plain">
                      <div class="card-header ">
                        <div class="logo-container">
                          <img src="../../assets/img/new-logo.png" alt="" />
                          <br /><br />
                          <p className="h6" style={{ color: "white", textAlign: "center" }}>VoilkADS v1.0.1</p>
                        </div>
                      </div>
                      <div class="card-body ">
                        <div class="input-group no-border form-control-lg">
                          <span class="input-group-addon">
                            <i class="now-ui-icons users_circle-08"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Insert username.." onChange={this.handlechange}
                            disabled={this.state.inputfield} />
                        </div>
                        <div class="input-group no-border form-control-lg">
                          <span class="input-group-addon">
                            <i class="now-ui-icons text_caps-small"></i>
                          </span>
                          <input type="text" placeholder="Insert posting key.." class="form-control" onChange={this.handlekey} 
                            disabled={this.state.keyfield}/>
                        </div>
                      </div>
                      <div class="card-footer ">
                        <button color="primary" block onClick={this.handleLogin} class="btn btn-info btn-round btn-lg btn-block mb-3">Login</button>

                        <div class="pull-left">
                          <h6>
                            <a href="https://signup.voilk.com/register" class="link footer-link">Create Account</a>
                          </h6>
                        </div>
                        <div class="pull-right">
                          <h6>
                            <a href="https://voilk.com/faq" class="link footer-link">Need Help?</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="footer">
              <div class="container-fluid">
                <nav>
                  <ul>
                    <li>
                      <a href="https://voilk.com">
                        voilk
                </a>
                    </li>
                    <li>
                      <a href="http://explorer.voilk.com">
                        Explorer
                </a>
                    </li>
                    <li>
                      <a href="http://voilk.com">
                        Blog
                      </a>
                    </li>
                  </ul>
                </nav>
                <div class="copyright">
                  Design Credits
            <a href="https://www.invisionapp.com" target="_blank">Invision</a>. and
            <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
          </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
