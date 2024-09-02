import Quill from 'quill'
import {useCallback,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import 'quill/dist/quill.snow.css'
import '../textEditor/textEditor.css'


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]


const TextEditor = ()=> {
  const {id:documentId } = useParams()

  const [quill,setQuill] = useState()

  const handleSave = async ()=>{
    console.log("saving changes")
    const res = await fetch(`/api/document/${documentId}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
    },
      body: JSON.stringify({data:quill.getContents()})
    })
    console.log(res.json)
  }

  useEffect(()=>{
    const fetchData = async ()=>{
    const res = await fetch(`/api/document/${documentId}`)
    const body = await res.json()
    console.log(body)
    quill.setContents(body)
    }
    fetchData()
    
  },[quill])

  const wrapperRef = useCallback(wrapper=>{
    if(wrapper == null) return 
    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor,{theme:"snow",modules:{toolbar:TOOLBAR_OPTIONS}})
    setQuill(q)
  },[])

  return (  
    <>
    <div><button  onClick={handleSave} >Save</button></div>
    <div className ="textcontainer" ref = {wrapperRef}></div>
    </>
  )
}
export default TextEditor
