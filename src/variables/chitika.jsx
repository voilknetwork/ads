import React, { Component } from "react";

let chitika = () => {
  if (window.CHITIKA === undefined) {
    window.CHITIKA = { units: [] };
  }
  var unit = {
    calltype: "async[2]",
    publisher: "bhbigheart",
    width: 728,
    height: 90,
    sid: "Chitika Default"
  };
  var placement_id = window.CHITIKA.units.length;
  window.CHITIKA.units.push(unit);
  let chitikaID = `chitikaAdBlock-${placement_id}`;
  return chitikaID;
};

class Chitika extends Component {
  render() {
    return <div id={chitika()} />;
  }
}

export default Chitika;
