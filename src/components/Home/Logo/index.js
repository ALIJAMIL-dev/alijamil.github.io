import ProfileImage from '../../../assets/images/myprofileimage.jpg';
import './index.scss';

const Logo = () => {

  return (
    <div className="logo-container">
      <img className="profile-image animate" src={ProfileImage} alt="Ali Jamil" />
    </div>
  );
};

export default Logo;
