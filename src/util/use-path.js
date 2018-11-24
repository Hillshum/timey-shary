import React from 'react'


const usePath = () => {

  const initialPath = window.location.pathname.substr(1)

  const [path, setPath] = React.useState(initialPath)

  const changePath = path =>{
    window.history.pushState({}, path, `/${path}`)
    setPath(path)
  }

  React.useEffect(
    ()=>{
      window.onhashchange = ()=>{
        setPath(window.location.pathname.substr(1))
      }
      return ()=> {window.onhashchange = null}
    },
    [],
  )

  return [path, changePath]
}


export default usePath