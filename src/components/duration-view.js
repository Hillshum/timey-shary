import React from 'react'

import moment from 'moment'

import MuteContext from '../api/mute-context'

const getDelta = target => target - new Date()

const DurationView = ({target})=> {
  const [delta, updateDelta] = React.useState(getDelta(target))
  const isMuted = React.useContext(MuteContext)

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

  return <div className="duration-view">
    { !expired ?
      <div className="remaining-time">
        {dur.hours()}:{dur.minutes()}:{dur.seconds()}
      </div>
      : <div className="expired">
        Time Expired
        {! isMuted && <audio src="/alarm.mp3" autoPlay/>}
      </div>
    }
  </div>
}

export default DurationView