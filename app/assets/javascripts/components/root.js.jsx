import { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

// actions

const ACTION_INCREMENT_COUNTER = {
  type: 'ACTION_INCREMENT_COUNTER',
  count: 1
};

const ACTION_DECREMENT_COUNTER = {
  type: 'ACTION_DECREMENT_COUNTER',
  count: -1
};

// Reducer

const counterReducer = (state = {count: 0}, action) => {
  const count = state.count;
  switch (action.type) {
    case 'ACTION_INCREMENT_COUNTER':
      return { count: count + action.count }
    case 'ACTION_DECREMENT_COUNTER':
      return { count: count + action.count }
    default:
      return state;
  }
};

// Component

class Counter extends Component {

  render() {
    const {count, handleIncrement, handleDecrement} = this.props;
    
    return (
      <div>
        <p><span>Count: {count}</span></p>
        <div>
          <button onClick={handleIncrement}>+1</button>
          <button onClick={handleDecrement}>-1</button>
        </div>
      </div>
    );
  }

}

Counter.PropTypes = {
  count: PropTypes.number.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired
};

// Container

const mapStateToPropsContainer = (state) => {
  return {
    count: state.count
  };
};

const mapDispatchToPropsContainer = (dispatch) => {
  return {
    handleIncrement: () => {
      dispatch(ACTION_INCREMENT_COUNTER);
    },
    handleDecrement: () => {
      dispatch(ACTION_DECREMENT_COUNTER);
    }
  };
};

const App = connect(
  mapStateToPropsContainer,
  mapDispatchToPropsContainer
)(Counter);


const store = createStore(
  counterReducer,
  applyMiddleware(thunk, promise, createLogger())
);

class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
  
}

export default Root;
