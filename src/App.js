import './App.css';
import {React , Component, setState} from 'react';
import userimage from './userprofileimage.png';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: "test",
      userData: [],
      searchFeild: ""
      
    };
     
    const colors = [
      '#2196f3','#f43f5e','#ec4899','#d946ef','#a855f7','#8b5cf6','#6366f1',
      '#3b82f6','#0ea5e9','#06b6d4','#14b8a6','#10b981','#22c55e','#84cc16',
      '#eab308','#f59e0b','#f97316','#ef4444'];
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({userData: data}))

    setInterval(() => {
      const color = colors[Math.floor(Math.random()*colors.length)]
      document.body.style.setProperty('--background', color)
    }, 3000)

  }

  updateUserDisplay = (event) => {
    const searchFeild = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchFeild}
    })
  }

  render () {

    const updatedArray = this.state.userData.filter((user) => {
      return user.name.toLocaleLowerCase().includes(this.state.searchFeild);
    });

    return (
      <div className="userApiPage">
        <h1 className="title">Username Api Display</h1>
        <input type="search" placeholder="Search Users" className="searchBar" onChange={this.updateUserDisplay}></input>
        <div className="userCard">
          {updatedArray.map(user => (
            <div key={user.id} className="cardLayout">
              <img src={userimage} className="userImage"></img>
              <p><b>User Name:</b> {user.name}</p>
              <p><b>User Email:</b> {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
