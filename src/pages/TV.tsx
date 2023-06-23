import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
//import "../App.css";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  Spinner,
} from "reactstrap";
import RootLayout from "@/layout/RootLayout";
import { httpClient } from "@/axios";
import { getTvShows } from "@/features/movies/moviesSlice";
interface RootState {
  movie: {
    tvShows: {
      name: string;
      poster_path: string;
      vote_average: number;
    }[];
  };
}
function TV() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const tvShows = useSelector((state: RootState) => state.movie.tvShows);
  // const isLoading = useRef(false);
  useEffect(() => {
    async function getData() {
      try {
        await setIsLoading(true);
        const { data } = await httpClient.get(
          "3/tv/popular?language=en-US&page=1"
          //"discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'",
        );
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        await dispatch(getTvShows(data.results));
        console.log(data);
      } catch (error) {
      } finally {
        await setIsLoading(false);
      }
    }

    if (!tvShows.length) {
      getData();
    }
  }, []);
  function renderStars(rating: number) {
    const numberOfStars = Math.round((rating / 10) * 5); // Calculate the number of filled stars based on the rating
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        starIcons.push(<span className="fa fa-star checked" key={i}></span>);
      } else {
        starIcons.push(<span className="fa fa-star" key={i}></span>);
      }
    }
    return starIcons;
  }
  return (
    <>
      <RootLayout>
        <h1 className="text-center">Popular TV Shows Now</h1>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner size="sm">Loading...</Spinner>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {tvShows.map((movie, index) => (
              <Card
                key={index}
                style={{
                  width: "18rem",
                }}
              >
                <img
                  alt="Sample"
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.poster_path
                  }
                />
                <CardBody>
                  <CardTitle tag="h5">{movie.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {renderStars(movie.vote_average)}
                  </CardSubtitle>

                  <Button>More</Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </RootLayout>
    </>
  );
}

export default TV;
