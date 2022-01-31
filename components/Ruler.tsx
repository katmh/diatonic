import interact from "interactjs";
import reactable from "reactablejs";
import React, { useState } from "react";
import UpDownButtons from "./UpDownButtons";
import { RulerType, Preset } from "../common";
import {
  labelsFromRulerType,
  reverseMapFromRulerType,
  getAt,
  majorScalePositions,
} from "../common";

interface RulerProps {
  itemAtZero: string;
  type: RulerType;
  preset: Preset;
  numSlots: number;
  location: number;
  updateRulers: (index: number, item: string) => void;
}

interface RulerBaseProps {
  itemAtZero: string;
  type: RulerType;
  preset: Preset;
  numSlots: number;
  location: number;
  shift: (e: React.SyntheticEvent, down?: boolean) => void;
  getRef: React.Ref<HTMLDivElement>;
}

const RulerBase = (props: RulerBaseProps) => {
  const [intervalRulerPosition, updateIntervalRulerPosition] = useState(0);
  return (
    <div className="ruler_container no_select">
      <UpDownButtons directionIsUp handleClick={props.shift} />

      <div className="ruler_parent">
        <div className="ruler" ref={props.getRef}>
          {renderRulerItems(
            props.numSlots,
            props.itemAtZero,
            props.type,
            props.preset,
            props.location
          )}
        </div>
      </div>

      <UpDownButtons directionIsUp={false} handleClick={props.shift} />

      <style jsx>{`
        .ruler_container {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .ruler {
          display: flex;
          flex-direction: column;
          text-align: center;
          border: 1px solid #615e7d;
          border-bottom: none;
          position: relative;
          z-index: 0;
          margin: 0 5px;
          background: #fefefe;
          box-shadow: 0 2px 8px rgba(63, 56, 125, 20%);
          transition: 0.05s;
        }
        .no_select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

const Reactable = reactable(RulerBase);

const Ruler = (props: RulerProps) => {
  const ITEM_HEIGHT = 36;
  const gridTarget = interact.snappers.grid({
    x: 1,
    y: ITEM_HEIGHT,
  });

  const moveRuler = (e: any, knownOffset?: number): void => {
    const indexOfCurrentZerothItem = reverseMapFromRulerType[props.type].get(
      props.itemAtZero
    );
    if (typeof indexOfCurrentZerothItem !== "number") {
      throw "Cannot find the index of the ruler's current zeroth item";
    }
    const items = labelsFromRulerType[props.type];

    const offset = knownOffset ?? e.dy / ITEM_HEIGHT;
    const newItem = getAt(items, indexOfCurrentZerothItem - offset);
    props.updateRulers(props.location, newItem);
  };
  const shift = (e: any, down = false): void => moveRuler(e, down ? 1 : -1);

  return (
    <Reactable
      type={props.type}
      preset={props.preset}
      numSlots={props.numSlots}
      itemAtZero={props.itemAtZero}
      location={props.location}
      shift={shift}
      draggable={{
        lockAxis: "y",
        modifiers: [
          interact.modifiers.snap({
            offset: "parent",
            relativePoints: [{ x: 0, y: 0 }],
            targets: [gridTarget],
          }),
        ],
      }}
      onDragMove={(e) => moveRuler(e)}
    />
  );
};

const renderRulerItems = (
  numSlots: number,
  seedItem: string,
  type: RulerType,
  preset: Preset,
  location: number
) => {
  const labels = labelsFromRulerType[type];
  const reverseMap = reverseMapFromRulerType[type];
  const arrOfNumSlotsLength = Array.from(Array(numSlots).keys());

  const getItemGivenZerothItem = (
    i: number,
    itemAtZero: string,
    labels: string[],
    reverseMap: Map<string, number>
  ): string => {
    // return the item in the `items` array (with reverse map `reverseMap`)
    // at index `i` given that `itemAtZero` is the item at the 0th slot of the ruler
    const indexOfItemAtZero = reverseMap.get(itemAtZero);
    if (typeof indexOfItemAtZero === "number") {
      return getAt(labels, i + indexOfItemAtZero);
    }
    throw `Failed to find item at index ${i}, ${itemAtZero} is not in ruler`;
  };

  const Item = (props: { key: number; label: string; classes: string }) => {
    return (
      <div key={props.key} className={props.classes}>
        <span className="label">{props.label}</span>
        <hr className="mark" />
        <style jsx>{`
          .item {
            position: relative;
            padding: 8px min(3vw, 24px);
            display: flex;
            justify-content: center;
          }
          .label {
            display: block;
            position: relative;
            z-index: 1;
            background: #fefefe;
            padding: 0 0.25rem;
            font-size: 20px;
            line-height: 1;
            width: max-content;
          }
          .mark {
            position: absolute;
            width: 100%;
            left: 0;
            top: calc(50% + 1px);
            z-index: 0;
            border-top: 1px solid #615e7d;
            border-bottom: none;
            border-left: none;
            border-right: none;
            margin: 1rem 0;
          }

          .highlight_diatonic,
          .highlight_P1,
          .highlight_written_C {
            background: #615e7d;
          }
          .highlight_diatonic .label,
          .highlight_P1 .label,
          .highlight_written_C .label {
            background: #615e7d;
            color: #fefefe;
          }
          .highlight_diatonic .mark {
            /* so there are borders between consecutive diatonic items */
            border-color: white;
          }
        `}</style>
      </div>
    );
  };

  /*if (type === "interval") {
    return labels.map((label, i) => {
      const isIntervalP1 = label === "P1";
      const classes = `item${isIntervalP1 ? " highlight_P1" : ""}`;
      return <Item key={i} label={label} classes={classes} />;
    });
  }*/

  return arrOfNumSlotsLength.map((_, i) => {
    const label = getItemGivenZerothItem(i, seedItem, labels, reverseMap);

    const isWrittenC =
      preset === "transposing_instrument" && location === 0 && label === "C";
    const isMajorScalePosition =
      type === "position" && majorScalePositions.has(label);

    const classes = `item${isWrittenC ? " highlight_written_C" : ""}${
      isMajorScalePosition ? " highlight_diatonic" : ""
    }`;

    return <Item key={i} label={label} classes={classes} />;
  });
};

export default Ruler;
