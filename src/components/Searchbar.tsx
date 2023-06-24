import { InputGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (searchInput) {
      const searchPath = `/search-results/${searchInput}`;
      if (window.location.pathname.includes("/search-results/")) {
        window.location.reload();
        console.log(window.location.pathname);
      } else {
        navigate(searchPath);
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    if (keyword) {
      setSearchInput(keyword);
    }
  }, []);
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <div>
        <h2>Find Movies, TV shows and more</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </InputGroup>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
