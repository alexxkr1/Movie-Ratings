import SearchBar from "@/components/Searchbar";
import NavbarComp from "@/components/Navbar";
import Footer from "@/components/Footer";
const RootLayout = ({ children }: any) => {
  return (
    <>
      <NavbarComp />
      <div
        style={{
          maxWidth: "1280px",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <SearchBar />
        <main>{children}</main>
      </div>
      <Footer/>
    </>
  );
};

export default RootLayout;
