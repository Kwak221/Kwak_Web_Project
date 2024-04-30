import React, { useState } from 'react';

const ContactForm = ({ setContact }) => {
    const [contactname, setContactName] = useState('');
    const [contactnumber, setContactNumber] = useState('');
    const [contactemail, setContactEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChangeName = (e) => {
        setContactName(e.target.value);
    }; //handle changer for the form object

    const handleChangeNumber = (e) => {
        setContactNumber(e.target.value);
    };

    const handChangeEmail = (e) => {
        setContactEmail(e.target.value);
    };

    const createContact = () => {
        if(!setContactName) return;
        if(!setContactNumber) return;
        if(!setContactEmail) return;

        const contact = {
            full_name: contactname,
            number: contactnumber,
            email: contactemail
        };

        fetch(`${process.env.REACT_APP_EXPRESS_URL}/index/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            setContact(Contact => [...Contact, data]);
            setContactName('');
            setContactNumber('');
            setContactEmail('');
            setMessage('Info Sent, Thank You!');
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <div className='dataform'>
            {message && <p>{message}</p>}
            <input
                type='text'
                value={contactname}
                onChange={handleChangeName}
                placeholder='Name'
                required
            />
            <input
                type='number'
                value={contactnumber}
                onChange={handleChangeNumber}
                placeholder='Number: xxxxxxxxxx'
                required
            />
            <input
                type='text'
                value={contactemail}
                onChange={handChangeEmail}
                placeholder='Email'
                required 
            />
            <button onClick={createContact}>Add Contact</button>
        </div>
    );
};

export default ContactForm;