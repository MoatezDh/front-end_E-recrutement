import React from "react";
import { Form, Input } from 'antd'


export default function TitleInput() {
    const validateTitle = (_, value) => {
        if (value && !/^[a-zA-Z-]+$/.test(value)) {
          return Promise.reject('Le titre doit être alphabétique avec des tirets ("-")');
        }
        return Promise.resolve();
      };

    return (



        <Form.Item
              
            label="Titre :"
            name="title"
               
            rules={[{ required: true, message: ' Veuillez saisir le titre du test!' },
            { validator: validateTitle }]}
           
            // requiredMark={false}
           
            >
            <Input maxLength={100} placeholder='Titre du test'   />
        </Form.Item>


    )

}