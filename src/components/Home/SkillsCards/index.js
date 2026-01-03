import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import skillsCardsData from '../../../data/skillsCards.json';

// Auto-generate icon map from all available icons
const iconMap = {
    ...Object.keys(brandIcons).reduce((acc, key) => {
        if (key.startsWith('fa')) {
            acc[key] = brandIcons[key];
        }
        return acc;
    }, {}),
    ...Object.keys(solidIcons).reduce((acc, key) => {
        if (key.startsWith('fa')) {
            acc[key] = solidIcons[key];
        }
        return acc;
    }, {})
};

// Auto-generate section title from key (capitalize first letter, add spaces)
const formatSectionTitle = (key) => {
    // If JSON has a title field, use it (we'll check in the component)
    // Otherwise, format the key: "programming" -> "Programming", "creativeTools" -> "Creative Tools"
    return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
};

const SkillsCards = () => {
    // Dynamically process all sections from JSON
    const sections = Object.keys(skillsCardsData).map((sectionKey, sectionIndex) => {
        const sectionData = skillsCardsData[sectionKey];
        
        // Check if section has a title field, otherwise auto-generate
        const sectionTitle = sectionData.title || formatSectionTitle(sectionKey);
        
        // Get skills array (handle both array and object with skills array)
        const skillsArray = Array.isArray(sectionData) ? sectionData : (sectionData.skills || []);
        
        const skills = skillsArray.map(skill => ({
            ...skill,
            icon: iconMap[skill.iconName] || solidIcons.faCode // Fallback icon if not found
        }));
        
        // Calculate animation delay offset (sum of all previous sections)
        let animationOffset = 0;
        for (let i = 0; i < sectionIndex; i++) {
            const prevSection = skillsCardsData[Object.keys(skillsCardsData)[i]];
            const prevSkills = Array.isArray(prevSection) ? prevSection : (prevSection.skills || []);
            animationOffset += prevSkills.length;
        }

        return {
            key: sectionKey,
            title: sectionTitle,
            skills,
            animationOffset
        };
    });

    return (
        <div className="skills-cards-container">
            {sections.map((section) => (
                <div key={section.key} className="skills-section">
                    <h3 className="skills-section-title">{section.title}</h3>
                    <div className="skills-grid">
                        {section.skills.map((skill, index) => (
                            <div 
                                key={`${section.key}-${index}`} 
                                className="skill-card"
                                style={{ animationDelay: `${(section.animationOffset + index) * 0.1}s` }}
                            >
                                <div className="skill-icon" style={{ color: skill.color }}>
                                    <FontAwesomeIcon 
                                        icon={skill.icon} 
                                        size="2x"
                                        className={skill.type === 'brand' ? 'brand-icon' : 'solid-icon'}
                                    />
                                </div>
                                <div className="skill-name">{skill.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsCards;

