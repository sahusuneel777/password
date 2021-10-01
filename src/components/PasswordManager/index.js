import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    InitialPasswordList: [],
    enteredWebsite: '',
    enteredUsername: '',
    enteredPassword: '',
    showPassword: false,
  }

  onAddPasswordDetails = event => {
    event.preventDefault()
    const {enteredWebsite, enteredUsername, enteredPassword} = this.state

    const newPassword = {
      id: uuidv4(),
      website: enteredWebsite,
      username: enteredUsername,
      password: enteredPassword,
    }

    this.setState(prevState => ({
      InitialPasswordList: [...prevState.InitialPasswordList, newPassword],
      enteredWebsite: '',
      enteredUsername: '',
      enteredPassword: '',
      searchWebsiteInput: '',
    }))
  }

  searchWebsitePasswords = event => {
    this.setState({searchWebsiteInput: event.target.value})
  }

  getFilteredPasswordList = () => {
    const {InitialPasswordList, searchWebsiteInput} = this.state

    const filteredPasswordList = InitialPasswordList.filter(eachPassword =>
      eachPassword.website.includes(searchWebsiteInput),
    )
    return filteredPasswordList
  }

  onChangeWebsite = event => {
    this.setState({enteredWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({enteredUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({enteredPassword: event.target.value})
  }

  onDeletePassword = id => {
    const {InitialPasswordList} = this.state
    const filterUserPasswords = InitialPasswordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({InitialPasswordList: filterUserPasswords})
  }

  displayPasswordHistory = () => {
    const filteredPasswordList = this.getFilteredPasswordList()
    const {showPassword} = this.state

    return filteredPasswordList.length > 0
      ? filteredPasswordList.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            onDeletePassword={this.onDeletePassword}
            showPassword={showPassword}
          />
        ))
      : this.noPasswords()
  }

  noPasswords = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-password-img"
        alt="no passwords"
      />
      <p className="passwordCount-heading">No Passwords</p>
    </div>
  )

  showPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      enteredWebsite,
      enteredUsername,
      enteredPassword,
      InitialPasswordList,
    } = this.state
    console.log(InitialPasswordList)

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="InputPasswords-container">
          <form
            className="password-form-container"
            onSubmit={this.onAddPasswordDetails}
          >
            <h1 className="form-heading">Add New Password</h1>
            <div className="form-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-image"
              />
              <hr className="separator" />
              <input
                type="text"
                placeholder="Enter Website"
                className="form-input"
                onChange={this.onChangeWebsite}
                value={enteredWebsite}
              />
            </div>
            <div className="form-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website-image"
              />
              <hr className="separator" />
              <input
                type="text"
                placeholder="Enter Username"
                className="form-input"
                value={enteredUsername}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-image"
              />
              <hr className="separator" />
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input"
                value={enteredPassword}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="Add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager"
            alt="password manager"
          />
        </div>
        <div className="savedPassWords-container">
          <nav className="navBar">
            <div className="saved-passwords-count">
              <h1 className="passwordCount-heading">Your Passwords</h1>
              <p className="count">{InitialPasswordList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <hr className="separator" />
              <input
                type="search"
                className="form-search-input"
                placeholder="Search"
                onChange={this.searchWebsitePasswords}
              />
            </div>
          </nav>
          <hr className="separator" />
          <div className="checkBox">
            <input id="check" type="checkBox" onClick={this.showPasswords} />
            <label htmlFor="check" className="showpasswords">
              Show Passwords
            </label>
          </div>

          <ul className="passwords-list-container">
            {InitialPasswordList.length > 0
              ? this.displayPasswordHistory()
              : this.noPasswords()}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
