import React,{useEffect, useState} from 'react'
import { Form, Input } from 'antd'

export default function AnswersList({question,setSelectedAnswers}) {
  const { TextArea } = Input;
  const answers=question.answers;

  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [champpLibre,setChamppLibre]=useState("")
  console.log("champpLibre",champpLibre)
  const handleChampLibreChange = (e,question) => {
    setChamppLibre([question,e.target.value]);
  };
  useEffect(() => {
    if (champpLibre) {
      setSelectedAnswer(champpLibre);
      setSelectedAnswers(champpLibre)
    }
  }, [champpLibre] );
  const handleAnswerChange = (question, answerSelected,e) => {
    let newAnswer;

    if (selectedAnswer.length === 0) {
    
      
      
     
      
      if (question.typeQuestion !=="ChampLibre") {
        newAnswer = {
        question: question,
        answer: [answerSelected],
      };
     }
      setSelectedAnswer([newAnswer]);
      setSelectedAnswers([newAnswer])
    } else {
      let foundIndex = -1;

      for (let index = 0; index < selectedAnswer.length; index++) {
        if (selectedAnswer[index].question === question) {
          foundIndex = index;
          break;
        }
      }
      if (
        foundIndex >= 0 &&
        selectedAnswer[foundIndex].question.typeQuestion !== "QCM"
      ) {
        const updatedSelectedAnswer = [...selectedAnswer];
        updatedSelectedAnswer[foundIndex] = {
          ...updatedSelectedAnswer[foundIndex],
          answer:[ answerSelected],
        };
        setSelectedAnswer(updatedSelectedAnswer);
        setSelectedAnswers(updatedSelectedAnswer)
      } else if (
        foundIndex >= 0 &&
        selectedAnswer[foundIndex].question.typeQuestion === "QCM"
      ) {
        const updatedSelectedAnswer = [...selectedAnswer];
        const answerExists = updatedSelectedAnswer[foundIndex].answer.includes(answerSelected);
        if (answerExists && !e.target.checked) { // answer unchecked, remove from selectedAnswer
          const filteredAnswers = updatedSelectedAnswer[foundIndex].answer.filter(a => a !== answerSelected);
        
          updatedSelectedAnswer[foundIndex] = {
            ...updatedSelectedAnswer[foundIndex],
            answer: filteredAnswers,
          };
          setSelectedAnswer(updatedSelectedAnswer);
          setSelectedAnswers(updatedSelectedAnswer)
        } else if (!answerExists && e.target.checked) { // answer checked, add to selectedAnswer
         
           const newSelectedAnswer = [...updatedSelectedAnswer[foundIndex].answer]
      
            newSelectedAnswer.push(answerSelected);
          
          console.log("newSelectedAnswer", newSelectedAnswer);
       
          updatedSelectedAnswer[foundIndex] = {
            ...updatedSelectedAnswer[foundIndex],
            answer:newSelectedAnswer,
         
          };
          
          setSelectedAnswer(updatedSelectedAnswer);
          setSelectedAnswers(updatedSelectedAnswer)
        }
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [
          ...prevSelectedAnswer,
          { question: question, answer: [answerSelected ]},
        ]);
        setSelectedAnswers((prevSelectedAnswer) => [
          ...prevSelectedAnswer,
          { question: question, answer: [answerSelected ]},
        ])
      }
    }
    
  };
  console.log("selectedAnswer", selectedAnswer);
  console.log("selectedAnswer", setSelectedAnswers);
  
  return (
    <div>
      <>
      {(question.typeQuestion === "VraiOuFaux" || question.typeQuestion === "Image") && 
  answers.map((answer, index) => (
    <div
      className="Consulter-Answer"
     // htmlFor={`answer${index}`}
      style={{ height: answer.AnswerType === "Image" ? 300 : 20 ,marginBottom:answer.AnswerType === "Image" ? 30:20 ,width:answer.AnswerType === "Image" && 350}}
    >
      <>
        {" "}
        <input
          type="radio"
         // id={`answer${index}`}
          name={`question_${answer.index}`}
          value={answer.ValueAnswer}
          onClick={() => handleAnswerChange(question, answer.ValueAnswer)}
        />
        {answer.AnswerType === "Text" ? (
          answer.ValueAnswer
        ) : answer.AnswerType === "Image" ? (
          
            <img
              height={300}
              width={"100%"}
              src={URL.createObjectURL(
                answer.ValueAnswer.fileList[0].originFileObj
              )}
              alt="Answer"
            />
         
        ) : (
          answer.ValueAnswer
        )}
      </>
    </div>
  ))
} {question.typeQuestion === "QCM" && 
  answers.map((answer, index) => (
    <div
      className="Consulter-Answer"
      htmlFor={`answer${ index}`}
      style={{ height: answer.AnswerType === "Image" ? 300 : 20 ,marginBottom:answer.AnswerType === "Image" ? 30:20 ,width:answer.AnswerType === "Image" && 350}}
    >
       <>
                        <input
                          type="checkbox"
                         id={`answer${index}`}
                          name={`answer_${question.index}`}
                          value={answer.ValueAnswer}
                          onClick={(e) =>
                            handleAnswerChange(question, answer.ValueAnswer,e)
                          }
                        />
                 <label >
                          {answer.AnswerType === "Text" ? (
                            answer.ValueAnswer
                          ) : answer.AnswerType === "Image" ? (
                            <img
                              height={300}
                              width={"100%"}
                              src={URL.createObjectURL(
                                answer.ValueAnswer.fileList[0].originFileObj
                              )}
                              alt="Answer"
                            />
                          ) : (
                            answer.ValueAnswer
                          )}
                        </label>
                      </>
    </div>
  ))
}
{question.typeQuestion === "ChampLibre" && 
    <Form.Item  name="ChampLibre">
       <TextArea rows={16} placeholder="Description du test" maxLength={600}   onChange={(e)=>handleChampLibreChange(e,question)}  />            
       </Form.Item>
}
            </>
    </div>
  )
}
