import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Login = () => {
const [email, setEmail] =useState("")
const [password, setPassword] =useState("")
const [signupData,setSignUpData]=useState([])
const [isAdmin,setIsAdmin] =useState(false)
let flag = false;


const getData=async () =>{
  let res=await fetch("http://localhost:3000/signup")
  let data= await res.json()
  console.log(data)
  setSignUpData(data)
}
useEffect(() => {
  getData()
},[])
let nav=useNavigate();

const handleLogin = async() =>{
  for(let i=0; i<signupData.length;i++){
    if(signupData[i].email === email && signupData[i].pass === password){
      flag=true;
      setIsAdmin(signupData[i].isAdmin);
      let res=await fetch("http://localhost:3000/currentuser",{
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...signupData[i],
      "isLogin":true
    })
  })
  let data=await res.json()
  nav("/loginhome")
    }
  }

}
  return (
    <>
    
    <div>
    <Navbar/>
    <h1>Userlogin</h1>
   <label>Email id</label>
    <input type='text' placeholder='enter email ' onChange={(e)=>{setEmail(e.target.value)}}/>
    <br></br>
    <label>Password</label>
    <input type='text' placeholder='enter password ' onChange={(e)=>{setPassword(e.target.value)}}/>
    <br></br>
    <button onClick={handleLogin}>Login</button>

    </div>
    </>
  )
}

export default Login