import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [pass,setPass]=useState("")
    const [conpass,setconPass]=useState("")
    const [isAdmin,setIsAdmin]=useState(false)
    let nav=useNavigate()
    const sendSignup=async() => {
        if(!name || !email || !pass || !phone || !conpass) {
            alert("please enter required area")
        }
        else{
            if(pass.length<8 && pass.length>16)
            {
                alert("password must be at least 16 characters");
            }
            else {
            if(pass === conpass){
                {
                    console.log(isAdmin)
                    let res=await fetch("http://localhost:3000/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        name,email,pass,phone,isAdmin
                    })
                })
                let data=await res.json()
                alert("signup successful")
                nav("/signup")
                }  
            }
            else{
                alert("password not matches");
            }
        }
        }
    }

  return (
    <>    <Navbar/>
    <div className='signupform'><h1>Signup</h1>
    
    <input type="text" placeholder='enter your name' onChange={(e)=>{setName(e.target.value)}}/>
    <input type="text" placeholder="enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
    <input type='text' placeholder='enter your number' onChange={(e)=>{setPhone(e.target.value)}}/>
    <input type="text" placeholder="enter your password" onChange={(e)=>{setPass(e.target.value)}}/>
    <input type='text' placeholder='reenter password'  onChange={(e)=>{setconPass(e.target.value)}}/>
    <select onChange={(e)=>{setIsAdmin(e.target.value)}}>
    <option>select user type</option>
        <option value="false">User</option>
        <option value="true">Admin</option>
    </select>
    </div>
    <button onClick={sendSignup}>Signup</button>
    </>

  )
}

export default Signup