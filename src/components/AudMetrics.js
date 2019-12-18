import React, { Component } from "react";
import axios from "axios";

class AudMetrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audienceData: []
    };
  }
  componentDidMount() {
    this.getAudiencecityAudiencecountryAudiencegender = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=audience_city,audience_country,audience_gender_age,online_followers&period=lifetime&access_token=${this.props.accessToken}`
        )
        .then(res => {
          let audiData = res.data.data;

          this.setState({ audienceData: audiData });
          console.log(
            "this should be from audience graph",
            this.state.audienceData
          );
          console.log("this shold be audience database", res);

          let results = this.state.audienceData.map(a => {
            return a.values[0].value;
          });

          console.log("this should be values", results);

          const [item1, item2, item3] = results;

          console.log("this should be obj", item1, item2, item3);
          let something = Object.entries(item1);
          console.log("this should be something", something);
          // let tutu = item1.map(item => {
          //   return item;
          // });

          // const finalResult = results.forEach(element => {
          //   for (let iter in element) {
          //     console.log(`${iter} = ${element[iter]}`);
          //   }
          // });
          // console.log("this is final product", finalResult);
        });
    };
  }

  render() {
    // let res;
    // let fin;
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() =>
            this.getAudiencecityAudiencecountryAudiencegender(this.props)
          }
        >
          click here to get Audience city, Audience country, Audience gender
        </button>
        <div>
          <ul>
            <li>{this.finalResult}</li>
          </ul>
        </div>
        {/* <ul>
          {this.state.audienceData.map(item => {
            return (
              <div className="display-2 text-primary">
                <p>{item.title}</p>
              </div>
            );
          })}
        </ul> */}
      </div>
    );
  }
}

export default AudMetrics;
