import "./App.css";
import PianoBoard from "./components/PianoBoard";

const App: React.FC = () => {
  return (
    <>
      <div className='board'>
        <PianoBoard />
      </div>
    </>
  );
};

export default App;
