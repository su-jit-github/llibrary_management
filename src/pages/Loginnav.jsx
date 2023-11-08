import React, { useEffect, useState } from 'react'

const Loginnav = () => {
    const [login,setLogin]=useState([])

    const getLogin= async() => {
        let res=await fetch('http://localhost:3000/currentuser');
        let data=await res.json();
        setLogin(data)
        // console.log(login.isAdmin)
    }
    useEffect(() => {
      getLogin()  
    },[])
  return (
    <>
         <nav className='navbar'>
    <h1 style={{fontSize:"50px",color:"red"}}>Aru</h1>
    <ul style={{marginLeft:"40rem"}}>
    {login.isAdmin?<a href='/maintenance'>maintenance</a> : ""}
        <a href='/reports'>Reports</a>
        <a href='/trasaction'>Trasaction</a>
        <a href='/logout'>Logout</a>
        </ul>
    </nav>
    </>
  )
}

export default Loginnav