import { startOfToday, add, eachDayOfInterval, format } from "date-fns";
import { useState } from "react";

const Calendar = () => {
  const today = startOfToday();
  const [startWeek, setStartWeek] = useState(() => format(today, "dd-MMM"));

  let endOfWeek = add(today, {
    weeks: 1,
  });

  let currWeek = eachDayOfInterval({
    start: today,
    end: endOfWeek,
  });

  const [week, setWeek] = useState(currWeek);

  const getWeek = () => {
    let endOfWeek = add(startWeek, {
      weeks: 1,
    });
    setWeek(
      eachDayOfInterval({
        start: today,
        end: endOfWeek,
      })
    );
  };

  return (
    <>
      <div className="flex flex-row flex-wrap">
        {week.map((day) => (
          <div
            key={day}
            className="basis-1/4 block aspect-square max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {format(day, "dd-MMM")}
            </h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
