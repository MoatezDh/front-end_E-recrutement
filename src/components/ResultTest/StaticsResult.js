import React, { useState, useEffect } from "react";
import { Modal,Button, Result } from "antd";
import { StockOutlined } from "@ant-design/icons";
import Resultss from "../ConsultTest/Result";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


export default function StaticsResult({ Results }) {
  
  const [results, setResults] = useState([]);

  console.log("results",results)

  const [modalContent, setModalContent] = useState(null);

  let element = []; 
  let title;
  if(Results !== undefined ){for (let index = 0; index < Results?.length; index++) {
    element = Results[0].QuestionsDetails[0].questions;
    title = "Les statistiques du   " +Results[0].QuestionsDetails[0].title;
  }}else{title=""}
  const questionLength=element.length;
console.log("element ",element);
  let PointTotal = 0;
  for (let index = 0; index < element.length; index++) {
    PointTotal += Number(element[index].points);
  }

  useEffect(() => {
    setModalContent(calculate(Results));
  },[Results]);

  const onResultUpdate = (index, formattedScore, tempsRealist, score,nbquestion) => {
    setResults((prevState) => {
      const newResults = [...prevState];
      newResults[index] = { formattedScore, tempsRealist, score,nbquestion };
      return newResults;
    });
  };

  const calculate = (Results) => {
    return Results?.map((result, index) => {
      return (
        <Resultss
          key={index}
          index={index}
          selectedAnswer={result.candidateAnswers}
          QuestionsDetails={result.QuestionsDetails}
          lastRenderTime={result.time}
          onResultUpdate={onResultUpdate}
        />
      );
    });
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleShowModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 100);
  };
  const scores = results.map((result) => result.score);
  const sumScores = scores.reduce((acc, score) => acc + score, 0);
  /*const percentage = ((score / totalPoints) * 100).toFixed(2);
  const formattedScore = percentage.toString().replace(/\.0+$/, "");*/
  //const scores = results.map((result) => result.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const minFormattedScore=((minScore / PointTotal) * 100).toFixed(2)
  const maxFormattedScore=((maxScore / PointTotal) * 100).toFixed(2)
  const tempsRealists = results.map((result) => -result.tempsRealist);
  const sumtempsRealists = tempsRealists.reduce((acc, tempsRealists) => acc + tempsRealists, 0);

  const minTempsRealist = Math.min(...tempsRealists);
  const maxTempsRealist = Math.max(...tempsRealists);
  const numCandidates=Results?.length

  console.log("scores",results)
  console.log("minFormattedScore",minFormattedScore)
  console.log("maxFormattedScore",maxFormattedScore)
  

  
  const percentage = (
    (sumScores / (PointTotal * Results?.length)) *
    100
  ).toFixed(2);
  const formattedScore = percentage.toString().replace(/\.0+$/, "");

//min Time Achieved

  const hours = Math.floor(minTempsRealist / 3600);
  const minutes = Math.floor((minTempsRealist % 3600) / 60);
  const seconds = minTempsRealist % 60;
  const minTimeAchieved =
    hours === 0
      ? `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
          2,
          "0"
        )} min `
      : `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
          2,
          "0"
        )} : ${String(seconds).padStart(2, "0")}`;

        //max Time Achieved 

        const hour = Math.floor(maxTempsRealist / 3600);
        const minute = Math.floor((maxTempsRealist % 3600) / 60);
        const second = maxTempsRealist % 60;
        const maxTimeAchieved =
          hour === 0
            ? `${String(minute).padStart(2, "0")} : ${String(second).padStart(
                2,
                "0"
              )} min `
            : `${String(hour).padStart(2, "0")} : ${String(minute).padStart(
                2,
                "0"
              )} : ${String(second).padStart(2, "0")}`;

              // sum Time Achieved
              const hourss = Math.floor(sumtempsRealists / 3600);
              const minutess = Math.floor((sumtempsRealists % 3600) / 60);
              const secondss = sumtempsRealists % 60;
              const GlobtimeAchieved =
                hourss === 0
                  ? `${String(minutess).padStart(2, "0")} : ${String(secondss).padStart(
                      2,
                      "0"
                    )} min `
                  : `${String(hourss).padStart(2, "0")} : ${String(minutess).padStart(
                      2,
                      "0"
                    )} : ${String(secondss).padStart(2, "0")}`;
        

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

  const LineChart = () => {
    const data = {
      labels: ["", ""],
      datasets: [
        {
          label: "Minimum Score",
          data: [0, minFormattedScore],
          fill: false,
          backgroundColor: "#ff0000",
          borderColor: "#ff0000",
          tension: 0.4,
        },
        {
          label: "Maximum Score",
          data: [0, maxFormattedScore],
          fill: false,
          backgroundColor: "#0071bd",
          borderColor: "#0071bd",
          tension: 0.4,
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <>
        <Line data={data} options={options} />
      
      </>
    );
  };

  const nbQuestion = results.map((result) => result.nbquestion);

  const countObj = nbQuestion.reduce((acc, val) => {
    if (val in acc) {
      acc[val]++;
    } else {
      acc[val] = 1;
    }
    return acc;
  }, {});
  
  const Num = Object.entries(countObj).map(([val, count]) => ({
    value: val,
    count
  }));
  




  

  const nbCandidates=Num.map((result) => result.count)
  const nbQuestions=Num.map((result) => result.value)
  if (Num.length > 0 && Num[0].count === undefined) {
    nbQuestions.unshift(0);
  }

const LineCharts = () => {

  
  const data = {
    
    labels: nbCandidates.map((count) => `${count} candidat(s) ont répondu`),
    
    datasets: [
      {
        label: `questions`,
        data: nbQuestions,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0.4,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};
return (
  <div>
  <Button
      type="dashed"
      onClick={() => {
        handleShowModal();
      }}
      className="Suivi_test"
      style={{display:"flex",margin:"auto",marginTop:-10,marginBottom:20}}
    >
      <span>
        Statistiques <StockOutlined />
      </span>
    </Button>

    <Modal
      title={ title  }
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1000}
    >
      {numCandidates ===undefined ? 
      (<Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      
    /> ): (<><div style={{boxShadow:"1px 1px 5px 3px rgb(170, 170, 170)",borderRadius:10}}>
    <h1>Statistiques Globales </h1>
    
    <div style={{display:"flex",width:"100%" ,marginLeft:10}}>
          <p>Nombre de candidats ayant passé le test: </p> 
          <p
                style={{
                  fontFamily: " Georgia, serif",
                  fontSize: "22px",
                  fontWeight:"bolder",
                  color: "#31b2f5",
                  margin:" auto auto auto 8px"
               
                }}
              >
              {numCandidates}
              </p>
              </div>
    
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
         
          <div className="ResultQuestion" style={{marginTop:30}}>
            <span className="ResultQuestions">
              <p>Score de tous les candidats</p>
            </span>

            <div
              style={{
                width: 130,
                height: 150,
                marginTop: 15,
                margin: "auto",
              }}
            >
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
              <p
                style={{
                  fontFamily: " Georgia, serif",
                  fontSize: "20px",
                  color: "#31b2f5",
                  marginTop: 12,
                }}
              >
                {status}
              </p>
            </div>
          </div>
          <div className="ResultQuestion">
            
            <div style={{ width: "80%", margin: "auto" }}>
          
          {LineChart()}
          

        </div>
          </div>
        </div>
        
      </div>
      <div style={{ display: "flex", width: "100%" ,marginBottom:40}}>
<div style={{ display: "inline", width: "33%", margin: "auto",marginBottom:40 ,marginTop:10}}>
  <span className="ResultQuestions" style={{margin:"auto"}}>
    <p>Temps moyen</p>
  </span>
<span style={{display:"flex",marginTop:10}}> 
  <p
    style={{
      fontFamily: "Georgia, serif",
      fontSize: "22px",
      fontWeight: "bolder",
      color: "#31b2f5",
      margin: "auto",
    }}
  >
    {GlobtimeAchieved}
  </p>
  </span>
</div>

<div style={{display: "inline", width: "33%", margin: "auto",marginBottom:40,marginTop:10}}>
  <span className="ResultQuestions">
    <p>Temps minimum</p>
  </span>
  <span style={{display:"flex",marginTop:10}}> 
  <p
    style={{
      fontFamily: "Georgia, serif",
      fontSize: "22px",
      fontWeight: "bolder",
      color: "#0071bd",
      margin: "auto ",
    }}
  >
    {minTimeAchieved}
  </p>
  </span>
</div>

<div style={{display: "inline", width: "33%", margin: "auto",marginBottom:40,marginTop:10}}>
  <span className="ResultQuestions">
    <p>Temps maximum</p>
  </span>
  <span style={{display:"flex",marginTop:10}}> 
  <p
    style={{
      fontFamily: "Georgia, serif",
      fontSize: "22px",
      fontWeight: "bolder",
      color: "#ff0000",
      margin: "auto ",
    }}
  >
    {maxTimeAchieved}
  </p>
  </span>
</div>
</div>

</div>
<div>
<div className="Suivi_Stat" style={{ width: "80%", margin: "auto" }}>
          <h1>Les statistiques du questions </h1>
          {LineCharts()}
          

        </div>
</div>
      <div style={{ display: "none" }}>{modalContent}</div></>)}
    </Modal>
  </div>
);
}
