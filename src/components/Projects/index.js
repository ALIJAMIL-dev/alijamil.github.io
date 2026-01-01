import './index.scss';
import projects from '../../data/projects.json';

const Projects = () => {
  return (
    <div className="container projects-page">
      <div className="text-zone">
        <h1>Projects</h1>
        <p>Here are some of my projects. Click a card to open the repository.</p>
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.link && (
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">View on GitHub</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
