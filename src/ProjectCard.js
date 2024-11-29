import "./ProjectCard.css";
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
      {/* Switch card content to grid style also in small mode */}
      <div
        className={`card-content-wrapper ${
          isGrid || isSmall ? "grid-mode" : "list-mode"
        }`}
      >
        {/* Image section */}
        <div className="image-container">
          <img
            src={urban}
            id="urban-pic"
            alt="Picture of a urban landscape with futuristic apartment building blocks and trees"
          />
        </div>

        {/* Content section */}
        <div className="text-container">
          <p className="district">{project.district}</p>
          {/* Iterate through the tags and display them */}
          {/* aria-labelledby implies that the element with tags-label is used to describe tags-container */}
          <div
            className="tags-container"
            role="group"
            aria-labelledby="tags-label"
          >
            {/* Label to describe the tags conatiner, only visible for screen readers*/}
            <p id="tags-label" className="sr-only">
              Category tags for the project
            </p>
            {project.tags &&
              project.tags.map((tag) => (
                <p key={tag} className="tag">
                  {tag}
                </p>
              ))}
          </div>
          {/* specifies subheading -> and hierarchy of the page content */}
          <p className="project-title" role="heading" aria-level="2">
            {project.title}
          </p>
          <p>{project.description}</p>
          {/* Progress bar */}
          <div className="progress-background-bar">
            <div
              className="progress-bar"
              role="progressbar" /* Specifices the role progress bar */
              aria-valuenow={
                progress
              } /* Specifies the current value of the progress*/
              aria-valuemin="0" /* Min days */
              aria-valuemax="70" /* Max days */
              aria-label="Current project progress between 0 and 70 days"
              style={{ width: `${progress}%` }} // Dynamically set the width
            ></div>
          </div>
          <p className="progress-text">
            <span className="material-symbols-outlined">schedule</span>
            {project.days_left + " days left"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
