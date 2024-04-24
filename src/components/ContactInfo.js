import React from 'react';
import './ContactInfo.css';

function ContactInfo({ contactDetails }) {
    return (
        <div className="info">
            {contactDetails.map((detail, index) => (
                <div className="my-info" key={index}>
                    <p><span>{detail.label}</span>{detail.value}</p>
                </div>
            ))}
        </div>
    );
}

export default ContactInfo;