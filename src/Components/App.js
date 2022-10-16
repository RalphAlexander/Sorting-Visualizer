import Array from './Array'
import './App.css';

// Returns the App component which renders the entire app
function App() {
  return (
    <>
      <div className='frame'>
      <h1>
        Sorting Visualizer
      </h1>
        <Array />
      </div>
      </>
  );
}

export default App;
