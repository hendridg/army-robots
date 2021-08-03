import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import {
  Spin,
  Form,
  Input,
  Image,
  InputNumber,
  Button,
  notification,
} from "antd"
import { EditOutlined, LeftOutlined, DeleteOutlined } from "@ant-design/icons"
import "../App.css"

import "antd/dist/antd.css"

export default function Details({ setPagination }) {
  const robots = useSelector((state) => state.robots)
  const idRobot = useSelector((state) => state.idRobot)
  const [allData, setAllData] = useState([])
  const [disableSave, setDisableSave] = useState(false)
  const [disableDelete, setDisableDelete] = useState(false)

  const [form] = Form.useForm()

  const onFinish = (values) => {
    setDisableSave(true)
    fetch(`http://dummy.restapiexample.com/api/v1/update/${idRobot}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        openNotification(data)
        setDisableSave(false)
      })
      .catch((error) => {
        openNotification(error)
        setDisableSave(false)
      })
  }

  const onDelete = () => {
    setDisableDelete(true)
    fetch(`http://dummy.restapiexample.com/api/v1/delete/${idRobot}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setDisableDelete(false)
        openNotification(data)
        clearForm()
      })
      .catch((error) => {
        openNotification(error)
        setDisableDelete(false)
      })
  }

  const openNotification = (data) => {
    notification.open({
      message: `Status: ${data.status}`,
      description: data.message,
    })
  }

  const clearForm = () => {
    form.setFieldsValue({
      employee_name: "",
      employee_salary: "",
      employee_age: "",
    })
  }

  useEffect(() => {
    if (robots) {
      const datosWithKey = robots.map((data) => {
        data.key = data.id
        return data
      })
      setAllData(datosWithKey)
    }
  }, [robots])

  useEffect(() => {
    const onFill = () => {
      if (robots) {
        form.setFieldsValue({
          employee_name: robots[idRobot - 1].employee_name,
          employee_salary: robots[idRobot - 1].employee_salary,
          employee_age: robots[idRobot - 1].employee_age,
        })
      }
    }
    onFill()
  }, [robots, idRobot, form])

  return (
    <div className="flex flex-col w-11/12 bg-gray-100 rounded-2xl md:flex-row md:space-y-0 container border shadow-md space-y-4 h-max md:w-6/12 mx-auto">
      {allData.length ? (
        <>
          <div className="container w-3/12 mr-2">
            <Image
              className=""
              width={200}
              src={`https://robohash.org/${allData[idRobot - 1].employee_name}`}
            />
          </div>
          <div className="container w-8/12 p-4 md:ml-8">
            <Form
              name="control-hooks"
              layout="vertical"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item className="font-bold" label="Id">
                <InputNumber value={allData[idRobot - 1].id} disabled />
              </Form.Item>

              <Form.Item
                name="employee_name"
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Salary"
                name="employee_salary"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Age"
                name="employee_age"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item>
                <div className="flex flex-row justify-between align-middle">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<EditOutlined />}
                    disabled={disableSave}
                  >
                    Save
                  </Button>

                  <Button
                    type="secundary"
                    onClick={onDelete}
                    icon={<DeleteOutlined />}
                    disabled={disableDelete}
                  >
                    Delete
                  </Button>

                  <Button
                    type="link"
                    onClick={() => setPagination(true)}
                    icon={<LeftOutlined />}
                  >
                    Back
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  )
}
