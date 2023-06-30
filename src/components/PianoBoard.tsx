import { useEffect } from "react";
import useKeyHandler from "../hooks/useKeyHandler";

export default function PianoBoard() {
  const { activeKeys, handleMouseDown, handleMouseUp } = useKeyHandler();
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeys = ["Db", "Eb", "Gb", "Ab", "Bb"];

  useEffect(() => {
    activeKeys.forEach((key) => console.log(key));
  }, [activeKeys]);
  return (
    <>
      <div className='piano-board'>
        {whiteKeys.map((key) => {
          return (
            <div
              className={`key ${activeKeys.includes(key) ? "active" : ""}`}
              key={key}
              onMouseDown={() => handleMouseDown(key)}
              onMouseUp={handleMouseUp}></div>
          );
        })}
        {blackKeys.map((key) => {
          return (
            <div
              className={`black-key ${key} ${
                activeKeys.includes(key) ? "active" : ""
              }`}
              key={key}
              onMouseDown={() => handleMouseDown(key)}
              onMouseUp={handleMouseUp}></div>
          );
        })}
      </div>
    </>
  );
}
