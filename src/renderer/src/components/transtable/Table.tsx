import React, { useEffect, useState } from 'react'
import './table.css'

function Table() {
  const [data, setData] = useState([])
  const [showAlert, setShowAlert] = useState(false) // 🚀 Alert state
  const [formData, setFormData] = useState({
    description: '',
    payee_from: '',
    category: 'other',
    amount: ''
  })

  const fetchTransactions = async () => {
    const response = await window.api.checkStat()
    console.log(response.message)
    setData(response.message) // Update state with the new data
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateForm = () => {
    const { description, payee_from, amount } = formData

    if (!description.trim() || !payee_from.trim() || !amount.trim()) {
      setShowAlert(true)
      return false
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      setShowAlert(true)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log(formData)
    const response = await window.api.addData(formData)
    console.log(response)

    setFormData({
      description: '',
      payee_from: '',
      category: 'other',
      amount: ''
    })

    fetchTransactions()
    window.electron.ipcRenderer.send('data-updated')
  }

  return (
    <div className="table-body">
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h1>Error</h1>
            <p>Please enter valid data!</p>
            <button onClick={() => setShowAlert(false)}>OK</button> {/* Hide alert */}
          </div>
        </div>
      )}

      <form className="add-data" onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="payee_from"
          id="payee_from"
          placeholder="payee/from"
          value={formData.payee_from}
          onChange={handleInputChange}
        />
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="other" selected>
            Other
          </option>
        </select>
        <input
          type="text"
          name="amount"
          id="amount"
          placeholder="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <input type="submit" value="Add" />
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID/Date</th>
            <th>Description</th>
            <th>Payee/From</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="date-id">
                    <h1>{item.id}</h1>
                    <h6>{item.date}</h6>
                  </div>
                </td>
                <td>{item.description}</td>
                <td>{item.payee_from}</td>
                <td>{item.category}</td>
                <td>${item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
