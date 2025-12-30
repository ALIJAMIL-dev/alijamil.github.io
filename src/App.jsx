import './App.css'
import LinkedInIcon from './assets/LinkedIn'
import GitHubIcon from './assets/GitHub'
import icons from './assets/icons'
import myprofileimage from './assets/myprofileimage.jpg';

function App() {
  const skills = [
    { key: 'python', label: 'Python' },
    { key: 'pytorch', label: 'AI (PyTorch)' },
    { key: 'linux', label: 'Linux' },
    { key: 'server', label: 'Back-end' },
    { key: 'typescript', label: 'JS/TS' },
    { key: 'react', label: 'React' },
    { key: 'csharp', label: 'C#' },
    { key: 'java', label: 'Java' },
    { key: 'blender', label: 'Blender' },
    { key: 'davinci', label: 'DaVinci Resolve' },
    { key: 'photoshop', label: 'Photoshop' },
    { key: 'premiere', label: 'Premiere Pro' },
  ]

  const projects = [
    {
      title: 'Python Tooling & ML Suite',
      desc: 'Comprehensive Python repository covering intermediate to advanced topics: NumPy and pandas for data processing, PyTorch for deep learning, and web backends with Django and Flask. Includes training scripts, notebooks, and reproducible examples for real-world workflows.',
      link: 'https://github.com/ALIJAMIL-dev/Python',
    },
    {
      title: 'Personal Website (This Site)',
      desc: 'This personal portfolio website (built with React + Vite) showcases projects, resume, and contact info. Focused on fast builds, clean responsive design, and simple deployment, with ready-to-use templates and content.',
      link: 'https://github.com/ALIJAMIL-dev/alijamil.github.io',
    },
  ]

  return (
    <>
      <header className="hero">
        <div className="hero-left">
          <a href='https://github.com/ALIJAMIL-dev' target='_blank' rel='noopener noreferrer' aria-label='Profile'>
            <img src={myprofileimage} alt='ALI JAMIL profile' />
          </a>
          <div className='social-links'>
            <a className='social-link linkedin' href='https://www.linkedin.com/in/ali-jamil-dev/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
              <LinkedInIcon className='social-icon' />
            </a>
            <a className='social-link github' href='https://github.com/ALIJAMIL-dev' target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
              <GitHubIcon className='social-icon' />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <h1 className="name">ALI JAMIL</h1>
          <p className="headline">Software Engineer | Back-end | AI Engineering | Python | 3D & Montage</p>
          <p className="summary">I'm an AI Engineer/Developer, Back-end and Software Developer. I love to share experiences with people and learn new things every single day because I want to upgrade my skill level towards my targets.</p>
          <div className="skill-chips" aria-hidden>
            {skills.map(s => (
              <div className='skill-chip' key={s.key}>
                {icons[s.key] ? <img src={icons[s.key]} className='skill-icon' alt={s.label} /> : null}
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="about info">
        <h2 className='about-me'>About</h2>
        <p className='Bio'>Software Engineer with expert-level Python, experience in AI (PyTorch), Linux, and backend development. Skilled in C#, Java, JavaScript/TypeScript, React, with a strong passion for mathematics and clean software design. Also experienced in 3D & montage work using DaVinci Resolve, Photoshop, and Premiere Pro.</p>
      </section>"

      <section className="projects info dark">
        <h2 className='projects-heading'>Project Showcase</h2>
        <div className='projects-grid'>
          {projects.map(p => (
            <article className='project-card' key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className='project-meta'>
                <a className='project-link' href={p.link} target='_blank' rel='noopener noreferrer'>View repo</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
