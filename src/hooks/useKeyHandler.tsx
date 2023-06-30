import { useEffect, useState } from "react";
import useMidiReceiver from "./useMidiReceiver";

const useKeyHandler = () => {
  const { data } = useMidiReceiver();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [octave, setOctave] = useState<number>(3);

  const mapKey = (key: string): string => {
    switch (key) {
      case "KeyA":
        return "C" + octave;
      case "KeyS":
        return "D" + octave;
      case "KeyD":
        return "E" + octave;
      case "KeyF":
        return "F" + octave;
      case "KeyG":
        return "G" + octave;
      case "KeyH":
        return "A" + octave;
      case "KeyJ":
        return "B" + octave;
      case "KeyW":
        return "Db" + octave;
      case "KeyE":
        return "Eb" + octave;
      case "KeyT":
        return "Gb" + octave;
      case "KeyY":
        return "Ab" + octave;
      case "KeyU":
        return "Bb" + octave;
      default:
        return "";
    }
  };

  const mapMidiKey = (midiSymbol: number): string => {
    const keyMap: { [key: number]: string } = {
      48: "C",
      49: "Db",
      50: "D",
      51: "Eb",
      52: "E",
      53: "F",
      54: "Gb",
      55: "G",
      56: "Ab",
      57: "A",
      58: "Bb",
      59: "B",
    };

    return keyMap[midiSymbol] || "";
  };

  const handleMouseDown = (key: string) => {
    setActiveKeys((prevKeys) => [...prevKeys, key + octave]);
  };

  const handleMouseUp = (): void => {
    setActiveKeys([]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const mappedKey = mapKey(e.code);
    if (mappedKey && !activeKeys.includes(mappedKey)) {
      setActiveKeys((prevKeys) => [...prevKeys, mappedKey]);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const mappedKey = mapKey(e.code);
    if (mappedKey) {
      setActiveKeys((prevKeys) => prevKeys.filter((key) => key !== mappedKey));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMidiMessage = (data: Uint8Array) => {
    const midiSymbol = data[1];
    const key = mapMidiKey(midiSymbol);
    if (key && !activeKeys.includes(key)) {
      setActiveKeys((prevKeys) => [...prevKeys, key]);
    } else if (key) {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    }
  };

  useEffect(() => {
    if (data) {
      handleMidiMessage(data);
    }
  }, [data]);

  return { activeKeys, handleMouseDown, handleMouseUp };
};

export default useKeyHandler;
