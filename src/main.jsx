import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import App from './App';
import { colors } from './styles/colors';

const GlobalStyle = createGlobalStyle`
  body { margin: 0; background: ${colors.white}; }
`;

createRoot(document.getElementById('root')).render(
  <StrictMode><GlobalStyle /><App /></StrictMode>,
);
