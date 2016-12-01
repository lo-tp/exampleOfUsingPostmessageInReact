import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setScrollTop, setHeight } from './action';

class container extends Component {

  constructor(props) {
    super(props);
    this.msgHandler = this.msgHandler.bind(this);
    this.send = this.send.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.maxScrollTop = 10;
  }

  send() {
    if (this.container && this.container.contentWindow) {
      this.container.contentWindow.postMessage(this.data, '*');
      this.container.scrollTop = 20;
    }

    if (!this.received) {
      setTimeout(this.send, 100);
    }
  }

  componentDidMount() {
    this.previous = false;
    this.next = false;
    this.data = {
      url: this.props.content,
      type: 'setScroll',
      value: this.props.scrollTop,
    };
    this.send();
    this.reveived = false;
    window.addEventListener('message', this.msgHandler);
  }

  msgHandler(e) {
    if (e.data.url !== this.props.content) {
      // console.info(e.data.url);
      return;
    }

    switch (e.data.type) {
      case 'height':
        this.maxScrollTop = e.data.value - this.container.offsetHeight;
        this.received = true;
        break;
      case 'scrollTop':
        this.props.saveScroll(e.data.value);

        break;
    }
  }

  render() {
    return (
      <div
        className = 'group'
      >
        <h4 >
          {`Scroll Top:${this.props.scrollTop}`}
        </h4>
        <button
          onClick = {() => alert('wanna go to previous page?')}
          disabled={this.props.scrollTop !== 0}
        >
          Previous
        </button>
        <iframe
          ref = {e => {
            this.container = e;
          }}

          src = {this.props.content}
        />
        <button
          disabled={this.props.scrollTop < this.maxScrollTop}
            onClick = {() => alert('wanna go to next page?')}
        >
          Next
        </button>
      </div>
);
  }
}

container.propTypes = {
  scrollTop: PropTypes.number.isRequired,
  saveScroll: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

container.mapStateToProps = state => ({
  scrollTop: state.scrollTop,
  height: state.height,
  content: 'http://localhost:8080/one.html',
});

container.mapDispatchToProps = dispatch => ({
  saveScroll: num => {
    dispatch(setScrollTop(Math.round(num)));
  },

  saveHeight: num => {
    dispatch(setHeight(num));
  },
});

export default connect(container.mapStateToProps,
                       container.mapDispatchToProps,
                       container.mapMergeProps)(container);
