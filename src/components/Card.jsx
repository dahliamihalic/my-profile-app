import '../styles/card.css';
import propTypes from 'prop-types';

const Card = ({name, title, email, img}) => {
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

Card.propTypes = {  
    name: propTypes.string.isRequired,
    title: propTypes.string,
    email: propTypes.string.isRequired,
    img: propTypes.string.isRequired
};

export default Card;