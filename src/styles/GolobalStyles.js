import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  /* Instagram-style Purple/Pink Theme */
&, &.light-mode{

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #fafafa;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  /* Purple/Pink Brand Colors - Instagram Style */
  --color-brand-50: #faf5ff;
  --color-brand-100: #f3e8ff;
  --color-brand-200: #e9d5ff;
  --color-brand-300: #d8b4fe;
  --color-brand-400: #c084fc;
  --color-brand-500: #a855f7;
  --color-brand-600: #9333ea;
  --color-brand-700: #7e22ce;
  --color-brand-800: #6b21a8;
  --color-brand-900: #581c87;

  /* Pink Accent Colors */
  --color-pink-400: #f472b6;
  --color-pink-500: #ec4899;
  --color-pink-600: #db2777;

  /* Gradient for buttons */
  --gradient-primary: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  --gradient-hover: linear-gradient(135deg, #9333ea 0%, #db2777 100%);

  /* Status Colors */
  --color-blue-100: #dbeafe;
  --color-blue-700: #1d4ed8;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-200: #ffea08;
  --color-yellow-700: #a16207;
  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);

  --image-grayscale: 0%;
  --image-opacity: 100%;
 }

&.dark-mode{
  --color-grey-0: #18212f;
  --color-grey-50: #111827;
  --color-grey-100: #1f2937;
  --color-grey-200: #374151;
  --color-grey-300: #4b5563;
  --color-grey-400: #6b7280;
  --color-grey-500: #9ca3af;
  --color-grey-600: #d1d5db;
  --color-grey-700: #e5e7eb;
  --color-grey-800: #f3f4f6;
  --color-grey-900: #f9fafb;

  /* Keep same brand colors in dark mode */
  --color-brand-500: #a855f7;
  --color-brand-600: #9333ea;
  
  --color-pink-500: #ec4899;
  --color-pink-600: #db2777;

  --gradient-primary: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  --gradient-hover: linear-gradient(135deg, #9333ea 0%, #db2777 100%);

  --color-blue-100: #1e3a8a;
  --color-blue-700: #dbeafe;
  --color-green-100: #166534;
  --color-green-700: #dcfce7;
  --color-yellow-100: #854d0e;
  --color-yellow-700: #fef9c3;
  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(0, 0, 0, 0.3);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  --shadow-card: 0 2px 4px rgba(0, 0, 0, 0.3);

  --image-grayscale: 10%;
  --image-opacity: 90%;
}

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-full: 9999px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-500);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
