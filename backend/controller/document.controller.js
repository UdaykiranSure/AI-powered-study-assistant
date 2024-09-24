import Document from "../model/document.model.js"

export const findDoc = async (req,res)=>{
   try { 
    const documentId = req.params.id;
    const fileName = "new notes";
    console.log(documentId,fileName)
    let document = await Document.findById(documentId)
    if(!document){
        document = Document.create({_id:documentId,fileName,data:{},text:""})
    }
    res.status(200).json({data:document.data,fileName})
   } catch (error) {
    console.log("error in finding Document:",error.message)
    res.status(500).json({message:"internal server error"})
   }
}

export const saveDoc = async (req,res)=>{
    try {
        console.log("saving document")
        const documentId = req.params.id
        const data = req.body.data
        const fileName = req.body.fileName
        const text = req.body.text
        await Document.findByIdAndUpdate(documentId,{fileName,data,text})
        console.log("document saved")
        res.status(200).json("document saved")
    } catch (error) {
        console.log("error in saving doc: ",error.message)
        res.status(500).json({message:"internal server error"})
    }
}