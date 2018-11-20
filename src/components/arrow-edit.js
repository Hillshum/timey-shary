import React from 'react'

import {IconButton } from '@material-ui/core'
import {ExpandLess, ExpandMore} from '@material-ui/icons'


const ArrowEdit = ({val, onChange})=> {

  return <div className="arrow-edit">
    <IconButton onClick={()=>onChange(val + 1)}><ExpandLess/></IconButton>
    <input type="text" value={val} onChange={({target: {value}})=>onChange(value)}/>
    <IconButton onClick={()=>onChange(Math.max(val - 1), 0)}><ExpandMore/></IconButton>
  </div>
}


export default ArrowEdit