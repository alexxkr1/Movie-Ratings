import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//import "../App.css";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import RootLayout from "@/layout/RootLayout";
import { httpClient } from "@/axios";
import { getMovies } from "@/features/movies/moviesSlice";
import SearchBar from "@/components/Searchbar";
interface RootState {
  movie: {
    movies: [];
  };
}
function TV() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.movies);
  useEffect(() => {
    async function getData() {
      const headers = {
        Authorization: "Bearer a2519cbf9dc79b1cd61a283b7b8a8b7d",
      }; // auth header with bearer token

      const { data } = await httpClient.get(
        "event/get-all-events",
        //"discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjUxOWNiZjlkYzc5YjFjZDYxYTI4M2I3YjhhOGI3ZCIsInN1YiI6IjY0OTRiM2ZjZDIzNmU2MDExZTA5ODg3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._C-U5_IOlj-OSQBtg00EShhXDwyJdgrVLFIE4IUS48M",
          },
        }
      );
      console.log("testing", movies);
      await dispatch(getMovies(data.events));
      console.log(data);
    }
    getData();
  }, []);

  return (
    <>
      <RootLayout>
        <h1 className="text-center">Popular TV Shows Now</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {movies.map((movie, index) => (
            <Card
              key={index}
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5">{movie.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card‘s content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </RootLayout>
    </>
  );
}

export default TV;
