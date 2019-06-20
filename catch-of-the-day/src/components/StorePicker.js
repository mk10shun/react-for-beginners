import React from 'react';
import PropTypes from 'prop-types';

import {getFunName} from "../helpers";

class StorePicker extends React.Component {

  static propTypes = {
    history: PropTypes.object,
  };

  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <React.Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter a Store</h2>
          <button onClick={this.handleClick}>Click</button>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store </button>
        </form>
      </React.Fragment>
    )
  }
}

export default StorePicker;
