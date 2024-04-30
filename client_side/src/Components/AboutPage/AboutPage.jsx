import React, { useState } from "react";
import './AboutPage.css'

const AboutPage = ({}) => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow((s) => !s)}>About Details</button>
            <div style={{ visibility: show ? "visible" : "hidden" }} className="About-Info">
                About Page:

                This entire project was designed with the CRUD architecture in mind, with CRUD meaning: <br/> <br/>

                C - Create <br/>
                R - Read <br/>
                U - Update <br/>
                D - Delete <br/><br/>

                There are multiple different pieces of tech that run this website, whether it is the <br/>
                frontend, backend, connection between ends, or the database, all are integral and are <br/>
                meant to play their part.<br/><br/>

                <span className="title">Front-End:</span> All front end work was done using the React framework. React is a style of interfacing<br/>
                where instead of having everything laid out in an html style sheet, using all dividers and different<br/>
                break points, it separates them into 'Components' then imports them into the main page. This makes the <br/>
                overall code on the home page cleaner and simpler to read, and delegates tasks to different<br/>
                Components instead of having it jammed into one code page.<br/><br/>

                <span className="title">Back-End:</span> Backend work was done with the Express Framework. Express is a web framework written in Javascript <br/>
                and used in coupling with Node.js. Express, and Node by extension, can use API's to grab web data and is a<br/>
                lightweight system to make everything work. <br/><br/>

                <span className="title">Conecting Front and Back:</span> Used to connect the two ends was CORS. CORS, which stands for <br/>
                Cross-Origin Resource Sharing, is a configuration style and pathway that is used to connect front end work<br/>
                to back end server data and settings.<br/><br/>

                <span className="title">Database:</span> The database used was MongoDB, but in a style of Mongoose. MongoDB is a shapeless schema database<br/> 
                system that, instead of using structure quieries like SQL, it uses documents to hold object styles and data <br/>
                itself, allowing for free flowing stye of data housing, retrieval, updating and deletion. <br/><br/>

                All work was done by Sean Kwak, and not copied, cheated or stolen from outside sources. <br/>
            </div>
        </div>
    );
};

export default AboutPage;