import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./Index.css";
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
interface RootState {
  movie: {
    movies: {
      poster_path: string;
      title: string;
      vote_average: number;
    }[];
  };
}
function Index() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.movies);

  useEffect(() => {
    async function getData() {
      const { data } = await httpClient.get(
        "3/movie/popular?language=en-US&page=1"
      );
      console.log("testing", movies);
      await dispatch(getMovies(data.results));
      console.log(data);
    }

    if (!movies.length) {
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
        <h1 className="text-center">Popular Movies Now</h1>

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
              className="mb-4"
            >
              <img
                alt="Sample"
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              />
              <CardBody>
                <CardTitle tag="h5">{movie.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {renderStars(movie.vote_average)}
                </CardSubtitle>
                {/* <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card‘s content.
                </CardText>
                <Button>Button</Button> */}
                <Button>More</Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </RootLayout>
    </>
  );
}

export default Index;
