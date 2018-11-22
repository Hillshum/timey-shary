import React from 'react'
import moment from 'moment'
import {Button } from '@material-ui/core'

import ArrowEdit from './arrow-edit'

const TimeEdit = ({remaining, onChange}) => {
  if (remaining < 0 ) {
    onChange(0)
    return null
  }
  const dur = moment.duration(remaining)

  const changeUnit = (val, unit)=> {
    dur.subtract(dur.get(unit), unit)
    dur.add(Number(val), unit)
    onChange(Math.max(dur.asMilliseconds(), 0))
  }
  return <div className="timer-edit">
    <ArrowEdit val={dur.hours()} onChange={val=>changeUnit(val, 'h')}/>
    <ArrowEdit val={dur.minutes()} onChange={val=>changeUnit(val, 'm')}/>
    <ArrowEdit val={dur.seconds()} onChange={val=>changeUnit(val, 's')}/>
    <Button onClick={()=>onChange(0)}>Reset</Button>
  </div>
}

export default TimeEdit