import "./App.css";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function App() {
  // for fetching the projects from the API
  const [projects, setProjects] = useState([]);

  // handle the layout change, horizontal vs. vertical
  const [isGrid, setIsGrid] = useState(true);
  const [isSmall, setIsSmall] = useState(false);

  // Fetch data from local JSON file
  useEffect(() => {
    fetch("/data.json") // Assuming data.json is inside the public folder
      .then((res) => res.json())
      .then((json) => {
        setProjects(json);
      });
  }, []);

  // Add inside the component
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setIsSmall(true); // Set to grid mode when screen width is below 900px
      } else if (window.innerWidth > 767) {
        setIsSmall(false);
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Initial check when component mounts
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1></h1>
      </header>
      <div>
        <div
          className={`header-container ${isGrid ? "grid-mode" : "list-mode"}`}
        >
          <p>{projects.length} Results</p>
          <div className="Toggle-container">
            <button
              className={`toggle-option ${!isGrid ? "active" : ""}`}
              onClick={() => setIsGrid(false)}
            >
              List
            </button>
            <button
              className={`toggle-option ${isGrid ? "active" : ""}`}
              onClick={() => setIsGrid(true)}
            >
              Grid
            </button>
          </div>
        </div>

        <div className={`App-body ${isGrid ? "grid-layout" : "list-layout"}`}>
          {projects.map((project) => {
            return (
              <ProjectCard
                project={project}
                isGrid={isGrid}
                isSmall={isSmall}
              ></ProjectCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
