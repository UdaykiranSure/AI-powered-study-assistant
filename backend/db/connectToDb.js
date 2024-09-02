import mongoose from "mongoose"

const connectToDatabase = async ()=>{
    const url = 'mongodb+srv://admin1:connect%40admin@cluster0.muz9pwz.mongodb.net/notes-app?retryWrites=true&w=majority&appName=Cluster0'
    try {
        await mongoose.connect(url)
        console.log("connected to database")
    } catch (error) {
        console.log("error connecting to database : ",error.message)
    }
}
export default connectToDatabase