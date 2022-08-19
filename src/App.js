import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { useState ,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


const initialItems = localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")): []


function App() {
  const [expense, setExpense] = useState(initialItems)
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState("")
  const [alert,setAlert] = useState({show:false})
  const [edit,setEdit] = useState(false)
  const [id,setId] = useState(0)


  useEffect(()=>{
    localStorage.setItem("expense", JSON.stringify(expense))
  },[expense])



  const handleCharge =(e)=>{
    setCharge(e.target.value)
  }
  const handleAmount =(e)=>{
    setAmount(e.target.value)
  }

  const handleAlert =({type,text})=>{
    setAlert({show:true,type,text})
    setTimeout(() => {
      setAlert({show:false}) 
    }, 3000);
  }


  const handleSubmit= e =>{
    e.preventDefault()
    if(charge !== "" && amount >0){
      if(edit){
        const items = expense.map(item=>item.id === id ?  {...item,charge,amount} : item  )
        setExpense(items)
        handleAlert({type:"success",text: "item edited"})
        setEdit(false)
      }else{
        const newItem= {
          id: uuidv4(),
          charge,
          amount
        }
        setExpense([...expense,newItem])
        handleAlert({type:"success",text: "item added"})
      }
      setAmount("")
      setCharge("")
    }else{
      handleAlert({type:"danger",text:`charge can't be empty value and amount value has to be bigger than zero`})
    }
  }

  const handleDelete =(id)=>{
    const filtredItem = expense.filter(item=>item.id !== id)
    setExpense(filtredItem)
    handleAlert({type:"danger",text:"item deleted"})
  }
  const clearItems=()=>{
    setExpense([])
    handleAlert({type:"danger",text:"all items deleted"})
  }

  const handleEdit =(id)=>{ 
    const findItem = expense.find(item =>item.id === id )
    const {charge,amount} = findItem
    setAmount(amount)
    setCharge(charge)
    setEdit(true)
    setId(id)
  }

  return ( 
    <>
     {alert.show && <Alert type={alert.type} text={alert.text} /> } 
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm edit={edit} charge={charge} amount={amount} handleSubmit={handleSubmit} handleCharge={handleCharge} handleAmount={handleAmount}/>
        <ExpenseList clearItems={clearItems} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>
        total spending : <span className="total">${expense.reduce((acc,curr)=>{ return acc += parseInt(curr.amount) },0)}</span>
      </h1>
    </>
  );
}

export default App;
