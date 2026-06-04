import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import '../../css/Profile.css'


function Profile(){
    const { user, isSignedIn } = useUser();

    const [lostReports,setLostReports] = useState([]);

    useEffect(()=>{
        const fetchLostReports = async()=>{
            try{
const res = await axios.get(`http://localhost:6769/api/lost-item/recent/${user.id}`);

            }catch(err){
                
            }
            
        };
    })


   

    if(!isSignedIn){
        return <h1>Please Login</h1>;
    }

    const email = user.primaryEmailAddress?.emailAddress;

    const username = email.split(".")[0];

    const admissionYear = username.slice(0,4);

    const graduationYear =
        Number(admissionYear)+4;

    const departmentCode =
        username.slice(4,7).toUpperCase();

    const rollNumber =
        username.slice(4);

    const clerkName =
        user.fullName || "";

    const displayName =
        clerkName
        .replace(/^\S+\s+/,"")
        .replace(/_/g," ");

    const departmentMap={

        CSB:"Computer Science and Technology",

        ITB:"Information Technology",

        ETB:"Electronics and Telecommunication Engineering",

        EEB:"Electrical Engineering",

        MEB:"Mechanical Engineering",

        CEB:"Civil Engineering",

        AMB:"Aerospace Engineering and Applied Mechanics",

        MNB:"Mining Engineering",

        MMB:"Metallurgy and Materials Engineering"
    };

    const department =
        departmentMap[departmentCode]
        || departmentCode;

    return(

        <div className="profile-wrapper">

    <div className="profile-card">

        <div className="profile-top">

            <img
                src={user.imageUrl}
                alt="profile"
                className="profile-image"
            />

            <div className="profile-main">

                <h1 className="profile-name">
                    {displayName}
                </h1>

                <h3 className="profile-department">
                    {department}
                </h3>

                <p className="profile-email">
                    {email}
                </p>

            </div>

        </div>

        <div className="profile-details">

            <div className="info-box">

                <span className="info-title">
                    Roll Number
                </span>

                <span className="info-value">

                    {
                        admissionYear +
                        rollNumber.toUpperCase()
                    }

                </span>

            </div>

            <div className="info-box">

                <span className="info-title">
                    Admission Year
                </span>

                <span className="info-value">
                    {admissionYear}
                </span>

            </div>

            <div className="info-box">

                <span className="info-title">
                    Batch
                </span>

                <span className="info-value">
                    {graduationYear}
                </span>

            </div>

        </div>

    </div>

</div>
    );
}

export default Profile;