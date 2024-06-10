const url = "https://www.course-api.com/react-tours-project";
import { useState, useEffect } from "react";
import Tours from "./components/Tours";
import Loading from "./components/Loading";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const removeTour = (id) => {
    // if toure.id not equal to passing id return newTours arrat
    const newTours = data.filter((tour) => tour.id !== id);
    setData(newTours);
  };
  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();

      setData(tours);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (data.length === 0) {
    return (
      <main className="title">
        <div className="title">
          <h2>no tours left</h2>
          {/* on Click refetchTour */}
          <button
            type="button"
            style={{ marginTop: "2rem" }}
            className="btn"
            onClick={() => fetchTours()}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={data} removeTour={removeTour} />
    </main>
  );
};
export default App;
