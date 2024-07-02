/*global chrome*/

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Status from './component/status';
import Dash from './component/dash';

function App() {

  console.log("hi")
  const [tab, setTab] = useState(0);
  const [good, setGood] = useState(null);
  const [bad, setBad] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["bad"], (result) => {
      console.log(result)
      setBad(result.bad)
      // alert(result)
    });
    chrome.storage.local.get(["good"], (result) => {
      console.log(result)
      setGood(result.good)
      // alert(result)
    });
    chrome.storage.local.get(["current"], (result) => {
      console.log(result)
      setCurrent(result.current)
      // alert(result)
    });
    chrome.storage.local.get(["allowed"], (result) => {
      console.log(result)
      // setCurrent(result.current)
      // alert(result)
    });
  }, [])

  return (
    <div className="App p-8 pb-16 overflow-hidden w-full h-[100vh] gap-4 bg-[#1F1F1F] text-[#FC93AD] flex flex-col">
      <div className='text-white text-xl font-bold mr-auto'>
        CyberSecure
      </div>
      <div className='w-full h-full'>
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
        <div className={`w-full p-4 bg-[#5AFE73] flex gap-12 flex-col rounded-r-xl transition-all duration-200 ${tab == 1 ? "rounded-l-xl" : ""} h-full`}>

          {
            tab === 0 ? (
              <div className='flex flex-col gap-12'>
                {
                  current &&
                  <p className='text-black text-lg font-semibold overflow-hidden p-2'>{current.url}</p>
                }
                <Status current={current} />
              </div>
            ) : (
              <Dash good={good} bad={bad} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
