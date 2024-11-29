import "./App.css";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ToggleButton from "./ToggleButton";

function App() {
  // for fetching the projects from the API
  const [projects, setProjects] = useState([]);
  // handle the layout change, horizontal vs. vertical
  const [isGrid, setIsGrid] = useState(true);
  // check for small screen size
  const [isSmall, setIsSmall] = useState(false);

  // Fetch data from local JSON file
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => setProjects(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const BREAKPOINT_SMALL = 767;
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < BREAKPOINT_SMALL);
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Initial check when component mounts
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle keyboard navigation for toggle buttons
  const handleKeyDown = (event, isGridMode) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsGrid(isGridMode);
      // Prevents default scrolling behavior for the Space key
      event.preventDefault();
    }
  };

  return (
    <div className="App">
      <header className="App-header" role="banner">
        <h1></h1>
      </header>
      <div>
        <div
          className={`header-container ${isGrid ? "grid-mode" : "list-mode"}`}
        >
          <p>{projects.length} Results</p>
          <div
            className="Toggle-container"
            role="group"
            aria-label="View layout toggle button"
          >
            <ToggleButton
              isGrid={!isGrid}
              onClick={() => setIsGrid(false)}
              label={"List"}
              aria-label="Switch to List View"
              handleKeyDown={handleKeyDown}
            />
            <ToggleButton
              isGrid={isGrid}
              onClick={() => setIsGrid(true)}
              label={"Grid"}
              aria-label="Switch to Grid View"
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Easier for screen readers to understand primary content */}
        <main className="App-body" aria-labelledby="projects-section">
          {projects.map((project) => {
            return (
              <>
                <ProjectCard
                  project={project}
                  isGrid={isGrid}
                  isSmall={isSmall}
                ></ProjectCard>
                {!isGrid && !isSmall && <div className="divider"></div>}
              </>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
