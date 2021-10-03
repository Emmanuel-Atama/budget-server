/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import { useEffect } from 'react';
import { useStore } from './state/store';

function App() {
  const {
    loadExpenses,
    loadIncome
  } = useStore(state => state);

  useEffect(() => {
    loadExpenses();
    loadIncome();
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
