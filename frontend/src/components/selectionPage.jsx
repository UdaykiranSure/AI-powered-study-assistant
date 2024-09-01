import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileContext } from '../context/fileContext.jsx';

const SelectionPage = () => {
  const navigate = useNavigate();
  const handleConductQuiz =  () => {
    navigate('/quiz');
  };
  const handleAskDoubts = () => {
    navigate('/chat');
  };


  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark group/design-root overflow-x-hidden" style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223749] px-10 py-3">
          {/* Header content */}
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center">What would you like to do?</h2>
            <div className="flex flex-col p-4 items-center gap-4">
              <button
                onClick={handleAskDoubts}
                className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2094f3] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Ask Doubts
              </button>
              <button
                onClick={handleConductQuiz}
                className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2094f3] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Conduct Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
