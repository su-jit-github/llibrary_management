import React, { useEffect, useState } from 'react'
import Loginnav from './Loginnav'
import { useSearchParams } from 'react-router-dom'

const Reports = () => {
    const [booklist, isBookOpen] = useState(false)
    const [movielist, isMovieOpen] = useState(false)
    const [memberlist, isMemberOpen] = useState(false)
    const [memberArr, setMemberArr] = useState([])
    const [bookmovieArr, setBookMovieArr] = useState([])

    const getData = async () => {
        let member = await fetch("http://localhost:3000/memberships")
        let memberData = await member.json()
        let bookmovie = await fetch("http://localhost:3000/bookmovie")
        let bookmovieData = await bookmovie.json()
        setMemberArr(memberData)
        setBookMovieArr(bookmovieData)

    }
    useEffect(() => {
        getData()
    }, [])



    return (
        <>
            <Loginnav />
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div>
                    <h1 className='lhead' onClick={() => {
                        isBookOpen(true)
                        isMemberOpen(false)
                        isMovieOpen(false)
                    }}>List of Books</h1>
                    <h1 className='lhead' onClick={() => {
                        isMovieOpen(true)
                        isBookOpen(false)
                        isMemberOpen(false)
                    }} 
                    >List of Movies</h1>
                    <h1 className='lhead' onClick={() => {
                        isMemberOpen(true)
                        isBookOpen(false)
                        isMovieOpen(false)
                    }}>List of Members</h1>
                </div>
                <div>
                    <div className={booklist ? 'openDiv' : 'closeDiv'}>
                        <table>
                            <tr>
                                <th>Serial no</th>
                                <th>Name of Book</th>
                                <th>Author Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Cost</th>
                                <th>Type</th>
                                <th>Procurement Date</th>

                            </tr>
                            {
                                bookmovieArr.map((el) => {
                                    if(el.type === 'book'){
                                    return (
                                        <tr>
                                            <td>{el.id}</td>
                                            <td>{el.bookMovie}</td>
                                            <td>{el.author}</td>
                                            <td>{el.category}</td>
                                            <td>{el.isAvailable ? "available" : "not available"}</td>
                                            <td>{el.cost}</td>
                                            <td>{el.type}</td>
                                            <td>{el.procurement}</td>
                                        </tr>
                                    )
                                    }
                                })
                            
                            }
                        </table>
                    </div>
                    <div className={movielist ? 'openDiv' : 'closeDiv'}>
                        <table>
                            <tr>
                                <th>Serial no</th>
                                <th>Name of Book</th>
                                <th>Author Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Cost</th>
                                <th>Type</th>
                                <th>Procurement Date</th>

                            </tr>
                            {
                                
                                bookmovieArr.map((el) => {
                                
                                    if(el.type==='movie') {
                                    return (
                                        <tr>
                                            <td>{el.id}</td>
                                            <td>{el.bookMovie}</td>
                                            <td>{el.author}</td>
                                            <td>{el.category}</td>
                                            <td>{el.isAvailable ? "available" : "not available"}</td>
                                            <td>{el.cost}</td>
                                            <td>{el.type}</td>
                                            <td>{el.procurement}</td>
                                        </tr>
                                    )
                                    }
                                })
                            }
                        </table>
                    </div>

                    <div className={memberlist ? 'openDiv' : 'closeDiv'}>
                        <table>
                            <tr>
                                <th>Membership Id</th>
                                <th>Name of Member</th>
                                <th>Contact Number</th>
                                <th>Contact Address</th>
                                <th>Adhar no</th>
                                <th>Start date of Membership</th>
                                <th>End date of Membership</th>
                                <th>Status</th>
                                <th>Amount Fine</th>

                            </tr>
                            {
                                memberArr.map((el) => {

                                    return (
                                        <tr>
                                            <td>{el.id}</td>
                                            <td>{el.firstName + el.lastName}</td>
                                            <td>{el.contact}</td>
                                            <td>{el.address}</td>
                                            <td>{el.adhar}</td>
                                            <td>{el.startDate}</td>
                                            <td>{el.endDate}</td>
                                            <td>{el.isActive ? "available" : "not available"}</td>
                                            <td>none</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Reports