import React from 'react'
import './widget.css'

interface TransactionProps {
  numberOfTransactions: number
  totalTransactions: number
}

const Transaction: React.FC<TransactionProps> = ({ numberOfTransactions, totalTransactions }) => {
  return (
    <div className="transaction-wrap">
      <h1 className="widget-h1">Number of Transactions</h1>
      <h1 className="widget-v1">{numberOfTransactions}</h1>
      <h1 className="widget-h2">Total Transactions</h1>
      <h1 className="widget-v2">{totalTransactions}</h1>
    </div>
  )
}

export default Transaction
