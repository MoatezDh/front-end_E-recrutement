import React from 'react';
import { UnorderedListOutlined} from '@ant-design/icons';
import { Button, message, Space} from 'antd';





export default function AddFromForm() {
  const info=()=>{ setTimeout(() => {
    message.info("Il est nécessaire que vous renseigniez les informations relatives à votre test.",6)
   }, 300);
  }
  return (
    
    <Space >
     
      <Button className="bouton" id='bouton2' onClick={info} >
        <div ><UnorderedListOutlined  className='icon'  /></div><br></br>
        <span id='text'> CRÉER À PARTIR  <br></br> D'UN FORMULAIRE </span>
      </Button>
    </Space>

  );
}

