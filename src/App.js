import logo from './logo.svg';
import './App.css';
import Table from './Components/Table.js';
import UserState from './Components/Context/userState.js';

function App() {
  return (
    <UserState>
    <div className="App">
      
     <Table/>
    </div>
    </UserState>
  );
}

export default App;
