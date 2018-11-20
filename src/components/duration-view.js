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

  return <div>
    { delta > 0 ?
     `${dur.hours()}:${dur.minutes()}:${dur.seconds()}`
      : 'Time Expired'
    }
  </div>
}

export default DurationView