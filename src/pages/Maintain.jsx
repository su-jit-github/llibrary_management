import React, { useState } from 'react'
import Loginnav from './Loginnav'
import { useSearchParams } from 'react-router-dom'
import { flushSync } from 'react-dom'

const Maintain = () => {

    const [isMembership, setIsMembership] = useState(false)
    const [MembershipTime, setMembershipTime] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [contact, setContact] = useState("")
    const [adhar, setAdhar] = useState("")
    const [address, setAddress] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [bookMovieArr, setBookMovieArr] = useState([])
    const [isUpdateBookMovie, setIsUpdateBookMovie] = useState(false)
    const addMembership = async () => {
        let res = await fetch('http://localhost:3000/memberships', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName, lastName, contact, adhar, address, startDate, endDate, MembershipTime,
                "isActive": true
            })
        })
        let data = await res.json()
        let res1 = await fetch('http://localhost:3000/bookmovie')
        let data1 = await res1.json()
        setBookMovieArr(data1)
        setIsMembership(false)
    }



    const [isBookMovie, setIsBookMovie] = useState(false)
    const [bookMovie, setBookName] = useState("")
    const [author, setAuthor] = useState("")
    const [cost, setCost] = useState("")
    const [category, setCategory] = useState("")
    const [procurement, setProcurement] = useState("")
    const [type, setType] = useState("")
    const addBookMovie = async () => {
        let res = await fetch("http://localhost:3000/bookmovie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bookMovie, author, cost, category, procurement, type,
                "isAvailable": true
            })
        })
        let data = await res.json();
        setIsBookMovie(false)
    }


    const [updateMemberDiv, setUpdateMemberDiv] = useState(false)
    const [memberId, setMemberId] = useState("")
    const updateMembership = async (id) => {
        let res = await fetch(`http://localhost:3000/memberships/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "firstName": firstName,
                "contact": contact,
                "address": address,
                "adhar": adhar,
                "startDate": startDate,
                "endDate": endDate,
                "MembershipTime": MembershipTime
            })
        })
        let data = await res.json()
    }

        const [BookMovie, setBookMovie]=useState("")
        const [BookMovieOption,selectBookMovieOption]=useState("")
        const [serialNumber,setSerialNumber] = useState("")
        const [updateStatus,setUpdateStatus]=useState("")


    const updateBookMovie = async() => {
        let res=await fetch(`http://localhost/bookmovie/${serialNumber}`,{
            method:'PATCH',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                bookMovie:BookMovie,
                category:BookMovieOption,
                isAvailable:updateStatus=='available'?true:false

            })
        })
        let data=await res.json()


    }


    const [isUserManagement, setIsUserManagement] = useState(false)
    




    return (
        <>
            <Loginnav />
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div>
                    <h1 className='lhead'>Membership</h1>
                    <button onClick={() => {
                        setIsMembership(true)
                        setIsBookMovie(false)
                        setIsUserManagement(false)
                        setUpdateMemberDiv(false)
                        setIsUpdateBookMovie(false)
                    }}>Add</button>
                    <button onClick={() => {
                        setIsMembership(false)
                        setIsBookMovie(false)
                        setIsUserManagement(false)
                        setUpdateMemberDiv(true)
                        setIsUpdateBookMovie(false)
                    }
                    }
                    >Update</button>
                    <h1 className='lhead'>Books/Movies</h1>
                    <button onClick={() => {
                        setIsBookMovie(true)
                        setIsMembership(false)
                        setIsUserManagement(false)
                        setUpdateMemberDiv(false)
                        setIsUpdateBookMovie(false)
                    }}
                    >Add</button>
                    <button onClick={() => {
                        setIsMembership(false)
                        setIsBookMovie(false)
                        setIsUserManagement(false)
                        setUpdateMemberDiv(false)
                        setIsUpdateBookMovie(true)
                    }}
                    >Update</button>
                    <h1 className='lhead'>User management</h1>
                    <button onClick={() => {
                        setIsUserManagement(true)
                        setIsMembership(false)
                        setIsBookMovie(false)
                        setUpdateMemberDiv(false)
                        setIsUpdateBookMovie(false)
                    }}
                    >Add</button>
                    <button>Update</button>
                </div>
                <div>
                    <div className={isMembership ? 'openDiv' : 'closeDiv'}>
                        <h1>ADD MEMBERSHIP</h1>
                        <input type="text" placeholder="enter first name" onChange={(e) => { setFirstName(e.target.value) }} />
                        <input type="text" placeholder="enter last name" onChange={(e) => { setLastName(e.target.value) }} />
                        <input type="text" placeholder="enter contact " onChange={(e) => { setContact(e.target.value) }} />
                        <input type="text" placeholder="enter your address" onChange={(e) => { setAddress(e.target.value) }} />
                        <input type="text" placeholder="enter adhar no" onChange={(e) => { setAdhar(e.target.value) }} />
                        <input type="date" placeholder="select start date" onChange={(e) => { setStartDate(e.target.value) }} />
                        <input type="date" placeholder="select end date" onChange={(e) => { setEndDate(e.target.value) }} />
                        <label htmlFor='sixmonths'>six months</label>
                        <input type="radio" name="selecttime" id='sixmonths' value={'six months'} onChange={(e) => { setMembershipTime(e.target.value) }} />
                        <label htmlFor='oneyear'>One year</label>
                        <input type="radio" name='selecttime' id='oneyear' value={'one year'} onChange={(e) => { setMembershipTime(e.target.value) }} />
                        <label htmlFor='twoyear'>Two year</label>
                        <input type="radio" name='selecttime' id='twoyear' value={'two year'} onChange={(e) => { setMembershipTime(e.target.value) }} />

                        {/* <input type="text" placeholder="" onChange={(e)=>{setFirstName(e.target.value)}}/> */}
                        <button onClick={addMembership}>ADD</button>

                    </div>

                    <div className={updateMemberDiv ? 'openDiv' : 'closeDiv'}>
                        <h1>UPDATE MEMBERSHIP</h1>
                        <input type="text" placeholder="enter Membership id" onChange={(e) => { setMemberId(e.target.value); }} />
                        {/* {
        
        memberShipArr.map((el)=>{
            console.log(el)
            if(el.id === memberId)
            {
                return (
                    <> */}
                        <input type="text" placeholder="enter Member Name" onChange={(e) => { setFirstName(e.target.value) }} />
                        <input type="text" placeholder="enter contact " onChange={(e) => { setContact(e.target.value) }} />
                        <input type="text" placeholder="enter your address" onChange={(e) => { setAddress(e.target.value) }} />
                        <input type="text" placeholder="enter adhar no" onChange={(e) => { setAdhar(e.target.value) }} />
                        <input type="date" placeholder="select start date" onChange={(e) => { setStartDate(e.target.value) }} />
                        <input type="date" placeholder="select end date" onChange={(e) => { setEndDate(e.target.value) }} />
                        <label htmlFor='sixmonths'>six months</label>
                        <input type="radio" name="selecttime" id='sixmonths' value={'six months'} onChange={(e) => { setMembershipTime(e.target.value) }} />
                        <label htmlFor='oneyear'>One year</label>
                        <input type="radio" name='selecttime' id='oneyear' value={'one year'} onChange={(e) => { setMembershipTime(e.target.value) }} />
                        <label htmlFor='twoyear'>Two year</label>
                        <input type="radio" name='selecttime' id='twoyear' value={'two year'} onChange={(e) => { setMembershipTime(e.target.value) }} />
                        <button onClick={() => { updateMembership(memberId) }}>UPDATE</button>
                        {/* </>
                )
            }
        })
    } */}




                        {/* <input type="text" placeholder="" onChange={(e)=>{setFirstName(e.target.value)}}/> */}

                    </div>

                    <div className={isBookMovie ? 'openDiv' : 'closeDiv'}>
                        <h1>BOOK Movies</h1>
                        <input type="text" placeholder="enter book name" onChange={(e) => { setBookName(e.target.value) }} />
                        <input type="text" placeholder="enter Author name" onChange={(e) => { setAuthor(e.target.value) }} />
                        <input type="text" placeholder="enter Category " onChange={(e) => { setCategory(e.target.value) }} />
                        <input type="text" placeholder="enter Cost " onChange={(e) => { setCost(e.target.value) }} />
                        <input type="date" placeholder="enter Procurement Date" onChange={(e) => { setProcurement(e.target.value) }} />
                        <select onChange={(e) => { setType(e.target.value) }}>
                            <option>Select type</option>
                            <option value={'book'}>Book</option>
                            <option value={'movie'}>Movie</option>
                        </select>

                        {/* <input type="text" placeholder="" onChange={(e)=>{setFirstName(e.target.value)}}/> */}
                        <button onClick={addBookMovie}>ADD</button>

                    </div>


                    <div className={isUpdateBookMovie?'openDiv':'closeDiv'}>
                        <h1>Update movie</h1>
                        <label>Book</label>
                        <input type="radio" name='setbookmovie' value={'book'} onChange={(e)=>{setBookMovie(e.target.value)}}/>
                        <label>Movie</label>
                        <input type="radio" name="setbookmovie" value={'movie'} onChange={(e)=>{setBookMovie(e.target.value)}}/>
                        <label>select book/movie name</label>
                        <select onChange={(e)=>{selectBookMovieOption(e.target.value)}}>
                            <option>select book/movie</option>
                            {
                                bookMovieArr.map((el)=>{
                                    return <option value={el.bookMovie}>{el.bookMovie}</option>
                                })
                            }
                        </select>
                        <input type='text' placeholder='Enter book serial number' onChange={(e)=>{setSerialNumber(e.target.value)}}/>
                        <select onChange={(e)=>{setUpdateStatus(e.target.value)}}>
                            <option>select status</option>
                            <option value={'available'}>Available</option>
                            <option value={'unavailable'}>Unavailable</option>
                            <option value={'removed'}>Removed</option>
                            
                        </select>
                        <button onClick={updateBookMovie}>Update</button>
                    </div>


                    <div className={isUserManagement ? 'openDiv' : 'closeDiv'}>
                        <h1>USER MANAGEMENT</h1>
                        <input type="text" placeholder="enter first name" onChange={(e) => { setFirstName(e.target.value) }} />
                        <input type="text" placeholder="enter last name" onChange={(e) => { setLastName(e.target.value) }} />
                        <input type="text" placeholder="enter contact " onChange={(e) => { setContact(e.target.value) }} />
                        <input type="text" placeholder="enter your address" onChange={(e) => { setAddress(e.target.value) }} />
                        <input type="text" placeholder="enter adhar no" onChange={(e) => { setAdhar(e.target.value) }} />
                        <input type="date" placeholder="select start date" onChange={(e) => { setStartDate(e.target.value) }} />
                        <input type="date" placeholder="select end date" onChange={(e) => { setEndDate(e.target.value) }} />
                        {/* <input type="text" placeholder="" onChange={(e)=>{setFirstName(e.target.value)}}/> */}
                        <button>ADD</button>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Maintain