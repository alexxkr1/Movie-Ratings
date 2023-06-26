import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
import type { ITVMovies as RootState } from "@/types/interface/RootState";
function TV() {
  const totalResultsTVShows = useSelector(
    (state: RootState) => state.movie.totalResultsTVShows
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };
  const tvShows = useSelector((state: RootState) => state.movie.tvShows);

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

  useEffect(() => {
      function getData() {
        dispatch(fetchMovies({ type: "tvShows", currentPage }) as any);
      }

    getData();
  }, [currentPage]);
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
                className="mb-4"
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

        <Pagination>
          {Array.from(Array(totalResultsTVShows), (_, index) => {
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
      </RootLayout>
    </>
  );
}

export default TV;
