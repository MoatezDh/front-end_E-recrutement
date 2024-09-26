import React, { useEffect, useState } from "react";
import Parent from "../components/MethodAddTest/Parent";
import FromFile from "../components/AddTest/FromFile";
import FromDB from "../components/AddTest/FromDB";
import StepsForm from "../components/AddTest/FromForm/StepsForm";
import ConsulterTest from "../components/ConsultTest/ConsultTest";
import { Routes, Route } from 'react-router-dom';
import NavBar from "../views/NavBar";
import Consulter from "../components/ConsultTest/Consult";
import logo from "../media/recin.webp"
import TestsList from "../components/TestList/TestsList";
import Home from "../components/HomePage/Home"

import ResultsList from "../components/ResultTest/ResultsList";


export default function AppRoutes() {
  useEffect(() => {
    document.title = 'REC-INOV';
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = logo;
    document.head.appendChild(icon);
  })

  const [QuestionsDetails,setQuestionsDetails]=useState({})
  const [FromFormDetails, setFromFrom] = useState({})
 
    return (
       <>

            <NavBar/>
            <Routes>
                 <Route path="/"  element={<Home />} />
                 <Route path="/company/addTest"  element={<Parent />} />

             
                <Route path="/company/addTest/Upload" element={<FromFile />} />
                <Route path="/company/addTest/FromDB" element={<FromDB/>} />
              
                <Route path="/company/addTest/FromForm" element={<StepsForm setQuestionsDetails={setQuestionsDetails} setFromFormDetails={setFromFrom}/>} />
              
                <Route path="/company/addTest/FromForm/ConsulterTest" element={<ConsulterTest QuestionsDetails={QuestionsDetails} FromFormDetails={FromFormDetails} />} />
             
                <Route path="/company/addTest/FromForm/Consulter" element={<Consulter QuestionsDetails={QuestionsDetails} FromFormDetails={FromFormDetails} />} />
                <Route path="/candidate/TestsList" element={<TestsList/>} />
                <Route path="/candidate/ConsulterTest/:id" element={<ConsulterTest QuestionsDetails={QuestionsDetails} FromFormDetails={FromFormDetails} setQuestionsDetails={setQuestionsDetails} setFromFormDetails={setFromFrom}/>} />
                <Route path="/candidate/Consulter/:id" element={<Consulter QuestionsDetails={QuestionsDetails} FromFormDetails={FromFormDetails} />} />

                <Route path="/company/TestsList" element={<TestsList/>} />
                <Route path="/company/resultTest/:id" element={<ResultsList/>} />
               
                <Route path="/company/updateTest/:id" element={<StepsForm setQuestionsDetails={setQuestionsDetails} setFromFormDetails={setFromFrom}/>} />
                <Route path="/resultTest/:id" element={<FromDB/>} />
                
            </Routes>
            </>
    )
}