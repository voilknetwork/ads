import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Card, CardBody, Table } from "reactstrap";

class BarChart extends Component {
  render() {
    var data_labels = this.props.data.map(block => {
        return block.result;
      });

      var data_items = this.props.data.map(item => {
        return item.count;
      });
    return (
        <div className="card">
                            <div class="card-header">
                                <h5 class="card-category">{this.props.title}</h5>
                            </div>
                                <div className="card-body">
      <Bar
        data={canvas => {
          const ctx = canvas.getContext("2d");
          var chartColor = "rgba(128, 182, 244, 0.1)";
          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, "#80b6f4");
          gradientStroke.addColorStop(1, chartColor);
          var gradientFill = ctx.createLinearGradient(0, 500, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.8)");
          
          return {
            labels: data_labels,
            datasets: [
              {
                label: this.props.label,
                borderColor: chartColor,
                pointBorderColor: chartColor,
                pointBackgroundColor: "rgba(128, 182, 244, 0.5)",
                pointHoverBackgroundColor: "#2c2c2c",
                pointHoverBorderColor: chartColor,
                pointBorderWidth: 1,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: data_items
              }
            ]
          };
        }}
        
      />
      
                  <Table responsive>
                    <thead className=" text-primary">
                      <tr>
                        <th>{this.props.tablelabel}</th>
                        <th className="text-right">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((data, key)=>{
                            return (
                                <tr key={key}>
                                    <td>{data.result==""?"Unknown":data.result}</td>
                                    <td className="text-right">{data.count}</td>
                                </tr>
                            )
                        })}
                      
                    </tbody>
                  </Table>
      </div>
      </div>
    );
  }
}

BarChart.propTypes = {
  // Where the user to be redirected on clicking the avatar
  data: PropTypes.object,
  label: PropTypes.string,
  title: PropTypes.string,
  tablelabel: PropTypes.string
};

export default BarChart;