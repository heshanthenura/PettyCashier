import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import './expensegraph.css'
import { ApexOptions } from 'apexcharts'

const ExpenseGraph: React.FC = () => {
  const [data, setData] = useState<{ date: string; amount: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await window.api.checkStat()
        setData(result.message) // Assuming result.message is an array of transactions
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // Extract x-axis (dates) and y-axis (amounts) from the data
  const amounts = data.map((item) => item.amount)

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 0 // Hide markers
    },
    legend: {
      show: false
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: false // Hide y-axis
    },
    grid: {
      show: false // Hide grid lines
    },
    tooltip: {
      enabled: false // ✅ Disable tooltips completely
    },
    colors: ['#006D04']
  }

  const chartSeries = [
    {
      name: 'Expense',
      data: amounts
    }
  ]

  return (
    <div className="expensegraph-wrap">
      <h1>Expense Graph</h1>
      <Chart options={chartOptions} series={chartSeries} type="line" height={'90px'} />
    </div>
  )
}

export default ExpenseGraph
