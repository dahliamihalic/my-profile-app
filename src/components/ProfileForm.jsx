import '../styles/profileform.css';
import { useState } from 'react';


const ProfileForm = () => {
    const [data, setData] = useState({name: '', title: '', email: '', bio: '' });
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('https://web.ics.purdue.edu/~omihalic/profile-app/send-data.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            //const result = await JSON.parse(JSON.stringify(response));
            console.log(result.message);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name"  placeholder="Name" required value={data.name} onChange={handleChange}/>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Title" required value={data.title} onChange={handleChange}/>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email" value={data.email} required onChange={handleChange}/>
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" id="bio" placeholder="Tell us about yourself!" value={data.bio} required onChange={handleChange}/>
            <button type="submit">Add Profile</button>
        </form>
    );
};

export default ProfileForm;