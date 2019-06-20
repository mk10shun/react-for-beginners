import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3. Set the new fishes object to state
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    console.log('i am updating the fish now', fishes[key]);
    fishes[key] = updatedFish;
    console.log(fishes);
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //1. Take a copy of state
    const order = { ...this.state.order };
    //2. Either add to order or update the number in our order
    order[key] = order[key] + 1 || 1;
    //3. Call setState to update our state object
    this.setState({ order });
    console.log(order);
  };

  //This is my test code
  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove it
    delete order[key];

    // 3. Call setState
    this.setState({ order });
  };

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };

    // 2. update the state
    fishes[key] = null;

    // 3. update state
    this.setState({fishes});
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className="menu">
          <Header tagline="Food Food"/>
          <ul className="fishes">
            { Object.keys(this.state.fishes)
              .map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />)
              )
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;
