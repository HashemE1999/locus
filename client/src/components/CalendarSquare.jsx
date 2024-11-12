import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { format } from "date-fns";
import { useEffect } from "react";

export const CalendarSquare = ({ day, existingAttractions }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: day.toString(),
  });
  const style = {
    backgroundColor: isOver ? "gray" : undefined,
  };

  const [attractions, setAttractions] = useState("");

  useEffect(() => {
    if (existingAttractions) {
      setAttractions(existingAttractions);
    }
  }, []);

  useDndMonitor({
    onDragEnd(event) {
      const { over, active } = event;
      if (over.id == day.toString()) {
        const attraction = active.data.current.name;
        setAttractions([...attractions, attraction]);
      }
    },
  });

  function reset(event) {
    event.preventDefault();
    setAttractions([]);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="basis-1/4 relative block aspect-square max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {day.toDateString()}
      </h5>
      {attractions.length
        ? attractions.map((attraction) => (
            <h1 key={attraction} className="text-center text-xs bg-mint mb-1">
              {attraction}
            </h1>
          ))
        : null}
      <button
        className="absolute bottom-2 bg-red-300 hover:bg-red-200 p-1 rounded-md"
        onClick={reset}
      >
        CLEAR
      </button>
    </div>
  );
};

export default CalendarSquare;
