import React from "react";
import { Form, Select } from 'antd'
const { Option } = Select;

export default function SelectExperience() {
    const experienceOptions = [
        { label: 'Junior', value: 'junior' },
        { label: 'Senior', value: 'senior' },
        { label: 'Expert', value: 'expert' },
    ];
    return (


        <Form.Item
            label="Expérience :"
            name="Experience"
            rules={[{ required: true, message: ' Veuillez sélectionner une expérience.' }]}
        >
            <Select  size="large" placeholder="Veuillez choisir une expérience.">
                {experienceOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>

    )
}