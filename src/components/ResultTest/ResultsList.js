import React, { useEffect, useState } from "react";
import { Table, Row } from "antd";

import axios from "axios";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";


import { useParams } from "react-router-dom";
import SuiviResponses from "./SuiviResponses";

import StaticsResult from "./StaticsResult";
import Result from "../ConsultTest/Result";

const { Column } = Table;

export default function ResultsList() {
  const { id } = useParams();


  
console.log(id)


  const [results, setResults] = useState([]);
  const [test, setTest] = useState([]);
console.log("resultsresults",results)
  useEffect(() => {
    console.log("id", id);
    async function fetchData() {
      try {
        const res = await axios.get(`/getResult/${id}`);
        console.log("res.data", res.data);
        setResults(res.data);
        const res2 = await axios.get(`/getTest/${id}`);
        setTest(res2.data);
        console.log("res2.data", res2.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [id]);
 
  const [result133, setResult] = useState([]);
console.log("result133",result133)
  const onResultUpdate = (index, formattedScore, tempsRealist, score) => {
    setResult((prevState) => {
      const newResults = [...prevState];
      newResults[index] = { formattedScore, tempsRealist, score };
      return newResults;
    });
  };
 



  const calculate = (aaa) => {

   
    return aaa?.map((result, index) => {
      return (
        <Result
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
  
  const [modalContent, setModalContent] = useState(null);
 
  useEffect(() => {
    setModalContent(calculate(results?.candidates));
  }, [results]);
  let durationTotal=0;
  let totalPoints=0;

  const data = results?.candidates?.map((candidate, index) => {
    if(totalPoints===0 || durationTotal=== 0){
    for (let index = 0; index < candidate.QuestionsDetails[0].questions.length; index++) {
      durationTotal +=Number(candidate.QuestionsDetails[0].questions[index].duration);
    }
    for (let index = 0; index < candidate.QuestionsDetails[0].questions.length; index++) {
      totalPoints +=Number(candidate.QuestionsDetails[0].questions[index].points);
    }}
    console.log("totalPointstotalPoints",totalPoints)
    console.log("totalPointstotalPoints",durationTotal)
    const percentage = result133 && result133[index] ? ((result133[index].score / totalPoints) * 100).toFixed(2): '';
  const score = percentage.toString().replace(/\.0+$/, "");
   

    const temps = result133 && result133[index] ?( ((durationTotal*60) +  result133[index].tempsRealist)-60 ) : '';
    const hours = Math.floor(temps / 3600);
    const minutes = Math.floor((temps % 3600) / 60);
    const seconds = temps % 60;
    const timeAchieved =
      hours === 0
        ? `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
            2,
            "0"
          )} min `
        : `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
            2,
            "0"
          )} : ${String(seconds).padStart(2, "0")}`;
          const image = score >= 45 ? <div ><CheckOutlined style={{color:"#4bdb2c" ,fontSize:"24px"}}/>
          <p style={{fontFamily:"aria",fontSize:"17px",marginTop:-7,marginBottom:-12}}>Pass</p> </div>
          : <div ><CloseOutlined style={{color:"#F3533A" ,fontSize:"24px"}}/>
          <p style={{fontFamily:"aria",fontSize:"17px",marginTop:-7,marginBottom:-12}}>Fail</p> 
          </div> ;
          const dateStr = candidate.createdAt;
          const date = new Date(dateStr);
          
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          const month = monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          
          let hh = date.getHours();
          let mm = date.getMinutes();
          const amPm = hh >= 12 ? "PM" : "AM";
          hh = hh % 12;
          hh = hh ? hh : 12; // "0" should be "12"
          mm = mm < 10 ? "0" + mm : mm;
          
          const formattedDate = `${month} ${day}.${year} at ${hh}:${mm} ${amPm}`;
          console.log("formattedDate",formattedDate);
          return {
      id: index + 1,
      key: candidate._id,
      Date:formattedDate,
      Name: candidate.name,
      Score: score,
    Temps: timeAchieved,
      candidateResponses: candidate.candidateAnswers,
      QuestionsDetails: candidate.QuestionsDetails,
      time: candidate.time,
      Result:image,
    };
    
  });
 
  return (
    <Row gutter={[16, 16]} justify="space-between">
      <div
        style={{
          display: "block",
          width: "70%",
          margin: "auto",
          marginTop: 60,
        }}
      >
       
       <h1 style={{color:"#6F88FC", marginBottom:30,marginTop:-20}}>Liste des candidats</h1>
       <StaticsResult Results={results?.candidates} />
        <Table
          dataSource={data}
          sort={{ field: "Score", order: "asc" }}
          bordered={true}
          scroll={{ x: 300 }}
          pagination={{
            pageSize: 4,
            position: ["bottomCenter"],
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} Candidats`,
          }}
        >
          <Column align="center" title="" dataIndex="id" key="id" 
          render={(id) => (
            <span style={{ fontSize:"17px",fontFamily:"aria"}}>{id}</span>
          )}/>
          <Column align="center" title="Date" dataIndex="Date" key="Date"
           render={(Date) => (
            <span style={{ fontSize:"17px",fontFamily:"aria"}}>{Date}</span>
          )}
          />
          <Column align="center" title="Nom" dataIndex="Name" key="Name"
          render={(Name) => (
            <span style={{ fontSize:"17px",fontFamily:"aria"}}>{Name}</span>
          )}
          />
        
          <Column
            align="center"
            title="Score %"
           
            dataIndex="Score"
            key="Score"
            sorter={(a, b) => a.Score.localeCompare(b.Score)} sortDirections={['ascend', 'descend']} 
            render={(score) => (
              <span style={{ color: score >= 45 ? '#4bdb2c' : '#F3533A',fontSize:"17px",fontFamily:"aria"}}>{score}</span>
            )}
          />
          <Column
            align="center"
            title="Temps"
            
            dataIndex="Temps"
            key="Temps"
            sorter={(a, b) => a.Temps.localeCompare(b.Temps)} sortDirections={['ascend', 'descend']}
            render={(time) => (
              <span style={{fontSize:"17px",fontFamily:"aria"}}>{time}</span>
            )}
          />
          <Column
            align="center"
            title="Action"
            render={(key, record) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                
                  <SuiviResponses
                    candidateResponses={record.candidateResponses}
                    QuestionsDetails={record.QuestionsDetails}
                
                  />
                
              </div>
            )}
            dataIndex="tags"
            key="tags"
          />
          <Column align="center" title="Résultat" dataIndex="Result" key="Result" />
        </Table>
      </div>
      <div style={{ display: "none" }}>{modalContent}</div>
    </Row>
  );
}
