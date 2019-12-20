import React, { Component } from "react";
import axios from "axios";

class MediaURLFetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrlArray: ""
    };
  }
  componentDidMount() {
    this.getPictures = props => {
      let urls = [];

      for (var oneMedia of this.props.mediaDataArray) {
        axios
          .get(
            `https://graph.facebook.com/${oneMedia}?fields=media_url&access_token=${this.props.accessToken}`
          )
          .then(res => {
            let gettingThisPicture = res.data;

            urls.push(gettingThisPicture);
            this.setState({ imageUrlArray: urls });
          });
      }

      console.log("imageurlarray", this.state.imageUrlArray);
    };
  }

  render() {
    return (
      <div>
        {this.state.imageUrlArray.length &&
          this.state.imageUrlArray.map(url => {
            return (
              <ul key={url.id}>
                <li>
                  <img
                    src={url.media_url}
                    alt="post"
                    width="400"
                    height="400"
                  />
                </li>
              </ul>
            );
          })}
        <button onClick={() => this.getPictures(this.props)}>
          click here to get pictures
        </button>
      </div>
    );
  }
}

export default MediaURLFetch;
