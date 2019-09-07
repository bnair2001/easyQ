/* global describe, it */
'use strict'
/**
Tests for <Slider> (src/slider.jsx)
*/

import React from 'react'
import { mount } from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
/* We use mockery to substitute mock-draggable for react0-draggable to avoid
pain of react-draggable beign incompatible with jsdom */
import mockery from 'mockery'
import MockDraggable from './mock-draggable.jsx'

(function setUpMockery () {
  mockery.enable({
    warnOnUnregistered: false
  })
  mockery.registerMock('react-draggable', MockDraggable)
})()

describe('<Slider/>', function () {
  /* We require slider instead of importing it because mockery didn't seem
  to work with imports (this might be resolved with more research) */
  const Slider = require('../src/slider.jsx')

  describe('handleSliderChange', function () {
    it('should call props.onChange if it is a function', function () {
      const onChangeStub = sinon.stub()
      const wrapper = mount(<Slider
        onChange={onChangeStub}
        />)
      wrapper.instance().handleSliderChange(10, 10)
      expect(onChangeStub.callCount).to.equal(1)
      wrapper.instance().handleSliderChange(11, 11)
      expect(onChangeStub.callCount).to.equal(2)
    })

    it('should call setState with current position', function () {
      const wrapper = mount(<Slider/>)
      const sliderInstance = wrapper.instance()
      const setStateSpy = sinon.spy(sliderInstance, 'setState')
      sliderInstance.handleSliderChange(5, 12)
      expect(setStateSpy.callCount).to.equal(1)
      expect(setStateSpy.args[0]).to.eql([{
        rtPosition: 12
      }])
    })
  })
})
