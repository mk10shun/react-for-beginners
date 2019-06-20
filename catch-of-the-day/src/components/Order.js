import React from "react";
import PropTypes from 'prop-types';
import FishOnOrder from "./FishOnOrder";
import {formatPrice} from "../helpers";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  
  render() {
    const orderIds = Object.keys(this.props.order).filter((key) => key !== null);
    console.log(orderIds);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);


    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map((key) => (

              <FishOnOrder
                key={key}
                index={key}
                fishes={this.props.fishes}
                order={this.props.order}
                removeFromOrder={this.props.removeFromOrder}
              />
          )
          )}
        </ul>
        <div className="total">
          <strong>Total: {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
