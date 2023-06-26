import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./Index.css";
import type { IMovies as RootState } from "@/types/interface/RootState";
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
import { fetchMovies } from "@/features/movies/moviesSlice";

function Index() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);
  const totalResultsMovies = useSelector(
    (state: RootState) => state.movie.totalResultsMovies
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    function getData() {
      dispatch(fetchMovies({ type: "movies", currentPage }) as any);
    }

    getData();
  }, [currentPage]);

  function renderStars(rating: number) {
    const numberOfStars = Math.round((rating / 10) * 5);
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
