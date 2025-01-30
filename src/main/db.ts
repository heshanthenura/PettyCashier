import path from 'path'
import sqlite3 from 'sqlite3'
import { app } from 'electron'
import fs from 'fs'

// Define the database path
const dbPath = path.join(app.getPath('appData'), 'Heft', 'PettyCashier', 'data.db')

// Log the database path for debugging
console.log('Database Path:', dbPath)

const connectDb = () => {
  // Check if the directory for the database exists, and create it if not
  const dbDirectory = path.dirname(dbPath)
  if (!fs.existsSync(dbDirectory)) {
    console.log('Directory does not exist. Creating:', dbDirectory)
    fs.mkdirSync(dbDirectory, { recursive: true })
  } else {
    console.log('Directory already exists:', dbDirectory)
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message)
    } else {
      console.log('Database opened successfully')
      checkIfTableExists(db, 'transactions', (exists) => {
        if (exists) {
          console.log('Table "transactions" exists.')
        } else {
          console.log('Table "transactions" does not exist.')
          createTable(db)
        }
      })
    }
  })
  return db
}

// Function to check if the table exists
const checkIfTableExists = (
  db: sqlite3.Database,
  tableName: string,
  callback: (exists: boolean) => void
) => {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
  db.get(query, (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message)
      callback(false)
    } else {
      callback(row ? true : false)
    }
  })
}

// Function to create the table if it doesn't exist
const createTable = (db) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      payee_from TEXT NOT NULL,
      category TEXT NOT NULL,
      amount REAL NOT NULL
    );
  `

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message)
    } else {
      console.log('Table "transactions" created successfully.')
    }
  })
}

// Function to retrieve transactions
export const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const db = connectDb()

    const query = 'SELECT * FROM transactions'

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error retrieving transactions:', err.message)
        reject(err)
      } else {
        console.log('Transactions retrieved:', rows)
        resolve(rows)
      }
    })
  })
}

export const addTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    const db = connectDb()

    // Get the current date and time in 'YYYY-MM-DD HH:MM:SS' format
    const currentDateTime = new Date().toISOString().replace('T', ' ').split('.')[0]

    // SQL query to insert data
    const query = `
      INSERT INTO transactions (date, description, payee_from, category, amount)
      VALUES (?, ?, ?, ?, ?)
    `
    const values = [
      currentDateTime, // Use the current date and time
      transaction.description,
      transaction.payee_from,
      transaction.category,
      transaction.amount
    ]

    db.run(query, values, function (err) {
      if (err) {
        console.error('Error inserting transaction:', err.message)
        reject(err)
      } else {
        console.log('Transaction added with ID:', this.lastID)
        resolve({ success: true, id: this.lastID })
      }
    })
  })
}
