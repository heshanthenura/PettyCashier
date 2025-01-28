import React from 'react'
import Chart from 'react-apexcharts'
import './expensegraph.css'
import { ApexOptions } from 'apexcharts'

const ExpenseGraph: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false // Disable zooming
      },
      toolbar: {
        show: false // Hide the toolbar
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
    xaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    },

    colors: ['#006D04']
  }

  const chartSeries = [
    {
      name: 'Expense',
      data: [10, 100, 200, 500, 49, 1000, 69]
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
