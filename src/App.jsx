import BottomNavbar from './components/BottomNavbar'
import { Routes, Route } from "react-router-dom";
import ExpenseDashboard from './pages/ExpenseDashboard'
import ExpenseForm from './components/ExpenseForm';
import DebtSummary from './pages/DebtSummary';
import ExpensePieChart from './pages/ExpensePieChart';

const App = () => {
  return (
    <div className='bg-cyan-900'> 
        <Routes>
          <Route path="/" element={<ExpenseDashboard />} />
          <Route path="/pie-chart" element={<ExpensePieChart />} />
          <Route path="/debt-summary" element={<DebtSummary />} />
        </Routes>
        <ExpenseForm/>
        <BottomNavbar />
    </div>
  )
}

export default App
