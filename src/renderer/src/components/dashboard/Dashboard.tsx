import Expense from '../expense/Expense'
import ExpenseGraph from '../expensegraph/ExpenseGraph'
import Transaction from '../transaction/Transaction'
import './dashboard.css'
function Dashboard() {
  return (
    <div className="dashboard-wrap">
      <div className="widgets-wrap">
        <Transaction totalTransactions={500} numberOfTransactions={10} />
        <Expense expense={500.0} totalExpense={10000.0} />
        <ExpenseGraph />
      </div>
    </div>
  )
}

export default Dashboard
