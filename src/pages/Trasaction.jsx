import React, { useEffect, useState } from 'react'
import Loginnav from './Loginnav'

const Trasaction = () => {
    const [isBookAvailable, setBookAvailable] = useState(false)
    const [isIssueBook, setIssueBook] = useState(false)
    const [isReturnBook, setReturnBook] = useState(false)
    const [isPayFine, setPayFine] = useState(false)
    const [isBooksearch, setBooksearch] = useState(false)
    const [isSearchBook, setSearchBook] = useState(false)
    const [dataArr, setDataArr] = useState([])
    const [bookname, setBookName] = useState("")
    const [author, setAuthor] = useState("")
    const [searchArr, setSearchArr] = useState([])
    const [bookName, setbookName] = useState("")
    const [Author, setauthor] = useState("")
    const [issuedate,setIssuedate] = useState("")
    const [returndate, setReturndate] = useState("")
    const [flag, setflag] = useState(false)
    const [userActive, setuserActive] = useState([])
    const [returnBookName,setReturnBookName] = useState("")
    const [returnBookSerialNo, setreturnBookSerialNo] = useState(0)
    const [returnBookIssueDate, setreturnBookIssueDate] = useState("")
    const [returnBookRetrunDate, setreturnBookRetrunDate] = useState("")


    const getData = async () => {
        let res = await fetch('http://localhost:3000/bookmovie');
        let data = await res.json();
        setDataArr(data)
        let res1=await fetch('http://localhost:3000/currentuser')
        let data1=await res1.json();
        setuserActive(data1)
        console.log(data1)

    }
    useEffect(() => {
        getData()
    }, [])

    const search = () => {
        console.log(dataArr)
        console.log(bookname);
        console.log(author);
        dataArr.forEach(el => {
            if (el.bookMovie === bookname && el.author === author) {
                setSearchArr([...searchArr,el])
                console.log(searchArr)
            }
        });
        setSearchBook(true)
        setBooksearch(false)


        console.log(searchArr);
    }
    const issueBook=()=>{
        // let flag=false
        console.log("issueBook entry")
        console.log(bookName)
        console.log(Author)
        dataArr.forEach(async(el) => {
            if (el.bookMovie == bookName && el.author == Author) {
               setflag(!flag)
               
            //    console.log(id,el.bookMovie,bookName,el.author,Author)
               let res = await fetch(`http://localhost:3000/bookmovie/${el.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                isAvailable: false,
                issueDate:issuedate,
                returndate: returndate,
                membersId:userActive.id

            })
        })
        let data=await res.json()
        console.log(data)
        console.log("book issued")
            }
        });
        flag? document.write("trasaction completed"):"" 

    }

    const returnBook=async()=>{
       

        dataArr.map(async(e)=>{
            if(e.bookMovie==returnBookName){
                let res=await fetch('http://localhost:3000/bookmovie',{
                    method:'PATCH',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        isAvailable:true,
                        returndate:"",
                        issueDate:"",
                        membersId:""
                    })
                })
                let data=await res.json()
            }
        })
    }


    
    
    return (
        <>
            <Loginnav />
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div>
                    <h3 onClick={() => {
                        setBookAvailable(true)
                        setIssueBook(false)
                        setReturnBook(false)
                        setPayFine(false)
                        setBooksearch(true)
                    }
                    }>Is Book Available</h3>
                    <h3 onClick={() => {
                        setBookAvailable(false)
                        setIssueBook(true)
                        setReturnBook(false)
                        setPayFine(false)
                        setBooksearch(false)
                    }}>Issue Book</h3>
                    <h3 onClick={() => {
                        setBookAvailable(false)
                        setIssueBook(false)
                        setReturnBook(true)
                        setPayFine(false)
                        setBooksearch(false)
                    }}>return book</h3>
                    <h3 onClick={() => {
                        setBookAvailable(false)
                        setIssueBook(false)
                        setReturnBook(false)
                        setPayFine(true)
                        setBooksearch(false)
                    }}>pay Fine</h3>
                </div>
                <div>
                    <div className={isBookAvailable ? 'openDiv' : 'closeDiv'}>
                        <div className={isBooksearch ? 'openDiv' : 'closeDiv'}>
                            <h2>Book Availability</h2>
                            <label>Enter book name</label>
                            <select onChange={(e) => setBookName(e.target.value)}>
                                <option>select Book</option>
                                {
                                    dataArr.map((e) => {
                                        return (
                                            <option value={e.bookMovie}>{e.bookMovie}</option>
                                        )
                                    })
                                }
                            </select>
                            <br></br>
                            <label>Enter author name</label>
                            <select onChange={(e) => setAuthor(e.target.value)}>
                                <option>select Author</option>
                                {
                                    dataArr.map((e) => {
                                        return (
                                            <option value={e.author}>{e.author}</option>
                                        )
                                    })

                                }
                            </select><br></br>
                            <button onClick={() => { search() }
                            }>Search</button>
                        </div>
                        <div className={isSearchBook ? 'openDiv' : 'closeDiv'}>
                            <h2>searchbook</h2>
                            <table>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Author Name</th>
                                    <th>Serial Number</th>
                                    <th>Available</th>
                                    <th>Select to issue book</th>
                                </tr>
                                {
                                    searchArr.map((e) => {
                                        return (
                                            <tr>
                                                <td>{e.bookMovie}</td>
                                                <td>{e.author}</td>
                                                <td>{e.id}</td>
                                                <td>{e.isAvailable ? "yes" : "no"}</td>
                                                <td>{e.isAvailable ?
                                                    <input
                                                        type='radio'
                                                        onChange={() => {
                                                            setSearchBook(false)
                                                            setIssueBook(true)
                                                        }} /> : ""}</td>
                                            </tr>
                                        )
                                    })
                                }



                            </table>
                            <button onClick={() => {
                                setBooksearch(true)
                                setSearchBook(false)
                            }}>Back</button>
                        </div>
                    </div>
                    <div className={isIssueBook ? 'openDiv' : 'closeDiv'}>
                            <h1>Issue Book</h1>
                            <label>Select Book</label>
                            <select onChange={(e)=>{setbookName(e.target.value)}}>
                                <option>select book name</option>
                                {
                                    dataArr.map((el)=>{
                                        if(el.isAvailable==true){
                                            return <option value={el.bookMovie}>{el.bookMovie}</option>
                                        }
                                        
                                    })
                                }
                            </select>
                            <label>Select author </label>
                            <select  onChange={(e)=>{setauthor(e.target.value)}}>
                            <option>select author</option>
                                {
                                    dataArr.map((el)=>{
                                        if(el.isAvailable==true){
                                            return <option value={el.author}>{el.author}</option>
                                        }
                                    })
                                }
                            </select>
                            
                            <input type='date' placeholder='issue date' onChange={(e)=>{setIssuedate(e.target.value)}}/>
                            <input type='date' placeholder='return date' onChange={(e)=>{setReturndate(e.target.value)}}/>
                            <button>Cancel</button>
                            <button onClick={issueBook}>Confirm</button>
                    </div>
                    <div className={isReturnBook ? 'openDiv' : 'closeDiv'}>
                                <h1>Return Book</h1>
                                <label>Book Name</label>
                                <select onChange={(e)=>{setReturnBookName(e.target.value)}}>
                                <option>select book</option>
                                    {dataArr.map((e)=>{
                                        if(e.isAvailable==false)
                                        {
                                            return <option value={e.bookMovie}>{e.bookMovie}</option>
                                        }
                                    })}
                                </select>
                                <input type="text" placeholder="enter serial number" onChange={(e)=>{setreturnBookSerialNo(e.target.value)}}/>
                                <input type="date" placeholder="enter issue data" onChange={(e)=>{setreturnBookIssueDate(e.target.value)}}/>
                                <input type="date" placeholder="enter issue data" onChange={(e)=>{setreturnBookRetrunDate(e.target.value)}}/>
                                <button onClick={returnBook}>Return book</button>


                    </div>
                    <div className={isPayFine ? 'openDiv' : 'closeDiv'}>

                    </div>


                </div>

            </div>
        </>
    )
}

export default Trasaction