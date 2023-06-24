import RootLayout from "@/layout/RootLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "@/axios";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults } from "@/features/movies/moviesSlice";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
function SearchResults() {
  const { keyword } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.searchResults);
  const pages = useSelector(
    (state: RootState) => state.movie.totalSearchPageResults
  );
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await httpClient.get(
          `3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${currentPage}`
        );
        // Simulating a delay for demonstration purposes
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        dispatch(
          getSearchResults({
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
  interface RootState {
    movie: {
      searchResults: {
        poster_path: string;
        title: string;
        vote_average: number;
      }[];
      totalSearchPageResults: number;
    };
  }
  useEffect(() => {
    async function getData() {
      try {
        await setIsLoading(true);
        const { data } = await httpClient.get(
          `3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${currentPage}`
        );
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        dispatch(
          getSearchResults({
            results: data.results,
            total_pages: data.total_pages,
          })
        );
      } catch (error) {
      } finally {
        await setIsLoading(false);
      }
    }

    getData();
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
        <h1 className="text-center">Search results for: {keyword}</h1>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner size="sm">Loading...</Spinner>
          </div>
        ) : movies.length === 0 ? (
          // No results found
          <h1 className="text-center mt-3">No results found</h1>
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
            {Array.from(Array(pages), (_, index) => {
              const pageNumber = index + 1;

              const handleClick = () => handlePageChange(pageNumber);
              return (
                <PaginationItem>
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

export default SearchResults;
