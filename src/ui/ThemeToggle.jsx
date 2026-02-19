import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import styled from "styled-components";
import { useDarkMode } from "../context/ThemeContext.jsx";

const Toggle = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  color: ${({ $dark }) =>
    $dark ? "var(--color-yellow-200)" : "var(--color-blue-700)"};

  padding: 6px;
  border-radius: 50%;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: scale(1.15);
    background-color: var(--color-grey-100);
  }
  &:focus {
    outline: none;
  }
`;

function ThemeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <Toggle
      $dark={isDarkMode}
      onClick={() => setIsDarkMode((prev) => !prev)}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Toggle>
  );
}

export default ThemeToggle;
