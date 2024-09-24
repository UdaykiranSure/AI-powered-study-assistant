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
  const [fileName,setFileName] = useState(null)
  const [quill,setQuill] = useState()
  const [editing,setEditing] = useState(false)
  const [text,setText] = useState("")

  const startEditing = ()=>{
    // quill.enable(true)
    setEditing(true)
  }

  const handleSave = async ()=>{
    console.log("saving changes")
    const res = await fetch(`/api/document/${documentId}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
    },
      body: JSON.stringify({data:quill.getContents(),fileName,text:quill.getText()})
    })
    console.log(res.json)
  }

 
  useEffect(()=>{
    const fetchData = async ()=>{
    const res = await fetch(`/api/document/${documentId}`)
    const body = await res.json()
    console.log(body)
    quill.setContents(body.data)
    setFileName(body.fileName)
    }
    fetchData()
    
  },[quill])

  const wrapperRef = useCallback(wrapper=>{
    if(wrapper == null) return 
    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor,{theme:"snow",modules:{toolbar:TOOLBAR_OPTIONS}})
    // q.enable(false)
    setQuill(q)
  },[])

  return (  
  
     editing?
      <div><input type="text" placeholder={fileName?fileName:'Enter file name'} onChange={(e)=>setFileName(e.target.value)}/>
      <button disabled= {fileName?false:true}  onClick={handleSave}>Save</button>
      <div className ="textcontainer" ref = {wrapperRef}></div></div>
      :<div><button onClick={startEditing}>Edit</button><div className ="textcontainer" ref = {wrapperRef}></div> </div>
    
    
  )
}
export default TextEditor
