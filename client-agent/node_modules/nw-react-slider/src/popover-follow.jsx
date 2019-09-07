var React = require('react')
var ReactDOM = require('react-dom')
var isUndefined = require('lodash/isUndefined')

module.exports = React.createClass({
  displayName: 'popover-follow',

  propTypes: {
    position: React.PropTypes.number,
    value: React.PropTypes.number,
    trackWidth: React.PropTypes.number,
    handleWidth: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      position: 0,
      value: 0,
      trackWidth: 0
    }
  },

  getInitialState: function () {
    return {
      arrowPosition: undefined,
      bubblePosition: undefined,
      popoverWidth: 0,
      arrowWidth: 0
    }
  },

  componentDidMount: function () {
    this.updatePopoverAndArrowWidth()
    window.addEventListener('resize', () => {
      this.updatePopoverAndArrowWidth()
    })
  },

  setPosition: function (props = this.props) {
    var trackWidth = this.props.trackWidth
    if (this.props.handleWidth) {
      trackWidth += this.props.handleWidth
    }
    var spaceArrowShouldMove = this.state.popoverWidth / 2 - this.state.arrowWidth

    if (props.position >= spaceArrowShouldMove && props.position <= (this.props.trackWidth - spaceArrowShouldMove)) {
      // Middle of the slider where the popover is completely inside the width of the slider
      this.setState({ bubblePosition: props.position, arrowPosition: spaceArrowShouldMove })
    } else if (props.position < spaceArrowShouldMove) {
      // Left section of the slider
      this.setState({ arrowPosition: (props.position), bubblePosition: (spaceArrowShouldMove) })
    } else if (props.position > (this.props.trackWidth - spaceArrowShouldMove)) {
      // Right section of the slider
      this.setState({ arrowPosition: (props.position - 2 * spaceArrowShouldMove), bubblePosition: trackWidth - spaceArrowShouldMove - this.props.handleWidth })
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setPosition(nextProps)
  },

  updatePopoverAndArrowWidth: function () {
    var popover = ReactDOM.findDOMNode(this.refs.popover)
    if (!popover) {
      return
    }
    var popoverWidth = popover.offsetWidth
    var arrowWidth = ReactDOM.findDOMNode(this.refs.popover).getElementsByClassName('arrow').length > 0 ? ReactDOM.findDOMNode(this.refs.popover).getElementsByClassName('arrow')[0].offsetWidth : 12
    this.setState({popoverWidth, arrowWidth}, this.setPosition)
  },

  render: function () {
    var styles = {}
    if (isUndefined(this.state.arrowPosition) || isUndefined(this.state.bubblePosition)) {
      styles = {visibility: 'hidden'}
    }
    var popoverStyle = {
      display: 'block',
      left: this.state.bubblePosition
    }
    var arrowStyle = {
      left: this.state.arrowPosition
    }
    return (
      <div style={styles} ref='container' className='popover-container'>
        <div role='tooltip' ref='popover' className='popover' style={popoverStyle}>
          <div className='popover__arrow' style={arrowStyle}></div>
          <div className='popover__content'>
            { this.props.value }
          </div>
        </div>
      </div>
    )
  }
})
