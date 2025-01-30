import { useMemo, useState } from "react"

const Sample = () => {
  
    const [count,setCount] = useState(0)
    const [inputVal,setInputVal] = useState("")
    const [items,setItems] = useState<string[]>([])
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value)
    }
    const handleAddItem = () =>{
        setItems((prev)=>[...prev,inputVal])
        setInputVal("")
    }
    const memoizedItem = useMemo(()=>{
        return [...items].sort((a,b)=>a.localeCompare(b))
    },[items])
  return (
    <div className="flex flex-col items-center p-4">
        <h1>Count: {count}</h1>
        <button onClick={()=>setCount((prev)=>prev+1)} className="px-4 py-2 bg-gray-500">Increment</button>
        <input className="mt-4" value={inputVal} onChange={handleInput} type="text" placeholder="Add item" />
        <button onClick={handleAddItem} className="px-4 py-2 bg-gray-500">Add Item</button>
        <h1 className="p-4">Items</h1>
        <ul>
            {items.map((item,index)=>
                <li key={index}>{item}</li>
            )}
        </ul>
        <h1 className="p-4">Memoized Items</h1>
        <ul>
            {memoizedItem.map((item,index)=>
                <li key={index}>{item}</li>
            )}
        </ul>
    </div>
  )
}
export default Sample