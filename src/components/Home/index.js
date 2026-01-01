import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';
import siteData from '../../data/site.json';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = siteData.name.split("");
    const jobArray = siteData.job.split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timerId);
    }, []);

    return(
      <>
        <div className = "container home-page">
            <div className="text-zone">
                <h1>
                <span className = {`${letterClass} _1`}>I</span>
                <span className = {`${letterClass} _2`}>'m</span>{' '}
                <span className="name-letters"><AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={3} /></span>
                <br />
                <span className="job-title"><AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={10} /></span>
                </h1>
                <h2>{siteData.subtitle}</h2>
                <Link to="/contact" className="flat-button">{siteData.contactButton}</Link>
            </div>
            <Logo className="Home"/>
        </div>
        <Loader type="pacman" />
      </>
    )
}

export default Home