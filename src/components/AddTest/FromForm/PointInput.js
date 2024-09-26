import React from "react";
import { Form, Input } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
export default function PointInput() {

    return (


        <Form.Item
            label="Point Total :" name="PointTotal"
            tooltip={{
                title: "Veuillez indiquer le nombre total de points de ce test. ",
                icon: <InfoCircleOutlined style={{ marginLeft: 210, color: "#6284FF", fontSize: "17px" }} />
            }}
          >
            <Input maxLength={3} type="Number" placeholder="Point Total"  />
        </Form.Item>

    ) 
}