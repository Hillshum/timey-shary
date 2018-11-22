import React from 'react'

import moment from 'moment'

const DurationView = ({target})=> {
  const [delta, updateDelta] = React.useState(0)

  React.useEffect(
    ()=>{
      const timer = window.setInterval(()=>{
        updateDelta(target - new Date())
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