import { InputGroup, Input, Button } from "reactstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(searchInput);
    if (searchInput) {
      navigate(`/search-results/${searchInput}`);
    }
  }
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
