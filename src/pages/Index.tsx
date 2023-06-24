import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./Index.css";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
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
    totalResultsMovies: number;
  };
}
function Index() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const movies = useSelector((state: RootState) => state.movie.movies);
  const totalResultsMovies = useSelector(
    (state: RootState) => state.movie.totalResultsMovies
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await httpClient.get(
          `3/movie/popular?language=en-US&page=${currentPage}`
        );
        // Simulating a delay for demonstration purposes
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        dispatch(
          getMovies({
            results: data.results,
            total_pages: data.total_pages,
          })
        );
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await httpClient.get(
          `3/movie/popular?language=en-US&page=${currentPage}`
        );
        await dispatch(getMovies(data.results));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.poster_path
                  }
                />
                <CardBody>
                  <CardTitle tag="h5">{movie.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {renderStars(movie.vote_average)}
                  </CardSubtitle>
                  <Button>More</Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Pagination>
            {Array.from(Array(totalResultsMovies), (_, index) => {
              const pageNumber = index + 1;

              const handleClick = () => handlePageChange(pageNumber);
              return (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => handleClick()} href="#">
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </Pagination>
        </div>
      </RootLayout>
    </>
  );
}

export default Index;
