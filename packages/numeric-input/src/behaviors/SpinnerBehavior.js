import { Component } from "react";
import PropTypes from "prop-types";

export default class SpinnerBehavior extends Component {
  static propTypes = {
    children: PropTypes.func,
    onChange: PropTypes.func,
    onMouseLeave: PropTypes.func,
    value: PropTypes.number,
    initialValue: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    step: 1,
    initialValue: 0,
    value: undefined,
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue
    };

    this.timer = null;
    this.timerSet = false;
    this.inputRef = null;
  }

  onDirectChange = event => {
    const newValue = event.target.value;
    this.setValue(newValue);
  };

  getValue() {
    if (this.props.value !== undefined && this.props.value !== null) {
      return this.props.value;
    }
    return this.state.value;
  }
  setValue = value => {
    this.props.onChange(value);

    if (!this.isValueControlled()) {
      this.setState({ value });
    }
  };

  setInputRef = element => {
    this.inputRef = element;
  };

  updateValue = value => {
    // Do nothing if the input is currently disabled
    if (this.props.disabled) {
      return;
    }
    this.setValue(value);
    this.inputRef.focus();
  };

  isValueControlled = () =>
    this.props.value !== undefined && this.props.value !== null;

  increment = () => {
    this.updateValue(Number(this.getValue()) + this.props.step);
  };

  decrement = () => {
    this.updateValue(Number(this.getValue()) - this.props.step);
  };

  mouseDownIncrement = () => {
    if (!this.timerSet) {
      this.timer = setInterval(() => {
        this.increment();
      }, 150);
      this.timerSet = true;
    }
  };

  mouseDownDecrement = () => {
    if (!this.timerSet) {
      this.timer = setInterval(() => {
        this.decrement();
      }, 150);
      this.timerSet = true;
    }
  };

  clearTimer = () => {
    clearInterval(this.timer);
    this.timerSet = false;
  };

  mouseLeaveClearTimer = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    this.clearTimer();
  };

  render() {
    return this.props.children({
      onDirectChange: this.onDirectChange,
      increment: this.increment,
      decrement: this.decrement,
      value: this.getValue(),
      mouseDownDecrement: this.mouseDownDecrement,
      mouseDownIncrement: this.mouseDownIncrement,
      clearTimer: this.clearTimer,
      mouseLeaveClearTimer: this.mouseLeaveClearTimer,
      setInputRef: this.setInputRef
    });
  }
}
