import React from "react";
import interact from "interactjs";
import reactable from "reactablejs";

interface CursorProps {
  position: number;
  updatePosition: (e: { dy: number }) => void;
}

interface CursorBaseProps {
  position: number;
  getRef: React.Ref<HTMLDivElement>;
}

const ITEM_HEIGHT = 36;

const CursorBase = (props: CursorBaseProps) => {
  return (
    <>
      <div id="cursor" ref={props.getRef} />
      <style jsx>{`
        #cursor {
          border: 2px solid #9791cf;
          border-right-width: 20px;
          border-left-width: 20px;
          border-radius: 5px;
          height: ${ITEM_HEIGHT}px;
          width: calc(100% + 20px);
          position: absolute;
          z-index: 1;
          background: rgba(200, 200, 250, 0.25);
          transition: 0.05s;
          top: ${props.position * ITEM_HEIGHT}px;
        }
      `}</style>
    </>
  );
};

const Reactable = reactable(CursorBase);

const Cursor = (props: CursorProps) => {
  const gridTarget = interact.snappers.grid({
    x: 1,
    y: ITEM_HEIGHT,
  });

  return (
    <Reactable
      position={props.position}
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
      onDragMove={(e) => {
        props.updatePosition(e);
      }}
    />
  );
};

export default Cursor;
