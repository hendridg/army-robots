import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { index } from "../redux/dataRobots"

import Fuse from "fuse.js"
import { Button, Input, Slider, Table, Divider, Tag } from "antd"
import { ClearOutlined } from "@ant-design/icons"
import "antd/dist/antd.css"
import { loadArray } from "../utils"
import "../App.css"

export default function Home({ setPagination }) {
  const robots = useSelector((state) => state.robots)
  const dispatch = useDispatch()
  const [age, setAge] = useState(null)
  const [salary, setSalary] = useState(null)

  const [query, setQuery] = useState("")
  const [rangeAge, setRangeAge] = useState([0, 0])
  const [rangeSalary, setRangeSalary] = useState([0, 0])
  const [allData, setAllData] = useState([])

  useEffect(() => {
    if (robots) {
      const datosWithKey = robots.map((data) => {
        data.key = data.id
        return data
      })
      setAllData(datosWithKey)
    }
  }, [robots])

  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",

      render: (text) => (
        <Button
          type="link"
          onClick={() => {
            dispatch(index(parseInt(text)))
            setPagination(false)
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Age",
      dataIndex: "employee_age",
      key: "employee_age",
    },
    {
      title: "Salary",
      dataIndex: "employee_salary",
      key: "employee_salary",
    },
  ]

  const columnsMobile = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",

      render: (text) => (
        <Button
          type="link"
          onClick={() => {
            setPagination(false)
            dispatch(index(parseInt(text)))
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Age",
      dataIndex: "employee_age",
      key: "employee_age",
    },
  ]

  const onClearFilter = () => {
    setQuery("")
    if (age && salary) {
      setRangeAge([age[0], age.slice(-1)])
      setRangeSalary([salary[0], salary.slice(-1)])
    }
  }

  useEffect(() => {
    setAge(loadArray(allData, "employee_age"))
    setSalary(loadArray(allData, "employee_salary"))
  }, [allData])

  const fuse = new Fuse(allData, {
    keys: ["employee_name", "employee_age", "employee_salary"],
    includeScore: true,
  })

  const results = fuse.search(query)
  const dataResults2 = query ? results.map((robot) => robot.item) : allData
  const dataResults = dataResults2
    ? dataResults2.filter(
        (item) =>
          item.employee_age >= rangeAge[0] &&
          item.employee_age <= rangeAge[1] &&
          item.employee_salary >= rangeSalary[0] &&
          item.employee_salary <= rangeSalary[1]
      )
    : allData

  function detectMob() {
    return window.innerWidth <= 600 && window.innerHeight <= 800
  }

  const tableRobot = detectMob() ? (
    <Table
      className="font-bold"
      columns={columnsMobile}
      dataSource={dataResults}
    />
  ) : (
    <Table className="font-bold" columns={columns} dataSource={dataResults} />
  )

  return (
    <>
      <div className="flex flex-col my-10 md:flex-row md:space-y-0 container space-y-4 h-max w-10/12 m-auto">
        <div className="container w-35 p-4 pt-6 bg-gray-100 rounded-lg border shadow-md">
          <Divider orientation="left" plain>
            <span className="text-red-600 font-bold">Search by Name</span>
          </Divider>
          <Input
            placeholder="search robot"
            value={query}
            onChange={({ target }) => {
              setQuery(target.value)
            }}
          />

          {age ? (
            <>
              <Divider orientation="left" plain>
                <span className="text-red-600 font-bold">Search by Ages</span>
              </Divider>
              <Slider
                range
                defaultValue={[age[0], age.slice(-1)]}
                min={age[0]}
                max={age.slice(-1)}
                onChange={(value) => setRangeAge(value)}
              />
              <Tag color="blue">{`${rangeAge[0]} year - ${rangeAge[1]} year`}</Tag>
            </>
          ) : null}

          {salary ? (
            <>
              <Divider orientation="left" plain>
                <span className="text-red-600 font-bold">Search by Salary</span>
              </Divider>
              <Slider
                range
                step={10}
                defaultValue={[salary[0], salary.slice(-1)]}
                min={salary[0]}
                max={salary.slice(-1)}
                onChange={(value) => setRangeSalary(value)}
              />
              <div className="flex align-top justify-between">
                <Tag color="green">{`$${Intl.NumberFormat().format(
                  rangeSalary[0]
                )} - $${Intl.NumberFormat().format(rangeSalary[1])}`}</Tag>
                <Button
                  type="primary"
                  shape="border"
                  icon={<ClearOutlined />}
                  onClick={onClearFilter}
                >
                  {" "}
                  Clear filter
                </Button>
              </div>
            </>
          ) : null}
        </div>
        <div className="container w-35 bg-gray-100 rounded-lg border shadow-lg md:ml-2">
          {tableRobot}
        </div>
      </div>
    </>
  )
}
