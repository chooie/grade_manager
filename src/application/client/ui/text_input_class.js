const React = require("./react.js");

const e = React.createElement;

module.exports = class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      correct: false,
      dirty: false
    };

    if (props.defaultState) {
      this.state = props.defaultState;
    }

    if (!props.validator) {
      throw new Error("You must pass a validator function");
    }
    if (!props.callback) {
      throw new Error("You must a pass a callback function");
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(state => {
      const newState = {
        value,
        dirty: true,
        correct: this.props.validator(value)
      };
      this.props.callback(newState);
      return newState;
    });
  }

  handleBlur(event) {
    if (this.props.callbackOnBlur) {
      this.props.callbackOnBlur(this.state);
    }
  }

  render() {
    return e("input", {
      className:
        this.props.className + " " + getClassDependingOnValidity(this.state),
      type: "text",
      placeholder: this.props.placeholder,
      value: this.state.value,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    });
  }
};

function getClassDependingOnValidity({ value, dirty, correct }) {
  if ((!dirty && value.length === 0) || !dirty) return "";

  if (correct) {
    return "valid";
  } else {
    return "error";
  }
}
