import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'
//useCallback is used to optimize the code it memoize the data it means it stores the function call in cache so function will not run with every re-rendering
//and we have t0 also pass dependencies by changing which our function should store in cache
function App() {
  const [length, setLength]=useState(3);
  const [isNum, setIsNum]=useState(false);
  const [isChar, setIsChar]=useState(false);
  const [password, setPassword]=useState("");
  //useeffect will call passwordgenerator whenever page gets reload or dependencies get changed the difference between usecallback and useeffect is that 
  //usecallback stores function in cache whenever dependencies get changed and useeffect will call function whenever dependencies get changed

//useRef hook it is a reference hook it is used to take reference of any element 
//whent to use whenever we want tot take reference of any elemenet then we use this hook
const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNum){
      s+="0123456789";
    } if(isChar){
      s+="!@#$%^&*(){}[]`~+="
    }
    
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*s.length+1);
      pass+=s.charAt(char);
    }
    setPassword(pass);
    if(pass=="shivam"){
      console.log("hello");
    }
  }, [length,isNum,isChar ]);

 const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,20);
  window.navigator.clipboard.writeText(password);
 },[password])


  useEffect(()=>{passwordGenerator()}, [length, isNum, isChar,passwordGenerator])

  return (
    <>
    <div className="w-full max-w-2xl mx-auto shadow-lg rounded-xl px-8 py-3 my-24 text-gray-800 bg-gray-600 text-center">
      <h1 className='text-2xl my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none border-none w-full py-2 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button className='btn py-4 px-4 text-white outline-none border-none bg-slate-400' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={3} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}  />
          <label className='text-lg font-semibold'>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 ml-4">
          <input type="checkbox" defaultChecked={isNum} id="numberInput" onChange={()=>{setIsNum((prev)=>!prev);}} />
          <label htmlFor="numberInput" className='text-lg font-semibold'>Numbers</label >
        </div>
        <div className="flex items-center gap-x-1 ml-4">
          <input type="checkbox" defaultChecked={isChar} id="charInput" onChange={()=>{setIsChar((prev)=>!prev);}} />
          <label htmlFor="charInput" className='text-lg font-semibold'>Characters</label >
        </div>
      </div>
    </div>
    </>
  )
}

export default App
