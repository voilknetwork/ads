import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="https://www.voilk.com">voilk</a>
              </li>
              <li>
                <a href="https://goo.gl/forms/cnsbnfbugb8XKukr2">Signup</a>
              </li>
              <li>
                <a href="https://voilk.com/login.html">Login</a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}{" "}
            Special Thanks to{" "}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Tim
            </a>.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
