import React from 'react'
import logo from "../../media/recin.webp";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
    <h1 style={{display:'flex',justifyContent:"center" ,marginTop:40}}>Bienvenue à RecInov</h1>
    <div style={{display:"flex",margin:"auto" ,width:"70%" ,marginTop:10 ,justifyContent:"center"}}>
    
        <img
        src={logo}
        width="300"
        height="300"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"       
      />
        
        </div>
        <p style={{display:'flex',justifyContent:"center" ,fontFamily:"Arial, sans-serif"}}>Vous êtes libre de choisir le rôle que vous souhaitez incarner</p>
        <div style={{display:"flex" ,justifyContent:"space-around" ,width:"25%" ,margin:"auto" ,marginTop:25}}>
          
        <Link to={`/company/addTest`}>
        <Button variant="outline-primary" className='Company_Button' >Espace Entreprise</Button>
        </Link>
        <Link to={`/candidate/TestsList`}>
        <Button variant="outline-primary" className='Candidat_Button' >Espace Candidat</Button>
        </Link>
        </div>
        </>
  )
}
