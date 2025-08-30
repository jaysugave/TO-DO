import { useState ,useRef} from 'react'
import "./index.css";

    const todolist="mylocalstorage";
export default function App() {
  const [list,setList]=useState(()=>{
      const rawtodo=localStorage.getItem(todolist);
      if(!rawtodo){
          return [];
          }
      return JSON.parse(rawtodo);
      });
  const inputRef=useRef(null);
    localStorage.setItem(todolist, JSON.stringify(list));

  function addinlist(){
    const newitem=inputRef.current.value;
    if(newitem!==""){
      setList([...list,newitem]);
    } else {
      alert("ADD A TASK FIRST ");
    }
    inputRef.current.value="";
  }

  function deleteitem(index) {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  }

  function deleteall(){
    if(list.length>0){
      setList([]);
    }
    else{
      alert("THERE'S NOTHING IN TASKS ");
    }
  }

  return (
    <div className="container">
      <h1>TO DO</h1>

      <div className="input-box">
        <input ref={inputRef} placeholder="ADD TASKS IN LIST" />
        <button onClick={addinlist}>Add</button>
      </div>

      <button className="delete-all" onClick={deleteall}>Delete All Tasks</button>

      <ul>
        {list.map((item,index)=>(
          <li key={index}>
            {item}
            <button className="delete-btn" onClick={() => deleteitem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
