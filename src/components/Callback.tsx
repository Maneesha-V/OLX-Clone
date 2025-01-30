import React, { useCallback, useState } from 'react'
const Child = React.memo(({onClick}:any)=>{
    console.log('Child re-rendered');
    return <button onClick={onClick}>Click</button>
})
const Callback = () => {
    const [count,setCount] = useState(0)
    // const handleClick = () =>{
    //     console.log('Button clicked');     
    // }
    const handleClick = useCallback(()=>{
        console.log('Button clicked');   
    },[])
  return (
    <div>
        <h1>Count : {count}</h1>
        <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
        <Child onClick={handleClick} />
    </div>
  )
}

export default Callback