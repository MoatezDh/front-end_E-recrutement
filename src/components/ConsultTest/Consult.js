import React/*, { useEffect, useState }*/ from "react";

import QuestionList from "./QuestionsList";
//import { getTest } from '../../services/example/getTest'
import {   useParams } from "react-router-dom"; 
export default function Consulter(props) {

  const { id } = useParams();
 
  if (id !== undefined && props.QuestionsDetails === undefined) {
    window.location.href = "/candidate/TestsList";
  }
  /*{console.log("props",props)
 
  console.log("id",id)

  const [test, setTest] = useState({
    QuestionsDetails: props?.QuestionsDetails ?? {questions:[]},
    FromFormDetails: props?.FromFormDetails ?? {
      Experience: "",
      NumberDays: "",
      PointTotal: "",
      Stopwatch: "",
      TotalDuration: "",
      description: "",
      language: "",
      
      title: "",
    },
  });
  
  useEffect(() => {
    console.log('useEffect is running');
    if (id) {
      getTest(id)
        .then(res => {
          const updatedTest = {
            QuestionsDetails: res.data || [],
            FromFormDetails: res.data,
          };
          setTest(updatedTest);
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [id]);

 
  let {QuestionsDetails,FromFormDetails}=test

console.log("test:", test);
console.log("QuestionsDetails:", QuestionsDetails);
console.log("FromFormDetails:", FromFormDetails);}*/
//  if (test !== null) {
//   QuestionsDetails = { Experience: test.Experience,
//   Stopwatch: test.Stopwatch,
//    description: test.description,
//     language: test.language,
//     languageCandidate:test.languageCandidate,
//     questions :  test.questions,
//     title: test.title,
  
//   } ;
//     FromFormDetails ={
//       Experience: test.Experience,
//           NumberDays: test.NumberDays,
//           PointTotal: test.PointTotal,
//           Stopwatch: test.Stopwatch,
//           TotalDuration: test.TotalDuration,
//           description: test.description,
//           language: test.language,
//           languageCandidate: test.languageCandidate,
//           title: test.title,
//     }
//   }
  // console.log('QuestionDetails',QuestionsDetails)
  // console.log('FromFormDetails',FromFormDetails)

  return (
 
      <div className="CONSULTER">

        <QuestionList QuestionsDetails={props.QuestionsDetails} FromFormDetails={props.FromFormDetails}/>
        
    </div>
 
  );
}
