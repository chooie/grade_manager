const React = require("./react.js");
const ReactDOM = require("./react-dom.js");

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return e("p", null, "You liked this.");
    }

    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

exports.setup = function setup() {
  ReactDOM.render(
    React.createElement(LikeButton),
    document.querySelector("#app-container")
  );
};

exports.isTrue = function isTrue() {
  return true;
};
