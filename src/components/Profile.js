import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    let { media_data } = this.props;
    console.log("this is from Profile:", media_data);
  }
  // getEachMediaInfo() {
  //   axios.get(
  //     `graph.facebook.com
  // /17895695668004550?fields=id,media_type,media_url,owner,timestamp`
  //   );
  // }
  render() {
    return <div></div>;
  }
}

export default Profile;
