import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Main } from './components/layout/Main';
import { useEffect, useState } from 'react';
import { ApiWrapper } from './utils/ApiWrapper';

const apiUrl = 'http://localhost:4000';
const apiWrapper = new ApiWrapper(apiUrl);

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  console.log('In state', expenses, income);

  useEffect(() => {
    apiWrapper.getAllExpenses().then(data => setExpenses(data));
    apiWrapper.getAllIncome().then(data => setIncome(data));
  }, []);

  return (
    <div className="App">

      <Header />

      <div className="container-fluid">
        <div className="row">

          <Sidebar />

          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
