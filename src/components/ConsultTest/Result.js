import React from "react";
import { Button, Row } from "antd";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import stopWatch from "../../media/stopwatch.png";
import logo from "../../media/recin.webp";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Result({
  selectedAnswer,
  QuestionsDetails,
lastRenderTime,
onResultUpdate,
index
}) {
 
console.log("QuestionsDetails",selectedAnswer) 

const{ id }=useParams()
  const location = useLocation();
 //let questions;
//if (id !== undefined) {
  // questions = QuestionsDetails[0].questions;
//}else{
 const questions = QuestionsDetails.questions;
//}
  

  let totalPoints = 0;
  let totalDuration = 0;
  for (let i = 0; i < questions?.length; i++) {
    const question = questions[i];
    totalPoints += Number(question.points);
    
  }
  
  for (let i = 0; i < questions?.length; i++) {
    const question = questions[i];
    
    totalDuration += Number(question.duration);

  }
  
  const totalQuestions = questions?.length;
  let questionsResponded=0;
  let score = 0;
  let nbquestion = 0;
 
  if (selectedAnswer[0] !== undefined) {
    
   
  if (selectedAnswer[0].typeQuestion !== "ChampLibre") {
    for (let i = 0; i < selectedAnswer.length; i++) {
   
      const valueSelectedAnswer = selectedAnswer[i];
     
      let correctAnswer = [];
      
     if (valueSelectedAnswer.question.typeQuestion === "QCM") {
      let answer=[];
      if (valueSelectedAnswer.question.answers.length===1) {
        answer = valueSelectedAnswer.question.answers[0].filter(
          (answer) => answer.CorrectAnswer === true
        );
        
      }
      else{
        for (let index = 0; index < valueSelectedAnswer.question.answers.length; index++) {
          answer = valueSelectedAnswer.question.answers.filter(
            (answer) => answer.CorrectAnswer === true
          );
          
        }
      }
      console.log("answeranswer",answer);
      if (answer) {
        correctAnswer.push(...answer);
      }
    
   
     let correctAnswerValue=[];
for (let i = 0; i < correctAnswer.length; i++) {
  
  for (let index = 0; index < correctAnswer.length; index++) {
  

     correctAnswerValue.push(correctAnswer[index].ValueAnswer); 
  }
  console.log("correctAnswerValue",correctAnswerValue);
}
const selectedAnswerValue = valueSelectedAnswer.answer;
  let areEqual = true;
  selectedAnswerValue.forEach(val1 => {
    if (!correctAnswerValue.includes(val1)) {
      areEqual = false;
    }
  });
  correctAnswerValue.forEach(val2 => {
    if (!selectedAnswerValue.includes(val2)) {
      areEqual = false;
    }
  });
 
    console.log("areEqualareEqual",areEqual); // true


console.log("isCorrect",areEqual);
if (areEqual) {
  score += Number(valueSelectedAnswer.question.points);

  
  
    nbquestion += 1;
    questionsResponded+=1
  
} else {
  if (score === 0 && nbquestion === 0) {
    score = 0;
    nbquestion = 0;
  }
}

/*if (valueSelectedAnswer.question.typeQuestion === "Image"){
 
  if (correctAnswerValue.file.uid === valueSelectedAnswer.answer[0].file.uid) {
  score += Number(valueSelectedAnswer.question.points);
  nbquestion += 1;
} else {
  if (score === 0 && nbquestion === 0) {
    score = 0;
    nbquestion = 0;
  } 
}}*/
    } else {
      correctAnswer=(
        valueSelectedAnswer.question.answers.find(
          (answer) => answer.CorrectAnswer === true
        )
      );
   
    console.log("correctAnswercorrectAnswer",correctAnswer);
      const correctAnswerValue = [correctAnswer.ValueAnswer];
   
    
  
        console.log("valueSelectedAnswer.answer",valueSelectedAnswer.answer);
        if (correctAnswerValue[0] === valueSelectedAnswer.answer[0]) {
          score += Number(valueSelectedAnswer.question.points);
          nbquestion += 1;
      

        } else {
          if (score === 0 && nbquestion === 0) {
            score = 0;
            nbquestion = 0;
          } 
        }
     
    }
  }
  }
}else {
  score = 0;
   nbquestion = 0;
   questionsResponded=0
 
}
  const percentage = ((score / totalPoints) * 100).toFixed(2);
  const formattedScore = percentage.toString().replace(/\.0+$/, "");
  let status;
  if (formattedScore >= 90) {
    status = "Excellent";
  } else if (formattedScore >= 80) {
    status = "Très bon";
  } else if (formattedScore >= 60) {
    status = "Bon";
  } else if (formattedScore >= 50) {
    status = "Suffisant";
  } else {
    status = "Insuffisant";
  }
    
  const tempsRealist=(totalDuration*60)-lastRenderTime;
  
  const hours = Math.floor(tempsRealist / 3600);
  const minutes = Math.floor((tempsRealist % 3600) / 60);
  const seconds = tempsRealist % 60;
  const timeAchieved = (hours === 0) ? 
  `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} min ` :
  `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  console.log("fomatedscorefomatedscore",formattedScore)
  console.log("fomatedscorefomatedscore",timeAchieved)
 
  console.log("fomatedscorefomatedscore",score)

  if (index !== undefined && location.pathname === `/company/resultTest/${id}`) {
    onResultUpdate(index, formattedScore, tempsRealist , score,questionsResponded);
  }
  


  return (

    <Row>
      <div style={{ display: "inline-block", width: "100%" }}>
        {((selectedAnswer.length===0 || selectedAnswer.length>0) && selectedAnswer[0].typeQuestion !== "ChampLibre" )
         ? (
          <div>
            <div
              style={{
                display: "inline-flex",
                width: "100%",
                justifyContent: "center",
                margin: "auto",
                marginBottom: 35,
                marginTop: 10,
              }}
            >
              <div className="ResultQuestion">
                <span className="ResultQuestions" >
                  <p >
                    Temps réalisé
                  </p>
                </span>
                <div style={{margin:"auto"}}>
                <img
                  src={stopWatch}
                  width="130"
                  height="140"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  
                />
                 <p style={{fontFamily:" Georgia, serif",fontSize:"20px",color:"#31b2f5",marginTop:5}}>{timeAchieved}</p>
                </div>
              </div>
              <div className="ResultQuestion">
                <span className="ResultQuestions" >
                  <p >
                    Bonnes réponses
                  </p>
                </span>

                <div style={{ width: 130, height: 150, marginTop: 15 ,margin:"auto"}}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${formattedScore}% `}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                      backgroundColor: "#3e98c7",
                      textColor: "#fff",
                      pathColor: "#fff",
                      trailColor: "transparent",
                      textSize: "16px",
                    })}
                  />
                  <p style={{fontFamily:" Georgia, serif",fontSize:"20px",color:"#31b2f5",marginTop:12}}>{status}</p>
                </div>
              </div>
            </div>

            <div style={{ margin: "auto", width: "40%" }}>
              <span
                style={{
                  width: "90%",
                  backgroundColor: "#FA9F42",
                  height: 30,
                  marginBottom: 10,
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: "17px",
                }}
              >
                <p style={{ marginTop: 3, marginLeft: 4, color: "azure" ,fontFamily:" Georgia, serif"}}>
                  Détails du questionnaires
                </p>
              </span>
              <div style={{margin: "auto", width: "60%"}}>
                <div className="DivResults">
                  <span className="DivResult">
                    <p className="ResultPara"> {totalQuestions}</p>
                  </span>
                  <p className="ResultPar">Questions</p>
                </div>
                <div className="DivResults">
                  <span className="DivResult">
                    <p className="ResultPara"> {questionsResponded}</p>
                  </span>
                  <p className="ResultPar">Questions répondues</p>
                </div>
                <div className="DivResults">
                  <span className="DivResult">
                    <p className="ResultPara"> {nbquestion}</p>
                  </span>
                  <p className="ResultPar">Bonnes réponses</p>
                </div>
                <div className="DivResults">
                  <span
                    className="DivResult"
                    style={{ backgroundColor: "#1c5ec9" }}
                  >
                    <p className="ResultPara">{score}</p>
                  </span>
                  <p className="ResultPar"> Total de points </p>
                </div>
              </div>
            </div>
           { location.pathname === `/candidate/Consulter/${id}` ? (
             <> <Link to="/candidate/TestsList">
             <Button
               type="primary"
               style={{
                 display: "flex",
                 justifyContent: "flex-end",
                 margin: "10px 10px 0px auto",
               }}
             >
               Quitter
             </Button>
           </Link>
           <Outlet /> </>
        ):   <> <Link to="/company/addTest/FromForm/ConsulterTest">
        <Button
          type="primary"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 10px 0px auto",
          }}
        >
          Quitter
        </Button>
      </Link>
      <Outlet /> </>}
          </div>
        ) : selectedAnswer[0]?.typeQuestion === "ChampLibre" ? (
         
         <div style={{display:"inline-block" ,justifyContent:"center"}}>
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <p>
              Il semble que vous ayez déjà terminé votre évaluation. votre
              réponse sur le question suivant {selectedAnswer[selectedAnswer.length-2].Question}{" "}
              est :
            </p>
            <br></br>
          <p>{selectedAnswer[selectedAnswer.length-1]}</p>
          </div>
        ) : null}
      </div>
    </Row>
  );
}
