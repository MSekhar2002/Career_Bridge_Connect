import React, { useEffect,useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import instance from '../axios/axios';
import { useSnackbar } from "notistack";

const ProfilePage = () => {
    const { userData } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    console.log(userData); 
    const [userDataCopy, setUserDataCopy] = useState(userData);
    useEffect(() => {
        if(userData) {
            setUserDataCopy(userData);
        }
    }, [userData]);

    console.log("n",userDataCopy); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDataCopy(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleEdit = async () => {
        setEditing(!editing);
    };

    const handleSave = async () => {
        try {
            if (!userData._id){
                return;
            }
            setEditing(false);
            const res = await instance.patch(`/updateuser/${userData._id}`, userDataCopy);
            enqueueSnackbar(res.data.message, { variant: "success" });

            console.log(res.data);
             // Disable editing after successful save
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.response.data.message, { variant: "error" });

        }
    };

    const renderFields = () => {
        const renderStudentFields = () => (
            <>
                <div className="input-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="name"
                        value={userDataCopy.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="input-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        readOnly={!editing}
                        name="age"
                        value={userDataCopy.age}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                </div>
                <div className="input-group">
                    <label>Gender:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="gender"
                        value={userDataCopy.gender}
                        onChange={handleChange}
                        placeholder="Gender"
                    />
                </div>
                {/* <div className="input-group">
                    <label>Grade:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="grade"
                        value={userDataCopy.grade}
                        onChange={handleChange}
                        placeholder="Grade"
                    />
                </div> */}
                <div className="input-group">
                    <label>School:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="school"
                        value={userDataCopy.school}
                        onChange={handleChange}
                        placeholder="School"
                    />
                </div>
                <div className="input-group">
                    <label>Area of Interest:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="areaOfInterest"
                        value={userDataCopy.areaOfInterest}
                        onChange={handleChange}
                        placeholder="Area of Interest"
                    />
                </div>
                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="address"
                        value={userDataCopy.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        readOnly={!editing}
                        name="phoneNumber"
                        value={userDataCopy.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        readOnly={!editing}
                        name="email"
                        value={userDataCopy.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
            </>
        );
    
        const renderCompanyFields = () => (
            <>
                <div className="input-group">
                    <label>Company Name:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="companyName"
                        value={userDataCopy.name}
                        onChange={handleChange}
                        placeholder="Company Name"
                    />
                </div>
                <div className="input-group">
                    <label>Industry:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="industry"
                        value={userDataCopy.industry}
                        onChange={handleChange}
                        placeholder="Industry"
                    />
                </div>
                <div className="input-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="location"
                        value={userDataCopy.location}
                        onChange={handleChange}
                        placeholder="Location"
                    />
                </div>
                <div className="input-group">
                    <label>Number of Employees:</label>
                    <input
                        type="number"
                        readOnly={!editing}
                        name="numberOfEmployees"
                        value={userDataCopy.numberOfEmployees}
                        onChange={handleChange}
                        placeholder="Number of Employees"
                    />
                </div>
                <div className="input-group">
                    <label>Contact Person:</label>
                    <input
                        type="text"
                        readOnly={!editing}
                        name="contactPerson"
                        value={userDataCopy.contactPerson}
                        onChange={handleChange}
                        placeholder="Contact Person"
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        readOnly={!editing}
                        name="phoneNumber"
                        value={userDataCopy.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        readOnly={!editing}
                        name="email"
                        value={userDataCopy.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
            </>
        );
    
        return userDataCopy.role === 'student' ? renderStudentFields() : renderCompanyFields();
    };
    

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">{userData.role === 'student' ? 'Student Profile' : 'Company Profile'}</h1>
                    <div className="mb-4">
                        {/* Render fields based on user role */}
                        {renderFields()}
                    </div>
                    {/* Render save/edit button based on editing state */}
                    {editing ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
