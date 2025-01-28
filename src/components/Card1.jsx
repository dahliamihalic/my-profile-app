import img from '../assets/profile.jpg';
import '../styles/card.css';

const Card1 = () => {
    const name = 'John Doe';
    const title = 'Software Developer';
    const email = 'hey@gmail.com';


    return(
        <div className="profile-card">
            <div className="profile-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="profile-card__content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
};
export default Card1;