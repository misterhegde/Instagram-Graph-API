import React, { Component } from "react";
import axios from "axios";
import ApexChart from "./Chart";
// import Chart from "react-google-charts";

class AudMetrics extends Component {
  constructor(props) {
    super(props);

    this.state = { ready: false };
  }

  componentDidMount() {
    this.getAudiencecityAudiencecountryAudiencegender = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=audience_city,audience_country,audience_gender_age&period=lifetime&access_token=${this.props.accessToken}`
        )
        .then(res => {
          let audiData = res.data.data;

          let results = audiData.map(a => {
            return a.values[0].value;
          });

          console.log("this should be values", results);

          const [item1, item2, item3] = results;
          this.setState({ item1, item2, item3, ready: true });

          console.log("this should be obj", item1, item2, item3);
        });
    };
  }

  render() {
    const stateCountry = this.state.item1;
    const genderAge = this.state.item3;
    const countryCode = this.state.item2;

    return (
      <div>
        <button
          className="btnmaterial"
          onClick={() =>
            this.getAudiencecityAudiencecountryAudiencegender(this.props)
          }
        >
          Audience city, Audience country, Audience gender
        </button>
        {/* <div className="text-info h1">
          {this.state.ready
            ? Object.entries(stateCountry).map(([key, value]) => (
                <p key={key}>
                  <span>{key}</span>===
                  <span>{value}</span>
                </p>
              ))
            : null}{" "}
        </div> */}

        {this.state.ready ? (
          <ApexChart
            series={Object.values(stateCountry)}
            categories={Object.keys(stateCountry)}
            title="Audience Demographics"
          />
        ) : // <Chart
        //   width={"500px"}
        //   height={"300px"}
        //   chartType="GeoChart"
        //   data={
        //     (["Country", "Popularity"],
        //     (Object.keys(stateCountry), Object.values(stateCountry)))
        //   }
        //   rootProps={{ "data-testid": "1" }}
        // />
        null}
        <br />

        {this.state.ready ? (
          <ApexChart
            series={Object.values(countryCode)}
            categories={Object.keys(countryCode)}
            title="country codes"
          />
        ) : null}
        <br />

        {this.state.ready ? (
          <ApexChart
            series={Object.values(genderAge)}
            categories={Object.keys(genderAge)}
            title="Age-Gender"
          />
        ) : null}
      </div>
    );
  }
}

export default AudMetrics;
