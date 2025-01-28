import React from 'react'

interface ExpenseProps {
  expense: number
  totalExpense: number
}

const Expense: React.FC<ExpenseProps> = ({ expense, totalExpense }) => {
  return (
    <div className="expense-wrap">
      <h1 className="widget-h1">Expense LKR</h1>
      <h1 className="widget-v1">{expense.toFixed(2)}</h1>
      <h1 className="widget-h2">Total Expense LKR</h1>
      <h1 className="widget-v2">{totalExpense.toFixed(2)}</h1>
    </div>
  )
}

export default Expense
