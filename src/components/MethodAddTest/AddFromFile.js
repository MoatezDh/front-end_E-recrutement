import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';


export default function AddFromFile() {

  return (

    <Space>
      <Button className="bouton" id='bouton1' >
        <div><LaptopOutlined  className='icon'  /></div><br></br>
        <span id='text'> TÉLÉCHARGER À PARTIR   <br></br>VOTRE UNIVER  </span>
      </Button>
    </Space>


  );
}


