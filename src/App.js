import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import ReactDOM from 'react-dom';

// ImgUpload Component
const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img src={src} alt="Upload Preview"/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/> 
  </label>
);

// First Name Component
const FirstName = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="first-name">First Name:</label>
    <input 
      id="first-name" 
      type="text" 
      onChange={onChange} 
      maxLength="25" 
      value={value} 
      placeholder="John" 
      required 
    />
  </div>
);

// Last Name Component
const LastName = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="last-name">Last Name:</label>
    <input 
      id="last-name" 
      type="text" 
      onChange={onChange} 
      maxLength="25" 
      value={value} 
      placeholder="Doe" 
      required 
    />
  </div>
);

// Education Component
const Education = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="education">Education:</label>
    <input 
      id="education" 
      type="text" 
      onChange={onChange} 
      maxLength="50" 
      value={value} 
      placeholder="Bachelor's in Computer Science" 
      required 
    />
  </div>
);

// Programming Skills Component
const ProgrammingSkills = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="skills">Programming Skills:</label>
    <textarea 
      id="skills" 
      onChange={onChange} 
      value={value} 
      placeholder="List your programming skills here..." 
      rows="4"
      required 
    />
  </div>
);

// Profile Component
const Profile = ({ onSubmit, src, firstName, lastName, education, skills }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img src={src} alt="Profile"/>
        </div>
      </label>
      <div className="name">{firstName} {lastName}</div>
      <div className="education">Education: {education}</div>
      <div className="skills">Skills: {skills}</div>
      <button type="submit" className="edit">Edit Profile</button>
    </form>
  </div>
);

// Edit Component
const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      {children}
      <button type="submit" className="save">Save</button>
    </form>
  </div>
);

// CardProfile Functional Component
const CardProfile = () => {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [active, setActive] = useState('edit');

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://sample-api-fwbm.onrender.com/api/v1/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Use your actual token if required
          }
        });
        const data = await response.json();
        // Assuming the API response has the fields `firstName`, `lastName`, `education`, and `skills`
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEducation(data.education || '');
        setSkills(data.skills || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const editFirstName = e => setFirstName(e.target.value);

  const editLastName = e => setLastName(e.target.value);

  const editEducation = e => setEducation(e.target.value);

  const editSkills = e => setSkills(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setActive(prevActive => (prevActive === 'edit' ? 'profile' : 'edit'));
  };

  return (
    <div>
      {active === 'edit' ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          <FirstName onChange={editFirstName} value={firstName} />
          <LastName onChange={editLastName} value={lastName} />
          <Education onChange={editEducation} value={education} />
          <ProgrammingSkills onChange={editSkills} value={skills} />
        </Edit>
      ) : (
        <Profile 
          onSubmit={handleSubmit} 
          src={imagePreviewUrl} 
          firstName={firstName} 
          lastName={lastName} 
          education={education} 
          skills={skills}
        />
      )}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <CardProfile />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
