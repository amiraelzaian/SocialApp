// App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaUser } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--color-brand-100);

  a {
    color: white;
    text-decoration: none;
  }
`;

function Home() {
  return (
    <h1>
      <FaHome /> Home Page
    </h1>
  );
}

function About() {
  return (
    <h1>
      <FaUser /> About Page
    </h1>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
