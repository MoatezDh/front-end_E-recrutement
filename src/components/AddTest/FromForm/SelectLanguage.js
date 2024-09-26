import React from "react";
import { Form, Select } from 'antd'
const { Option } = Select;

export default function SelectLanguage() {
    const languageOptions = [
        { value: "Fr", label: "Français" },
        { value: "En", label: "Anglais" },
    ];
    return (


        <Form.Item
            label="Langue :"
            name="language"

            rules={[{ required: true, message: ' Veuillez sélectionner une langue!' }]}
        >
            <Select  size="large" placeholder=" Veuillez choisir une langue .">
                {languageOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>


    )
}