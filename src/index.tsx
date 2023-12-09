import ReactDOM from 'react-dom/client';
import App from './App';

const rootElem = document.getElementById('root');

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
    root.render(<App />);
}