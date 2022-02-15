import Head from "next/head";
import Rulers from "../components/Rulers";
import Cursor from "../components/Cursor";
import Dashboard from "../components/Dashboard";
import React, { useState, useEffect } from "react";
import {
  Preset,
  itemsInFractionalHeight,
  rulersFromPreset,
  defaultZerothItems,
} from "../common";

const Home = () => {
  const [preset, updatePreset]: [
    Preset,
    React.Dispatch<React.SetStateAction<Preset>>
  ] = useState<Preset>("interval");
  const [cursorPosition, updateCursorPosition] = useState(0);
  const [numSlotsOnPage, updateNumSlotsOnPage] = useState(10);

  const initializeZerothItems = (currentPreset?: Preset): string[] => {
    let defaults: string[] = [];
    rulersFromPreset[currentPreset ?? (preset as Preset)].forEach((ruler) => {
      defaults.push(defaultZerothItems[ruler]);
    });
    return defaults;
  };
  const [zerothItems, updateZerothItems] = useState<string[]>(
    initializeZerothItems()
  );

  const handleUpdatePreset = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPreset = e.currentTarget.value;
    updatePreset(newPreset as Preset);
    updateZerothItems(() => initializeZerothItems(newPreset as Preset));
  };

  const handleUpdateCursorPosition = (e: { dy: number }): void => {
    const itemHeight = 36;
    updateCursorPosition(
      (cursorPosition) => cursorPosition + e.dy / itemHeight
    );
  };

  const handleUpdateZerothItem = (index: number, item: string) => {
    updateZerothItems((zerothItems) => [
      ...zerothItems.slice(0, index),
      item,
      ...zerothItems.slice(index + 1),
    ]);
  };

  // once we are able to run client-side code to check the
  // window height, move the cursor a bit more than halfway down the page
  useEffect(() => {
    updateCursorPosition(itemsInFractionalHeight(0.6));
    updateNumSlotsOnPage(Math.ceil(window.innerHeight / 36));
  }, []);

  return (
    <>
      <Head>
        <title>Diatonic Ruler</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This website displays interactive diatonic rulers to let you explore relationships between pitch, scale degrees and positions, intervals, and more."
        />
      </Head>
      <main id="container">
        <Dashboard
          preset={preset}
          handleUpdate={handleUpdatePreset}
          zerothItems={zerothItems}
          cursorPosition={cursorPosition}
        />
        <div id="rulers_container">
          <Cursor
            position={cursorPosition}
            updatePosition={handleUpdateCursorPosition}
          />
          <Rulers
            numSlots={numSlotsOnPage}
            zerothItems={zerothItems}
            updateRulers={handleUpdateZerothItem}
            preset={preset}
          />
        </div>
        <style jsx>{`
          #container {
            height: 100%;
            width: auto;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            overflow-y: hidden;
          }
          #rulers_container {
            height: 100%;
            display: flex;
            justify-content: center;
            position: relative;
          }
          @media (min-width: 600px) {
            #rulers_container {
              margin: 0 2rem 0 1rem;
            }
          }
          @media (min-width: 900px) {
            #rulers_container {
              margin: 0 4rem 0 2rem;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default Home;
