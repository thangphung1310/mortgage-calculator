import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div style={{width: "60%"}}>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
