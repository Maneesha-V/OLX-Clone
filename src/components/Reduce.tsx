import React, { useReducer } from 'react'
const reducer = (state,action) => {
    switch(action.type){
        case "inc" : return state+1;
        case "dec" : return state-1;
        default : return state;
    }
}
const init = (value:any) => {
    return 2*value;
}
const Reduce = () => {
    const [count,dispatch] = useReducer(reducer,5,init)
  return (
    <div className='flex justify-center'>
        <div className='p-3 items-center flex flex-col'>
            <h1>Count: {count}</h1> 
            <button className='bg-slate-500 p-2 mb-2' onClick={()=>dispatch({type:"inc"})}>Increment</button>
            <button className='bg-slate-500 p-2 mb-2' onClick={()=>dispatch({type:"dec"})}>Decrement</button>
        </div>
    </div>
  )
}

export default Reduce