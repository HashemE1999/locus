import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TRIP } from "../utils/queries";
import { Link } from "react-router-dom";
import "ldrs/ring";

const TripEditor = () => {
  const { tripId } = useParams();
  const { loading, error, data } = useQuery(QUERY_TRIP, {
    variables: { getTripId: tripId },
  });
  console.log(data);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 text-xl uppercase bg-lighterGreen hover:bg-mint p-2 rounded-lg">
        <Link to="/mytrips">Back</Link>
      </div>
      {loading ? (
        <l-ring></l-ring>
      ) : (
        <div className="pt-10 uppercase flex flex-col gap-y-4 items-center text-center">
          {data.getTrip.attractions.map((attraction) => (
            <div className="bg-mint w-1/2 rounded-lg py-4 drop-shadow-lg">
              <h1 className="font-semibold text-2xl">{attraction.name}</h1>
              <h2 className="text-xl italic">
                Planned for: {new Date(attraction.date).toDateString()}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripEditor;
