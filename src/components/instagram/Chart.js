import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: this.props.series
        }
      ],
      options: {
        chart: {
          type: "bar",
          height: "auto",
          width: "200px",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        title: {
          text: this.props.title,
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px",
            color: "#263238"
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.props.categories
        }
      }
    };
  }

  handleClick = () => {
    this.setState({
      options: {
        ...this.state.options,
        plotOptions: {
          ...this.state.options.plotOptions,
          bar: {
            ...this.state.options.plotOptions.bar,
            horizontal: !this.state.options.plotOptions.bar.horizontal
          }
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={550}
          width="75%"
        />
        <button onClick={this.handleClick}>Toggle</button>
      </React.Fragment>
    );
  }
}

export default ApexChart;
