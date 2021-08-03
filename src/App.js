import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchData } from "./redux/dataRobots"
import Home from "./pages/home"
import Details from "./pages/details"

import "antd/dist/antd.css"
import Header from "./components/header"

function App() {
  const dispatch = useDispatch()
  const [pagination, setPagination] = useState(true)

  useEffect(() => {
    const despachar = () => {
      dispatch(fetchData())
    }
    despachar()
  }, [dispatch])

  const actualView = pagination ? (
    <Home setPagination={setPagination} />
  ) : (
    <Details setPagination={setPagination} />
  )
  return (
    <div>
      <Header />
      <div className="container h-screen">{actualView}</div>
    </div>
  )
}

export default App
