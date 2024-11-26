import "./ProjectCard.css"; // Import CSS
import urban from "./urban.png";

function ProjectCard(props) {
  const {
    project,
    isGrid, // View mode control (grid or list)
    isSmall,
  } = props;

  const maxDays = 70;
  // Get the amount of progress
  const progressDays = maxDays - project.days_left;
  // Calculate the percentage of the process of the maximum days
  const progress = Math.max(0, Math.min(100, (progressDays / maxDays) * 100));

  return (
    <div className={`Project-card ${isGrid ? "grid-mode" : "list-mode"}`}>
      <div
        className={`card-content-wrapper ${
          isGrid ? "grid-mode" : isSmall ? "small-mode" : "list-mode"
        }`}
      >
        {/* Image section */}
        <div className="image-container">
          <img src={urban} id="urban-pic" alt="Picture of a urban landscape" />
        </div>

        {/* Content section */}
        <div className="text-container">
          <p className="card-header">{project.district}</p>
          {/* Iterate through the tags and display them */}
          <div className="tags-container">
            {project.tags &&
              project.tags.map((tag, index) => (
                <p key={index} className="tag">
                  {tag}
                </p>
              ))}
          </div>
          <p className="project-title">{project.title}</p>
          <p className="event-time">{project.description}</p>
          {/* Progress bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }} // Dynamically set the width
            ></div>
          </div>
          <p className="text">
            <span class="material-symbols-outlined">schedule</span>
            {project.days_left + " days left"}
          </p>
        </div>
      </div>
      {!isGrid && !isSmall && <div className="divider"></div>}
    </div>
  );
}

export default ProjectCard;
