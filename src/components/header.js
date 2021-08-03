import React from "react"
import { RobotOutlined } from "@ant-design/icons"

export default function Header() {
  return (
    <h1 className="p-2 text-2xl font-bold bg-red-600 text-white">
      <RobotOutlined
        style={{
          color: "white",
          fontSize: "32px",
          marginRight: "12px",
          fontWeight: "bold",
        }}
      />
      Army Robot
    </h1>
  )
}
