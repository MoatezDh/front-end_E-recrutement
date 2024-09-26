import React from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';



export default function AddFromDB() {



    return (

        <Space>
            <Button className="bouton" >
                <div><DatabaseOutlined  className='icon'   /></div><br></br>
                <span id='text'> CRÉER À PARTIR DE NOTRE  <br></br> BASE DE DONNÉES </span>
            </Button>
        </Space>

    );
}

