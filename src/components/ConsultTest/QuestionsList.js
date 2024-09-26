import React,{useState} from 'react'
import { Button, notification,Modal } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


import AnswersList from "./AnswersList";
import Result from "./Result";
import { useLocation, useParams } from 'react-router-dom';

import { updaterespense } from '../../services/example/updaterespense';


export default function QuestionList({QuestionsDetails,FromFormDetails}) {
  const location = useLocation();
 const {id }=useParams();
  console.log("QuestionsDetails",QuestionsDetails)

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    if (id !== undefined) {
      let questions = [];
     for (let index = 0; index < QuestionsDetails.length; index++) {
      questions.push(QuestionsDetails[index])
      
      
     }
     QuestionsDetails= {questions}
     }

  const totalQuestions = QuestionsDetails?.questions?.length;
  
  const[selectedAnswer,setSelectedAnswer]=useState([])



  console.log("candidateAnswers",selectedAnswer)

 
  

  const handleNext = (pageIndex) => {

   /*if (currentPageIndex === totalQuestions-1 && location.pathname === `/candidate/Consulter/${id}` ) {
      window.location.href = "/candidate/TestsList";
      };*/
    




    if (FromFormDetails.Stopwatch === "Un Chronométre Par Question") {
      setTime(prevTime =>prevTime+lastRenderTime)
    }else{
      setTime(lastRenderTime)
    }
   
  
   
       
    if (currentPageIndex === totalQuestions - 1) {
      notification.success({
        description:
          " Félicitations pour la merveilleuse performance. Vous avez encore prouvé que vous êtes le champion.",

        className: "custom-class",
        style: { width: 600, backgroundColor: "#d4edda", marginTop: "5rem" },
      });
    }
    
   setCurrentPageIndex(pageIndex + 1);
   if (totalQuestions>1) {
    setQuestionDuration(questions[currentPageIndex+1].duration*60)
   }
  if (FromFormDetails.Stopwatch === "Un Chronométre Par Question") {
    setLastRenderTime((prevLastRenderTime) => prevLastRenderTime + lastRenderTime);
  }
  if (FromFormDetails.Stopwatch==="Un Chronométre Par Question"  && totalQuestions>1 && currentPageIndex===0) {

      const instance = Modal.info({
        title: 'Vous ne pourrez pas revenir à une question précédente pour modifier votre réponse. Bonne chance',
      });
      setTimeout(() => {
        instance.destroy();
      }, 3000);
      }

    //  setSelectedAnswer()
  };
  const handlePrev = (pageIndex) => {
    setCurrentPageIndex(pageIndex - 1);
    
  };
  const questions = QuestionsDetails.questions;
    
  let totalDuration = 0;

  for (let i = 0; i < questions?.length; i++) {
    const question = questions[i];
    totalDuration += Number(question.duration);
  }
  let initialCount;
  if (
    FromFormDetails.Stopwatch === "Un Chronométre Global" &&
    isNaN(FromFormDetails.TotalDuration)
  ) {
    initialCount = totalDuration * 60;
  } else {
    initialCount = FromFormDetails.TotalDuration * 60;
  }
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const [time, setTime] = useState(0);

  const renderTime = ({ remainingTime }) => {
    
    if (remainingTime === 0) {
       setCurrentPageIndex(currentPageIndex+1);
       if (totalQuestions>1) {
        setQuestionDuration(questions[currentPageIndex+1].duration*60)
       }
        if (FromFormDetails.Stopwatch === "Un Chronométre Par Question") {
            setLastRenderTime((prevLastRenderTime)=> prevLastRenderTime+questionDuration);
           }else{setLastRenderTime(initialCount);}
         return <div className="timer">Too lale...</div>;
       }
       setLastRenderTime(remainingTime);
     
     const hours = Math.floor(remainingTime / 3600);
     const minutes = Math.floor((remainingTime % 3600) / 60);
     const seconds = remainingTime % 60;
 
     const formattedHours = String(hours).padStart(2, "0");
     const formattedMinutes = String(minutes).padStart(2, "0");
     const formattedSeconds = String(seconds).padStart(2, "0");
 
     const formattedTime =
       FromFormDetails.Stopwatch === "Un Chronométre Global" ||
       FromFormDetails.Stopwatch === "Un Chronométre Par Question"
         ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
         : `${formattedMinutes}:${formattedSeconds}`;
    
     return (
       <div className="timer">
         <div className="text">Reste</div>
         <div className="value">{formattedTime}</div>
       </div>
     );
   };
   
   
console.log("QuestionsDetails[0].duration*60 ",QuestionsDetails)
  const [questionDuration , setQuestionDuration ]= useState( QuestionsDetails.questions[0].duration*60 )

   const Next = "Next";
   const Terminer = "Terminer";
   
const height = (() => {
  let height = 0;
  if (QuestionsDetails.questions[currentPageIndex].typeQuestion === "Image" ) {
    height += 300; // Adding 2 for the question and first image
  }
    for (let i = 0; i < QuestionsDetails.questions[currentPageIndex].answers.length; i++) {
     
      if (QuestionsDetails.questions[currentPageIndex].answers[i].AnswerType === "Image") {
        height += 300;
      }
   else{
    height+=40
   }
   
    }//height+=340
   // height += 340; // Adding 1 for the first image
  if (QuestionsDetails.questions[currentPageIndex].typeQuestion === "ChampLibre") {
    height = 500;
  } else if (currentPageIndex === totalQuestions) {
    height = 570;
  } else {
    for (let i = 0; i < QuestionsDetails.questions[currentPageIndex].answers.length; i++) {
      height += 90;
    }
    //height += 90; // Adding 1 for the first answer
  }
  return height;
})
 
    
  
console.log('time',time)
  
  const complete=()=>{
   

   
    if (currentPageIndex === totalQuestions -1 && location.pathname === `/candidate/Consulter/${id}` ) {
      console.log('timetime',time)
      const data = {
        idConsultTest: id,
        candidates: {
          time:time,
          QuestionsDetails:QuestionsDetails,
          candidateAnswers: selectedAnswer.map(({ answer, question }) => ({ answer, question }))
        }
      };
      

     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
      updaterespense(id, data.candidates)
        .then((result) => {
          console.log('result', result);
        })
        .catch((error) => {
          console.log('error', error);
        });
  
  }
  }
  return (
    <>
    <div >
   
        {QuestionsDetails?.questions?.map((question, index) => (  
          <>
        {FromFormDetails.Stopwatch === "Un Chronométre Global" && currentPageIndex < totalQuestions  ? (
            <div className="timer-wrapper" style={{ display: index === currentPageIndex ? "flex" : "none" }}>
              <CountdownCircleTimer
                isPlaying
                duration={initialCount}
                colors={["#87d068", "#f58f0a", "#f50a0a"]} // Updated colors
        
                size={112}
                onComplete={() => {
                  setCurrentPageIndex(totalQuestions);
                  }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
          ):null}
         {index === currentPageIndex  && (
          <>
            <div  
       style={{
        width: currentPageIndex === totalQuestions ? "60%" : "100%",
        height: height()
      }}>
           
              {FromFormDetails.Stopwatch === "Un Chronométre Par Question" ?(
             
                <div className="timer-wrapper">
                   
                  <CountdownCircleTimer
                    isPlaying
                    duration={questionDuration}
                    colors={["#87d068", "#f58f0a", "#f50a0a"]}
                    colorsTime={[{renderTime}]}
                    size={112}
                   
                  >
                    {renderTime}
                   
                  </CountdownCircleTimer>
                 
                </div>
            
              ):null }
  
              <h5 className="h55">Questions { index + 1}</h5>
  
              {question.typeQuestion === "QCM" ||
              question.typeQuestion === "VraiOuFaux" ||
              question.typeQuestion === "ChampLibre" ? (
                <p className="Questions-Paraa">
                  <strong>{question.Question} </strong>?
                </p>
              ) : question.typeQuestion === "Image" ? (
                <p className="Questions-Paraa" >
                  <img
                    height={300}
                    width={"68%"}
                    src={URL.createObjectURL(
                      question.Question.file.originFileObj
                    )}
                    alt="Question"
                    
                  />
                </p>
              ) : null}
                         <AnswersList question={question}   setSelectedAnswers={(newAnswer) => setSelectedAnswer(prevSelectedAnswer => [...prevSelectedAnswer, ...newAnswer])}/>

              </div>
              <hr style={{ boxShadow: "10px grey",marginTop:0  }} />
              </> )} </>
            ))}
</div>

<div
          style={{
            marginTop:20,
            textAlign: "center",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 60,
          }}
        >
          <Button
            type="primary"
            disabled={currentPageIndex === 0}
            style={{
              display:
                FromFormDetails.Stopwatch === "Un Chronométre Par Question" ||
                currentPageIndex === totalQuestions
                  ? "none"
                  : "inline-block",
              marginRight: 30,
            }}
            onClick={() => handlePrev(currentPageIndex)}
          >
            <ArrowLeftOutlined style={{ fontSize: "16px", marginTop: 3 }} />
            Previous
          </Button>

          <Button
            type="primary"
            style={{
              display:
                currentPageIndex === totalQuestions ? "none" : "inline-block",
            }}
            disabled={currentPageIndex === totalQuestions}
            onClick={() =>{ 
            complete(); 
            handleNext(currentPageIndex);
             } }
          >
         {currentPageIndex < totalQuestions - 1 ? Next : Terminer}
            <ArrowRightOutlined style={{ fontSize: "16px" }} />
          </Button>
         
        </div>
        {(currentPageIndex === totalQuestions || (currentPageIndex === totalQuestions && location.pathname === `/candidate/Consulter/${id}`) ) ? (
          <Result selectedAnswer={selectedAnswer} QuestionsDetails={QuestionsDetails} lastRenderTime={time} FromFormDetails={FromFormDetails} />
        ) : null}
        </>)
}
