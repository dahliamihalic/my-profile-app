import img from '../assets/profile2.jpg';
import '../styles/card.css';

const Card2 = () => {
    const name = 'Janet Fawn';
    const title = 'Web Designer';
    const email = 'ho@gmail.com';


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
export default Card2;