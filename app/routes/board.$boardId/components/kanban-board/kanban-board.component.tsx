import * as React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./kanban-board.css";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function KanBanBoard() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = React.useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  console.log({ parent });

  function handleDragEnd(event) {
    const { over } = event;
    console.log("OVER -->", over);

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
  return (
    <div className="kanban-board">
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Droppable key={id} id={id}>
            <div
              style={{
                backgroundColor: "red",
                height: "200px",
                width: "200px",
              }}
            >
              {parent === id ? draggableMarkup : "Drop here"}
            </div>
          </Droppable>
        ))}
      </DndContext>
    </div>
  );
}
