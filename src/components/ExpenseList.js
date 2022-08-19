import Item from "./ExpenseItem"
import {MdDelete} from "react-icons/md"
const ExpenseList = ({expense,handleEdit,handleDelete,clearItems}) => {
    return ( <>
    <ul className="list">

  {expense.map(item=>(
     <Item key={item.id} expense={item} handleDelete={handleDelete} handleEdit={handleEdit}/>
  ))}
    </ul>
    {expense.length > 0 && <button onClick={clearItems} className="btn">clear expenses <MdDelete className="btn-icon"/> </button>}
    </>  );
}
 
export default ExpenseList;