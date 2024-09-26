import React,{useState} from 'react'
import { Switch,Form } from 'antd';
export default function SwitchButton(props) {
    const [CorrectAnswer, setCorrectAnswer] = useState();
    //  console.log("CorrectAnswer",CorrectAnswer)
  const handleChange = (checked) => {
    if (checked) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };
   
const {answer}=props
  return (
    <div>
         <Form.Item name={[answer.name, "CorrectAnswer"]} >
    
    
      <Switch
        checked={CorrectAnswer}
        style={{
          
          backgroundColor:CorrectAnswer ? "#0B984F" : "#C31818",
          opacity: 0.7,
          fontSize: 15,
        }}
        onChange={handleChange}
        
      />
  </Form.Item>

</div>
  )
}
