/*global chrome*/

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Status from './component/status';
import Dash from './component/dash';

function App() {

  console.log("hi")
  const [tab, setTab] = useState(0);

  // useEffect(() => {
  //   chrome.storage.local.get(["bad"], (result) => {
  //     console.log(result)
  //     alert(result)
  //   });
  // chrome.storage.local.get(["current"], (result) => {
  //     console.log(result)
  //     alert(result)
  //   });
  // }, [])

  return (
    <div className="App p-8 pb-16 w-full h-[100vh] bg-[#1F1F1F] text-[#FC93AD]">
      <div className='flex flex-row gap-4'>
        <div
          onClick={() => setTab(0)}
          className={` transition-all duration-300 font-semibold w-20 p-2 ${tab == 0 ? "bg-[#5AFE73] text-black" : "text-[#CDCDCD]"} rounded-t-3xl`} >
          Status
        </div>
        <div
          onClick={() => setTab(1)}
          className={` transition-all duration-300 font-semibold w-32 p-2 ${tab == 1 ? "bg-[#5AFE73] text-black" : "text-[#CDCDCD]"} rounded-t-3xl`}>
          DashBoard
        </div>
      </div>
      <div className={`w-full p-4 bg-[#5AFE73] rounded-r-xl transition-all duration-200 ${tab==1?"rounded-l-xl":""} h-full`}>
        {
          tab===0?(
            <Status/>
          ) : (
            <Dash/>
          )
        }
      </div>
    </div>
  );
}

export default App;
