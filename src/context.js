import React, { Component } from "react";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    mediaId: []
  };

  setMediaState = media_data => {
    this.setState(
      () => {
        return { mediaId: media_data };
      },
      () => {
        console.log("Set State Complete");
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setMediaState: this.setMediaState
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
