import React from 'react'

import {Button  } from "@material-ui/core";

const inputStyles = {
  fontFamily: 'monospace'
}


const CopyCode = ({code}) => {

  let inputRef = React.createRef()
  // From https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
  const copyToClipboard = str => {
    const selected =            
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    inputRef.current.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  }
  const url = `${process.env.PUBLIC_URL}/${code}`
  return <div className="copy-code">
    Share URL: <input readOnly value={url} style={inputStyles} ref={inputRef}/>
    <Button onClick={copyToClipboard}>Copy</Button>

  </div>
}

export default CopyCode