import React from "react";
import {formatPrice} from "../helpers";

class FishOnOrder extends React.Component {
  handleClick = (key) => {
    this.props.removeFromOrder(key);
  };

  render() {
    const fish = this.props.fishes[this.props.index];
    const count = this.props.order[this.props.index];
    const isAvailable = fish && fish.status === 'available';

    if(!fish){
      return null;
    }
    if(!isAvailable) {
      return <li key={this.props.index}>Sorry {fish ? fish.name : 'fish' } is no longer available</li>
    }
    return (
      <li key={this.props.index}>
        {count} lbs {fish.name}: {formatPrice(count * fish.price)}
        <a onClick={() => this.handleClick(this.props.index)}>x</a>
        {console.log(this.props.order)}
      </li>
    );
  }
}

export default FishOnOrder;
