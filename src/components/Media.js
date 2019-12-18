import React, { Component } from "react";
import axios from "axios";

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrlArray: ""
    };
  }
  componentDidMount() {
    this.getPictures = props => {
      //console.log("props array received", props.mediaDataArray);
      let urls = [];

      for (var oneMedia of this.props.mediaDataArray) {
        axios
          .get(
            `https://graph.facebook.com/${oneMedia}?fields=media_url&access_token=${this.props.accessToken}`
          )
          .then(res => {
            let gettingThisPicture = res.data.media_url;
            urls.push(gettingThisPicture);
          });
      }
      this.setState({ imageUrlArray: urls }, () => {
        console.log("should be from state", this.state.pictures);
      });
    };
  }

  render() {
    if (this.state.imageUrlArray) {
      let imageUrlArray = this.state.imageUrlArray;
      const image = imageUrlArray.map(url => {
        return <img src={url} alt="post" />;
      });
    }
    return (
      <div>
        <button onClick={() => this.getPictures(this.props)}>
          click here to get pictures
        </button>
        {this.image}
      </div>
    );
  }
}

export default Media;
