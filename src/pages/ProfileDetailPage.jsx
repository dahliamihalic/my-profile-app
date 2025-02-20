import Wrapper from '../components/Wrapper';
import {useParams, Link} from 'react-router-dom'; 
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileDetailPage = () => {
    const {id} = useParams().id;
    console.log(id);
    const [profile, setProfile] = useState(null);  
    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~omihalic/profile-app/fetch-profile-with-id.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProfile(data.profile);
        })
    }, [id]);


    return (
        <Wrapper>
            {!profile ? (<p>Loading...</p>) : (
                <>
                    <h1>{profile.name}</h1>
                    <p><a href="mailto:${profile.email}">{profile.title}</a></p>
                    <p>{profile.email}</p>
                    <p>{profile.bio}</p>
                    <img src={profile.image_url} alt={profile.name} />
                    <p><Link to={`/profile/${id}/edit`}>Edit</Link></p>
                </>
            )}
        </Wrapper>
    );
}

export default ProfileDetailPage;