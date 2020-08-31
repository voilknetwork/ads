import React, { Component } from "react";
import { Input, InputGroup } from "reactstrap";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "@bilalhaider"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.value[0] === "@") {
      window.location = `/${this.state.value}`;
    } else {
      window.location = `/${this.state.value}`;
    }
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup className="no-border">
          <Input
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.state.value}
          />
          <span className="input-group-addon" onClick={this.handleSubmit}>
            <i className="now-ui-icons ui-1_zoom-bold" />
          </span>
        </InputGroup>
      </form>
    );
  }
}

export default SearchBar;
