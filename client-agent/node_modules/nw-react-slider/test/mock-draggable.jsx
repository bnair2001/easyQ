'use strict'
/*
react-draggable does not like jsdom
they supposedly 'fixed' the problem but instead of a missing SVGElement we now
get max call stack errors.

To simplify life, we just built a fake draggable which we swap in using mockery

This is a stateful component so that it may accept refs
*/
import React from 'react'

class MockDraggable extends React.Component {
  render () {
    return (<div>
      FAKE
    </div>)
  }
}

export default MockDraggable
