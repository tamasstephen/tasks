import { useState } from "react";
import "./App.css";
import { SwappyDrag } from "./pages/SwapyPage/SwappyDrag";
import { FramerDrag } from "./pages/FramerPage/FramerDrag";

enum Page {
  Swappy = "swappy",
  Framer = "framer",
}

function App() {
  const [page, setPage] = useState<Page>(Page.Swappy);

  const changePage = () => {
    setPage((prevState) =>
      prevState === Page.Swappy ? Page.Framer : Page.Swappy,
    );
  };

  return (
    <>
      <button onClick={changePage}>
        Open {page === Page.Swappy ? "Framer" : "Swappy"}
      </button>
      {page === Page.Swappy && <SwappyDrag />}
      {page === Page.Framer && <FramerDrag />}
    </>
  );
}

export default App;
