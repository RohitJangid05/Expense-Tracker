import { IoWallet } from "react-icons/io5";
import { IoPieChart } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { ExpenseContext } from "../ContextApi/ExpenseContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
  let {setForm}=useContext(ExpenseContext)
  return (
    <div className="sm:hidden p-2 fixed top-[85vh] w-full">
      <div className="bg-sky-950 px-3 py-6 flex text-4xl justify-evenly items-center text-white rounded-full">
        <Link to={"/"}><IoWallet /></Link>
        <Link to={"/debt-summary"}><IoPersonAddSharp /></Link>
        <Link to={"/pie-chart"}><IoPieChart /></Link>
        <FaPlus onClick={() => setForm(prev => !prev)}/>
      </div>
    </div>
  )
}

export default BottomNavbar
