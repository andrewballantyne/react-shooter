  // the main credits scrolling
import React, { Component, PropTypes } from 'react';

const BASE_STYLE = {
  position: 'absolute',
  left: '0',
  right: '0',
  margin: '0 auto',
  fontSize: '24px',
  textAlign: 'center',
};

const BUTTON_STYLE = {
  width: '200px',
  height: '50px',
};

const TWO_PI = 2 * Math.PI;

export default class Credits extends Component
{
  static MAX_TICKS = 240;
  static MAX_HEIGHT = 200;
  static contextTypes = {
    loop: PropTypes.object,
  };
  static propTypes = {
    onMainMenu: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      tick: 1,
      red: 8,
      blue: 32,
      green: 128,
    };
  }

  update = () => {
    const tick = (this.state.tick + 1) % Credits.MAX_TICKS;
    const ratio = (tick * TWO_PI) / Credits.MAX_TICKS;
    this.setState({
      tick,
      red: (this.state.red + 1) % 256,
      blue: (this.state.blue + 1) % 256,
      green: (this.state.green + 1) % 256,
      height: Math.sin(ratio) * Credits.MAX_HEIGHT + Credits.MAX_HEIGHT,
    });
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  render() {
    const { red, blue, green, height } = this.state;
    const containerStyle = {
      ...BASE_STYLE,
      top: height + 'px',
    };
    const textStyle = {
      color: `rgba(${red}, ${blue}, ${green}, 1.0)`,
    };
    return (
      <div style={ containerStyle }>
        <p style={ textStyle }>
          Made by Dan and Andrew
        </p>
        <p>
          <button type="button" style={ BUTTON_STYLE } onClick={ this.props.onMainMenu }>
            Back to Main Main
          </button>
        </p>
      </div>
    );
  }
}