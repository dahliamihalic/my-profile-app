import style from '../styles/profileform.module.css';
import { useState } from 'react';
import img from '../assets/profile.jpg';

const ProfileForm = () => {

  const [data, setData] = useState({
    name: "",
    title: "",
    email: "",
    bio: "",
    img: null,
  });
  const [errors, setErrors] = useState({ img: "", general: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let newErrors = { ...errors };

    if (file) {
      // Validate file and size
      if (file.size > 2000000) {
        newErrors.img = "Image must be less than 2MB.";
      } else {
        newErrors.img = ""; // No errors
        setData({
          ...data,
          img: file,
        });
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return; // Prevent submission if there are errors

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("email", data.email.trim());
    formData.append("title", data.title.trim());
    formData.append("bio", data.bio.trim());
    if (data.img) formData.append("img", data.img);

    try {
      const response = await fetch(
        "https://web.ics.purdue.edu/~omihalic/profile-app/send-data.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setData({ name: "", email: "", title: "", bio: "", img: null }); // Clear form
        setErrors({img: "", general: "" }); // Clear errors
        setTimeout(()=> setSuccessMessage(), 1000);
      } else {
        setErrors({ ...errors, general: result.message });
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: "An error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style["profile-form"]}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        value={data.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={data.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        value={data.title}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Some description"
        required
        maxLength={200}
        value={data.bio}
        onChange={handleChange}
      ></textarea>
    <p className="char-count">{200 - data.bio.length} characters remaining</p>

      <label htmlFor="img">Upload a profile image:</label>
      <input
        id="img"
        type="file"
        name="img"
        accept="image/*"
        required
        onChange={handleFileChange}
      />
    {errors.img && <p className="error">{errors.img}</p>}
      <button
        type="submit"
        disabled={submitting || Object.values(errors).some((err) => err !== ""|| data.name.trim() === "" || data.email.trim() === "" || data.title.trim() === "" || data.bio.trim() === "" || data.img === null)}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {errors.general && <p className="error">{errors.general}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default ProfileForm;
