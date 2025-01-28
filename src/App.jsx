import { useState } from 'react';
import './App.css';
import './styles/global.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Card from './components/Card';
import img from './assets/profile.jpg';
import img2 from './assets/profile2.jpg';
import Wrapper from './components/Wrapper';


function App() {
  const profiles = [
    {
      img: img,
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'heyho@gmail.com'},
    {
      img: img2,
      name: 'Jane Doe',
      title: 'Web Developer',
      email: 'hohey@gmail.com'},
    {
      img: img,
      name: 'Peter Piper',
      title: 'Software Engineer',
      email: 'heyho@gmail.com'},
    {
      img: img2,
      name: 'Picked Apeck',
      title: 'UX Designer',
      email: 'hohey@gmail.com'},
    {
      img: img2,
      name: ' Apeck',
      title: 'UVDesigner',
      email: 'hohey@gmail.com'},
    {
      img: img,
      name: 'Pickled Peppers',
      title: 'Software Engineer',
      email: 'heyho@gmail.com'},
    {
      img: img2,
      name: 'Peppa Pig',
      title: 'Graphic Designer',
      email: 'hohey@gmail.com'
    }
  ]

  const titles = [... new Set(profiles.map((profile) => profile.title))]; //get unique titles

  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  }

  const [search, setSearch] = useState('');
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleClear = () => {
    setTitle('');
    setSearch('');
    console.log('clear');
  }

const filteredProfiles = profiles.filter((profile) => {
  title === '' || profile.title === title && profile.name.toLowerCase().includes(search.toLowerCase()); 
})

  return (
    <>
    <header>
        <Navbar />
    </header>
    <main>
      <Wrapper>
          <h1>My Profile App</h1>
      </Wrapper>
      <Wrapper>
          <About />
      </Wrapper>
      <Wrapper>
        <div className="filter-wrapper">
          <div className="filter-select">
            <label htmlFor='title-select'>Filter by Role:</label>
            <select id='title-select' onChange={handleTitleChange}>
              <option value=''>All</option>
              {titles.map((title) => (<option key={title} value={title}>{title}</option>))}
             </select>
             <input type="text" id="search" onChange={handleSearchChange}/>
             <div>
                <button onClick={handleClear}>Clear</button>
             </div>
          </div>
        </div>
          <div className="profile-cards">
            {filteredProfiles.map((profile) => (<Card key={profile.name} {...profile} />))}
          </div>
      </Wrapper>
    </main>

    </>
  )
}

export default App
