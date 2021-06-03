import './App.css';
import Map from './components/Map';
import MapTrial from './components/trial';
import useHorizontal from '@oberon-amsterdam/horizontal/hook';

function App() {
  useHorizontal();
  return (
    <>
      <div className="block">Hello, scroll further</div>

      <div className="block">Why hello there</div>

      <div className="block">
          <a href="react.html">Whee</a>
      </div>
    </>
  );
}

export default App;
