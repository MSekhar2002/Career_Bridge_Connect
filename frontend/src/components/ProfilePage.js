import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import UserContext from '../context/UserContext';

const ProfilePage = () => {
    const { userData } = useContext(UserContext);
    const role = userData.role
    const [editing, setEditing] = useState(false);
    const [studentData, setStudentData] = useState({
        name: 'John Doe',
        age: 12,
        gender: 'Male',
        grade: '6th',
        school: 'ABC School',
        areaOfInterest: 'Technology',
        academicDetails: {
            math: 'A',
            science: 'B+',
            english: 'A-',
            socialStudies: 'B'
        },
        address: '123 Street, City',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com'
    });
    const [companyData, setCompanyData] = React.useState({
        companyName: 'ABC Corp',
        industry: 'Technology',
        location: 'City, Country',
        numberOfEmployees: 100,
        contactPerson: 'John Smith',
        phoneNumber: '123-456-7890',
        email: 'contact@abccorp.com'
    });

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleChangeStudent = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({
            ...companyData,
            [name]: value
        });
    };

    return (
        <div className="container mx-auto py-10">
            {role === "student" && <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
                    <div className="mb-4">
                        <p className="text-gray-700"><span className="font-semibold">Name:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="name"
                                    value={studentData.name}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.name}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Age:</span>
                            {editing ?
                                <input
                                    type="number"
                                    name="age"
                                    value={studentData.age}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.age}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Gender:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="gender"
                                    value={studentData.gender}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.gender}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Grade:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="grade"
                                    value={studentData.grade}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.grade}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">School:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="school"
                                    value={studentData.school}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.school}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Area of Interest:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="areaOfInterest"
                                    value={studentData.areaOfInterest}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.areaOfInterest}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Address:</span>
                            {editing ?
                                <input
                                    type="text"
                                    name="address"
                                    value={studentData.address}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.address}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Phone Number:</span>
                            {editing ?
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={studentData.phoneNumber}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.phoneNumber}</span>
                            }
                        </p>
                        <p className="text-gray-700"><span className="font-semibold">Email:</span>
                            {editing ?
                                <input
                                    type="email"
                                    name="email"
                                    value={studentData.email}
                                    onChange={handleChangeStudent}
                                    className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                /> :
                                <span className="ml-2">{studentData.email}</span>
                            }
                        </p>
                    </div>
                    {editing ?
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleEdit}
                        >
                            Save
                        </button> :
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    }
                </div>
            </div>}
            {role === "company" &&
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Company Profile</h1>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Company Name:</span>
                                {editing ?
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={companyData.companyName}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.companyName}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Industry:</span>
                                {editing ?
                                    <input
                                        type="text"
                                        name="industry"
                                        value={companyData.industry}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.industry}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Location:</span>
                                {editing ?
                                    <input
                                        type="text"
                                        name="location"
                                        value={companyData.location}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.location}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Number of Employees:</span>
                                {editing ?
                                    <input
                                        type="number"
                                        name="numberOfEmployees"
                                        value={companyData.numberOfEmployees}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.numberOfEmployees}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Contact Person:</span>
                                {editing ?
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        value={companyData.contactPerson}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.contactPerson}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Phone Number:</span>
                                {editing ?
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={companyData.phoneNumber}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.phoneNumber}</span>
                                }
                            </p>
                            <p className="text-gray-700"><span className="font-semibold">Email:</span>
                                {editing ?
                                    <input
                                        type="email"
                                        name="email"
                                        value={companyData.email}
                                        onChange={handleChange}
                                        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 ml-2"
                                    /> :
                                    <span className="ml-2">{companyData.email}</span>
                                }
                            </p>
                        </div>
                        {editing ?
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleEdit}
                            >
                                Save
                            </button> :
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfilePage;
