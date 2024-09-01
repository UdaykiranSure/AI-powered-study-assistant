import React from "react";
import  { useState,useContext } from 'react';
import { FileContext } from "../../context/fileContext.jsx";
import mammoth from 'mammoth';
import { useNavigate} from "react-router-dom"

  
const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const {setFileContext} = useContext(FileContext)
    const navigate = useNavigate()
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  
  const handleNext = () => {
    if (selectedFile) {

      
      const reader = new FileReader();
      
      if (selectedFile.name.endsWith('.docx')) {
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            try {
              const { value: text } = await mammoth.extractRawText({ arrayBuffer });
              console.log(text)
              setFileContext(text);
            } catch (error) {
              console.error('Error reading  file:', error);
            }
          } 
        reader.readAsArrayBuffer(selectedFile);
      }else {
        // Handle other file types if necessary
        console.log(2)
            reader.onload = async(e) =>{
            setFileContext(e.target.result)
        }
        reader.readAsText(selectedFile)
      }

      navigate("/selection")

    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223749] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">EduLearn</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-white text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Courses</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Paths</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Guided Projects</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Community</a>
              <a className="text-white text-sm font-medium leading-normal" href="#">Practice</a>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2094f3] text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Upgrade to Pro</span>
            </button>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h3 className="text-white tracking-light text-2xl font-bold leading-tight px-4 text-center pb-2 pt-5">Take a quiz</h3>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              You can take a quiz on a file you've uploaded. You can also upload a new file and take a quiz on it. Once you're done, you can review the quiz and see your results.
            </p>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Upload a file</h2>
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#314f68] px-6 py-14">
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag and drop a file here</p>
                  <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">or</p>
                </div>
                <input type="file"  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#223749] text-white text-sm font-bold leading-normal tracking-[0.015em]" onChange={handleFileChange} />
               

              </div>
            </div>
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#2094f3] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate" onClick={handleNext}>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
