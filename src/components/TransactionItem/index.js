// Write your code here
const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails
  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }
  return (
    <li>
      <div>
        <p>{title}</p>
        <p>{amount}</p>
        <p>{type}</p>
        <button
          onClick={onDeleteTransaction}
          data-testid="delete"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
