import React from "react";
import { Form, Input } from 'antd'

export default function NumberDays() {

    return (


        <Form.Item
      
            label="Nombre de jours au boot dequels une invitation expire : "
            name="NumberDays"
        >
            <Input  maxLength={2}  type="number"  />


        </Form.Item>

    )
}