import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, showPassword} = props
  const {id, website, username, password} = passwordDetails
  const onClickDelete = () => {
    onDeletePassword(id)
  }
  const showpasswords = showPassword ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      className="stars"
      alt="Stars"
    />
  )

  return (
    <li className="password-card-container">
      <div className="user-logo">{website[0]}</div>
      <div className="userDetails">
        <p className="user-password-info">{website}</p>
        <p className="user-password-info">{username}</p>
        <p className="user-password-info">{showpasswords}</p>
      </div>
      <button
        type="button"
        className="delete-button"
        testid="delete"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}
export default PasswordItem
