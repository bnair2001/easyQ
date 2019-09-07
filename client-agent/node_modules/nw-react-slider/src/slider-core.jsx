var React = require('react')
var ReactDOM = require('react-dom')
var isFunction = require('lodash/isFunction')
var Draggable = require('react-draggable')
var isUndefined = require('lodash/isUndefined')
var throttle = require('lodash/throttle')

module.exports = React.createClass({
  displayName: 'core-slider',

  propTypes: {
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    ticks: React.PropTypes.bool,
    triggerOnChangeWhileDragging: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    markerLabel: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      value: 0,
      min: 0,
      max: 10,
      ticks: false,
      triggerOnChangeWhileDragging: true
    }
  },

  getInitialState: function () {
    return {
      position: undefined,
      value: this.props.value,
      dragging: false
    }
  },

  componentWillReceiveProps: function (nextProps, nextState) {
    var newValue

    // keep state up to date with passed in props
    if (this.state.value !== nextProps.value) {
      newValue = this.getBoundValue(nextProps, nextProps.value)
      this.setState({value: newValue})
      this.setHandlePosition(nextProps, newValue)
    }

    // if min or max changes, have to reposition the handle
    if (this.props.min !== nextProps.min || this.props.max !== nextProps.max) {
      newValue = this.getBoundValue(nextProps, newValue || this.state.value)
      this.setState({value: newValue})
      this.setHandlePosition(nextProps, newValue)
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // Don't alter the component while dragging is occurring
    return (!nextState.dragging)
  },

  componentDidMount: function () {
    this.updateTrackWidth()
    this.updateTrackWidth = throttle(this.updateTrackWidth, 100, {leading: false})
    window.addEventListener('resize', this.updateTrackWidth)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.updateTrackWidth)
  },

  getBoundValue: function (props, value) {
    var newValue = value
    if (newValue < props.min) {
      newValue = props.min
    } else if (newValue > props.max) {
      newValue = props.max
    }
    return newValue
  },

  updateTrackWidth: function () {
    var track = ReactDOM.findDOMNode(this.refs.track)
    if (!track) {
      return
    }
    var trackWidth = track.offsetWidth
    this.setState({trackWidth}, this.setHandlePosition)
  },

  componentDidUpdate: function () {
    // after a render, ensure that draggable is in correct position
    this.refs.drag && this.refs.drag.setState({clientX: this.state.position})
  },

  setHandlePosition: function (props = this.props, value = this.state.value) {
    var position = this.state.trackWidth / (props.max - props.min) * (value - props.min)
    this.setState({position})
  },

  updateValueFromPosition: function (newPosition) {
    var currentPosition = newPosition
    var value, position
    if (this.props.max === this.props.min) {
      value = this.props.min
      position = this.state.trackWidth / 2
    } else {
      // find the two closest ticks to the current position
      var currentPercent = currentPosition / this.state.trackWidth * 100
      var percentStep = 100 / (this.props.max - this.props.min)
      var closestSmallerValue = Math.floor(currentPercent / percentStep)
      var closestLargerValue = closestSmallerValue + 1
      var bestMatchPercent, bestMatchTick

      // determine which of the two values is closest
      if (currentPercent - (closestSmallerValue * percentStep) <= (closestLargerValue * percentStep) - currentPercent) {
        bestMatchTick = closestSmallerValue
        bestMatchPercent = bestMatchTick * percentStep
      } else {
        bestMatchTick = closestLargerValue
        bestMatchPercent = bestMatchTick * percentStep
      }

      // update the value and position
      value = this.props.min + bestMatchTick
      position = this.state.trackWidth * (bestMatchPercent / 100)
    }

    // Although set state is async, pushing its invocation as late as possible
    this.setState({value, position})

    return {
      value,
      position
    }
  },

  cumulativeOffset: function (element) {
    // determine the overall offset of the element by crawling up the DOM, borrowed from Prototype.js
    var top = 0
    var left = 0
    do {
      top += element.offsetTop || 0
      left += element.offsetLeft || 0
      element = element.offsetParent
    } while (element)

    return {
      top: top,
      left: left
    }
  },

  triggerOnChange: function (pos) {
    const { value, position } = this.updateValueFromPosition(pos)

    if (isFunction(this.props.onChange)) {
      this.props.onChange(value, position)
    }
  },

  clickOnTrack: function (event) {
    var clickFromLeft = event.clientX - this.cumulativeOffset(event.target).left
    this.triggerOnChange(clickFromLeft)
  },

  handleUp: function (event, ui) {
    const pos = this.refs.drag.state.clientX || 0
    const { position } = this.updateValueFromPosition(pos)
    // Do we have a drag end hook ?
    if (isFunction(this.props.onDragEnd)) {
      this.props.onDragEnd(position)
    }

    this.setState({dragging: false})
    this.triggerOnChange(position)
  },

  handleDown: function (event, ui) {
    // Do we have a drag start hook ?
    if (isFunction(this.props.onDragStart)) {
      this.props.onDragStart(this.state.position)
    }

    this.setState({dragging: true})
  },

  dragging: function (event, ui) {
    var pos = this.refs.drag.state.clientX || 0

    // Do we want to trigger change handlers while dragging ?
    if (this.props.triggerOnChangeWhileDragging) {
      this.triggerOnChange(pos)
    }

    event.preventDefault()
  },

  renderTicks: function () {
    if (!this.props.ticks) return (<span/>)
    var elements = []
    var min = this.props.min
    var max = this.props.max
    var percentStep = 100 / (max - min)
    // Don't render ticks if it is too high. Will crash the browser and the ticks become useless
    if ((max - min) < 200) {
      for (var i = min + 1; i < max; i++) {
        var style = {
          left: (percentStep * (i - min)) + '%'
        }
        elements.push(<span key={ 'tick' + i } className='slider__tick' style={ style } />)
      }
    }
    return (
      <div key='ticks' className='slider__ticks' onClick={ this.clickOnTrack }>{ elements }</div>
    )
  },

  renderMarkers: function () {
    if (!this.props.markerLabel) return (<span/>)
    var elements = []
    var { min, max, markerLabel: markers } = this.props
    var percentStep = 100 / (max - min)
    for (var i in markers) {
      var style = {
        left: (percentStep * (markers[i].value - min)) + '%'
      }
      if (markers[i].value <= max && markers[i].value >= min) {
        if (this.props.ticks && (max - min < 200)) {
          // don't render a tick for this marker if ticks are already being rendered
          elements.push(<div key={ 'marker' + i } className='slider__marker marker' style={ style }><p className='marker__label'>{ markers[i].label }</p></div>)
        } else {
          elements.push(<div key={ 'marker' + i } className='slider__marker marker' style={ style }><p className='marker__label'>{ markers[i].label }</p><span key={ 'marker' + markers[i].value } className='slider__tick slider__tick--marker' /></div>)
        }
      }
    }
    return (
      <div key='markers' className='slider__markers' onClick={ this.clickOnTrack }>{ elements }</div>
    )
  },

  render: function () {
    var draggableProps, draggable

    if (!isUndefined(this.state.position)) {
      draggableProps = {
        axis: 'x',
        handle: '.slider__handle',
        bounds: {left: 0, right: this.state.trackWidth},
        start: {x: this.state.position, y: 0},
        onStop: this.handleUp,
        onStart: this.handleDown,
        onDrag: this.dragging
      }
      draggable = (
        <Draggable ref='drag' key='draggable' { ...draggableProps }>
          <span ref='handle' className='slider__handle'/>
        </Draggable>
      )
    }

    return (
      <div ref='slider' className='slider'>
        { draggable }
        <div ref='track' className='slider__track' onClick={ this.clickOnTrack }>
          { this.renderTicks() }
          { this.renderMarkers() }
        </div>
      </div>
    )
  }
})
