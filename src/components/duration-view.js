import React from 'react'

import moment from 'moment'

const getDelta = target => target - new Date()

const DurationView = ({target})=> {
  const [delta, updateDelta] = React.useState(getDelta(target))

  React.useEffect(
    ()=>{
      const timer = window.setInterval(()=>{
        updateDelta(getDelta(target))
      }, 500)
      return ()=> {
        window.clearInterval(timer)
      }
    },
    [target],
  )
  const dur = moment.duration(delta)
  const expired = delta <= 0

  return <div>
    { !expired ?
     `${dur.hours()}:${dur.minutes()}:${dur.seconds()}`
      : <div className="expired">
        Time Expired
        <audio src="/alarm.mp3" autoPlay/>
      </div>
    }
  </div>
}

export default DurationView