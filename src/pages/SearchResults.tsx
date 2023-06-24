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
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movie.searchResults);
  interface RootState {
    movie: {
      searchResults: {
        poster_path: string;
        title: string;
        vote_average: number;
      }[];
    };
  }
  useEffect(() => {
    async function getData() {
      try {
        await setIsLoading(true);
        const { data } = await httpClient.get(
          `3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`
        );
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        await dispatch(getSearchResults(data.results));
        console.log(data);
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
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
           <Pagination >
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
            </Pagination>
        </div>
         
      </RootLayout>
    </>
  );
}

export default SearchResults;
