import React from "react";
import { Form,Input } from 'antd'


export default function DescriptionInput() {
    const { TextArea } = Input;
    const validateDescription = (_, value) => {
        if (value && !/^[a-zA-Z-]+$/.test(value)) {
          return Promise.reject('La description doit être alphabétique avec des tirets ("-")');
        }
        return Promise.resolve();
      };
    return (


        <Form.Item
            label="Description :"
            name="description"

            rules={[{ required: true, message: ' Veuillez saisir la description du test!' },
            { validator: validateDescription }]}
        >
             <TextArea rows={1} placeholder="Description du test" maxLength={600} />
            
        </Form.Item>

    )
}