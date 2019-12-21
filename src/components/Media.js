import React, { Component } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class MediaURLFetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrlArray: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getPictures = props => {
      let urls = [];

      for (var oneMedia of this.props.mediaDataArray) {
        axios
          .get(
            `https://graph.facebook.com/${oneMedia}?fields=media_url,like_count,comments_count&access_token=${this.props.accessToken}`
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

  handleClick(e, props) {
    console.log(e.target.id);
    axios
      .get(
        `https://graph.facebook.com/${e.target.id}/insights?metric=engagement,impressions,reach,saved&period=lifetime&access_token=${this.props.accessToken}`
      )
      .then(res => {
        console.log("insights from this post", res.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log("Error code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  render() {
    return (
      <div>
        <div className="wholeroot">
          <GridList cellHeight={180} className="gridList">
            {this.state.imageUrlArray.length &&
              this.state.imageUrlArray.map(url => {
                return (
                  <GridListTile key={url.id}>
                    <img
                      src={url.media_url}
                      alt="post"
                      onClick={this.handleClick}
                      id={url.id}
                    />
                    <GridListTileBar
                      title={
                        <span className="text-info">
                          Likes: {url.like_count}
                        </span>
                      }
                      subtitle={
                        <span className="text-info">
                          Comments: {url.comments_count}
                        </span>
                      }
                    />
                  </GridListTile>
                );
              })}
          </GridList>
        </div>
        <button
          onClick={() => this.getPictures(this.props)}
          className="btnmaterial"
        >
          click here to get pictures
        </button>
      </div>
    );
  }
}

export default MediaURLFetch;
