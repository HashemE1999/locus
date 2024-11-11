import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { format } from "date-fns";

export const CalendarSquare = ({ day }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: day.toString(),
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const [attraction, setAttraction] = useState("");

  useDndMonitor({
    onDragEnd(event) {
      const { over, active } = event;
      if (over.id == day.toString()) {
        const attraction = active.data.current.name;
        setAttraction(attraction);
      }
    },
  });

  function reset(event) {
    event.preventDefault();
    setAttraction("");
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="basis-1/4 block aspect-square max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {format(day, "dd-MMM")}
      </h5>
      <h1>{attraction}</h1>
      {attraction ? <button onClick={reset}>Clear</button> : null}
    </div>
  );
};

export default CalendarSquare;
