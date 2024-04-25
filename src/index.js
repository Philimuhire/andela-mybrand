import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import ContactInfo from './components/ContactInfo'; 
import Footer from './components/Footer';

const contactDetails = [
    { label: 'Names: ', value: 'Philbert Muhire' },
    { label: 'Email: ', value: 'philimuhire@gmail.com' },
    { label: 'Phone: ', value: '+250789058711' },
    { label: 'Location: ', value: 'Kigali-Rwanda' }
];

ReactDOM.render(<Header />, document.getElementById('header'));

ReactDOM.render(
    <React.StrictMode>
        <ContactInfo contactDetails={contactDetails} /> {}
    </React.StrictMode>,
    document.getElementById('info') 
);

ReactDOM.render(<Footer />, document.getElementById('footer'));

