import { useEffect, useState } from "react";

const useMidiReceiver = () => {
  const [data, setData] = useState<Uint8Array | null>(null);
  useEffect(() => {
    navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        const inputs = midiAccess.inputs.values();
        for (const input of inputs) {
          input.onmidimessage = handleMidiMessage;
        }
      })
      .catch((error) => {
        console.error("Błąd MIDI:", error);
      });
  }, []);

  const handleMidiMessage = (event: WebMidi.MIDIMessageEvent) => {
    setData(event.data);
  };

  return { data };
};

export default useMidiReceiver;
