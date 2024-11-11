import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRIP } from "../utils/mutations";
import AttractionCard from "../components/AttractionCard";
import { getLocation, getPoints } from "../utils/getLocation";
import fetchPointsOfInterest from "../utils/fetchPointsOfInterest";
import { DndContext, closestCorners } from "@dnd-kit/core";
import CalendarSquare from "../components/CalendarSquare";
import { startOfToday, add, eachDayOfInterval, format } from "date-fns";
import Datepicker from "react-tailwindcss-datepicker";

const TripCreator = () => {
  const [currentTrip, setCurrentTrip] = useState([]);

  const [addTrip, { error, data }] = useMutation(ADD_TRIP);

  const [attractions, setAttractions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const today = startOfToday();

  let endOfWeek = add(today, {
    weeks: 1,
  });

  const [selectedDate, setSelectedDate] = useState(today);

  let currWeek = eachDayOfInterval({
    start: today,
    end: endOfWeek,
  });

  const [week, setWeek] = useState(currWeek);

  const handleDateChange = (date) => {
    setSelectedDate(date.startDate);
    console.log(selectedDate);
  };

  useEffect(() => {
    let endOfWeek = add(selectedDate, {
      weeks: 1,
    });
    console.log(endOfWeek);
    setWeek(
      eachDayOfInterval({
        start: selectedDate,
        end: endOfWeek,
      })
    );
    console.log(week);
  }, [selectedDate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      // If the search box is empty, return false
      return false;
    }

    try {
      setLoading(true);
      const data = await getLocation(searchInput);
      const coords = await data.json();
      const response = await fetchPointsOfInterest(
        coords[0].lat,
        coords[0].lon
      );
      const firstAttractions = response.slice(0, 8);
      setAttractions(firstAttractions);
      setLoading(false);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTrip = async (event) => {
    event.preventDefault();
    try {
      const response = await addTrip({
        variables: {
          attractions: currentTrip,
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div>
          <form onSubmit={handleFormSubmit} className="max-w-md mx-auto mb-3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Paris"
                required
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2">
            <div className="">
              {loading ? (
                <p>Loading attractions...</p>
              ) : (
                <div className="flex flex-row flex-wrap ">
                  {attractions.map((attraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mx-6">
              <h1 className="font-bold text-3xl text-center my-2">MY TRIP</h1>
              <div className="mt-8 text-center">
                <button
                  onClick={handleAddTrip}
                  className="text-xl font-semibold mb-4 bg-darkestGreen p-2 rounded-md text-white hover:bg-lighterGreen"
                >
                  SAVE TRIP
                </button>
                <div>
                  <Datepicker
                    asSingle={true}
                    useRange={false}
                    selected={selectedDate}
                    onChange={handleDateChange}
                  />
                  {selectedDate && (
                    <p>Selected Date: {selectedDate.toDateString()}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row flex-wrap">
                {week.map((day) => (
                  <div className="basis-1/4" key={day}>
                    <CalendarSquare day={day} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    console.log(over, active);
    setCurrentTrip([
      ...currentTrip,
      {
        name: active.data.current.name,
        attractionId: parseInt(active.id),
        date: over.id,
      },
    ]);
    console.log(currentTrip);
  }
};

export default TripCreator;
