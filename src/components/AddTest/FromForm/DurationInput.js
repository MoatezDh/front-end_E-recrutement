import React from "react";
import { Form, Input } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
export default function DurationInput() {

    return (



        <Form.Item label="Durée totale : " name="TotalDuration"
            tooltip={{
                title: "Veuillez préciser la durée maximale autorisée pour répondre à ce test en utilisant le format( heure:minute:seconde).",
                icon: <InfoCircleOutlined id="infocercle" style={{ marginLeft: 40, color: "#6284FF", fontSize: "17px" }} />
            }} 
            >

            <Input placeholder="En minutes" type="number" step="1" style={{width
            :"100%"}} />
        </Form.Item>


    )
}