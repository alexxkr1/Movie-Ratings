import { InputGroup, Input, Button } from "reactstrap";

const SearchBar = () => {
  return (
    <>
      <div>
        <h2>Find Movies, TV shows and more</h2>
        <InputGroup>
          <Input />
          <Button>Search</Button>
        </InputGroup>
      </div>
    </>
  );
};

export default SearchBar;
