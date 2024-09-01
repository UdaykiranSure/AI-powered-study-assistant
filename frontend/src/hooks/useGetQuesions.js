import {useState,useContext, useEffect} from "react"
import { FileContext } from "../context/fileContext"

const useGetQuestions = () =>{

    const [loading,setLoading] = useState(false)
    const [questions,setQuestions] = useState([])
    const {fileContext} = useContext(FileContext)


    console.log(1)
    useEffect(()=>{
        console.log(2)
        const getQuestions = async (fileContext) =>{
            setLoading(true)
            console.log(fileContext)
            try {
                const res =  await fetch('/api/generate/questions/1',  {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({text:fileContext})
                });
                const data = await res.json()
                console.log(data.questions)
                if(data.error){
                    throw new Error(data.error)
                }                                                                       
                setQuestions("fuk");
                setTimeout(()=>{
                 console.log(questions)
                },3000)

                setQuestions(data.questions)
                console.log(questions)
                } catch (error) {
                    console.log(error.message)
                } finally{
                    setLoading(false)
                    console.log("now render")
            }
        }
        getQuestions(fileContext)
        
    },[ ])

    return {loading,questions}

}

export default useGetQuestions;