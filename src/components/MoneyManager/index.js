import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',

    amountInput: '',

    optionId: transactionTypeOptions[0].displayText,

    transactionItemsList: [],
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrans => eachTrans.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransactionItem = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionItemsList: [
        ...prevState.transactionItemsList,
        newTransactionItem,
      ],
      titleInput: '',

      amountInput: '',

      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    this.setState(prevState => ({
      transactionItemsList: prevState.transactionItemsList.filter(
        eachOne => id !== eachOne.id,
      ),
    }))
  }

  getIncome = () => {
    let income = 0
    const {transactionItemsList} = this.state
    transactionItemsList.forEach(eachTrans => {
      if (eachTrans.type === 'Income') {
        income += eachTrans.amount
      }
    })
    return income
  }

  getExpenses = () => {
    let expenses = 0
    const {transactionItemsList} = this.state
    transactionItemsList.forEach(eachTrans => {
      if (eachTrans.optionId === 'Expenses') {
        expenses += eachTrans.amount
      }
    })
    return expenses
  }

  getBalance = (income, expenses) => income - expenses

  render() {
    const {
      titleInput,

      amountInput,

      optionId,

      transactionItemsList,
    } = this.state

    const income = this.getIncome()

    const expenses = this.getExpenses()

    const balance = this.getBalance(income, expenses)

    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>Welcome back to your Money Manager</p>
        </div>
        <div>
          <MoneyDetails income={income} expenses={expenses} balance={balance} />
        </div>

        <div>
          <div>
            <form onSubmit={this.onAddTransaction}>
              <h1>Add Transaction</h1>
              <input
                type="text"
                id="text"
                onChange={this.onChangeTitleInput}
                value={titleInput}
              />
              <label htmlFor="text">TITLE</label>
              <input
                type="text"
                id="amount"
                onChange={this.onChangeAmountInput}
                value={amountInput}
              />
              <label htmlFor="amount">AMOUNT</label>
              <select
                onChange={this.onChangeOptionId}
                id="select"
                value={optionId}
              >
                {transactionTypeOptions.map(eachTrans => (
                  <option key={eachTrans.optionId} value={eachTrans.optionId}>
                    {eachTrans.displayText}
                  </option>
                ))}
              </select>
              <label htmlFor="select">TYPE</label>
              <button type="submit">ADD</button>
            </form>
          </div>
          <div>
            <h1>History</h1>
            <ul>
              <li>
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>

              {transactionItemsList.map(eachItem => (
                <TransactionItem
                  key={eachItem.id}
                  transactionDetails={eachItem}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
