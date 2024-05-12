import React, { useContext } from 'react';
import instance from '../axios/axios';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';
import { useSnackbar } from "notistack";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function StudentList() {
  const [studentData, setStudentData] = React.useState([]);
  const [filteredStudentData, setFilteredStudentData] = React.useState([]);
  const [filters, setFilters] = React.useState({ areaOfInterest: '', location: '', school: '' });
  const { loggedIn } = useContext(AuthContext);
  const userToken = localStorage.getItem("token");
  const { userData } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  console.log(filters);
  console.log(filteredStudentData);
  // Function to send email to student
  const sendEmailToStudent = async (student) => {
    try {
      const response = await instance.post('/sendmail', { student, userData });
      enqueueSnackbar(response.data.message, { variant: "success" });
      console.log(response.data);
      // Handle response accordingly
    } catch (error) {
      console.error('Error sending email:', error.message);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      // Handle error here
    }
  };

  const getUserData = async () => {
    try {
      const response = await instance.get(`/getuser`);
      const { db } = response?.data || {};
      const UpdatedData = db?.filter(obj => obj?.role === "student");
      setStudentData(UpdatedData);
      setFilteredStudentData(UpdatedData);
    } catch (error) {
      console.error(error.message);
      // Handle error here
    }
  };

  const handleFilterChange = (event, value, filterKey) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterKey]: value }));
  };

  const filterStudentData = () => {
    let filteredData = studentData;
  
    if (filters?.areaOfInterest) {
      filteredData = filteredData.filter(student =>
        student?.areaOfInterest?.toLowerCase()?.includes(filters?.areaOfInterest?.toLowerCase())
      );
    }
  
    if (filters?.address) {
      filteredData = filteredData.filter(student =>
        student?.address?.toLowerCase()?.includes(filters?.address?.toLowerCase())
      );
    }
  
    if (filters?.school) {
      filteredData = filteredData.filter(student =>
        student?.school?.toLowerCase()?.includes(filters?.school?.toLowerCase())
      );
    }
  
    setFilteredStudentData(filteredData);
  };
  


  React.useEffect(() => {
    if (loggedIn === true && userToken) {
      getUserData();
    }
  }, [loggedIn, userToken]);

  React.useEffect(() => {
    filterStudentData();
  }, [filters,]);

  const handleSelectStudent = (studentEmail) => {
    sendEmailToStudent(studentEmail);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
        <Autocomplete
          value={filters.areaOfInterest}
          onChange={(event, newValue) => handleFilterChange(event, newValue, 'areaOfInterest')}
          options={studentData?.map(student => ({ label: student?.areaOfInterest || '' }))} // Ensure each option has a 'label' property
          renderInput={(params) => <TextField {...params} label="Area of Interest" />}
        />

        <Autocomplete
          className='mt-2'

          value={filters.location}
          onChange={(event, newValue) => handleFilterChange(event, newValue, 'location')}
          options={studentData?.map(student => ({ label: student?.address || '' }))} // Ensure each option has a 'label' property
          renderInput={(params) => <TextField {...params} label="Location" />}
        />

        <Autocomplete
          className='mt-2'
          value={filters.school}
          onChange={(event, newValue) => handleFilterChange(event, newValue, 'school')}
          options={studentData?.map(student => ({ label: student?.school || '' }))} // Ensure each option has a 'label' property
          renderInput={(params) => <TextField {...params} label="School" />}
        />

      </div>
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">List of Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudentData?.map((student) => (
            <div key={student?.id} className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{student?.name}</h3>
              <p className="text-gray-600"><span className="font-semibold">Area of Interest:</span> {student?.areaOfInterest}</p>
              <p className="text-gray-600"><span className="font-semibold">School:</span> {student?.school}</p>
              <p className="text-gray-600"><span className="font-semibold">Location:</span> {student?.location}</p>
              <p className="text-gray-600"><span className="font-semibold">Email:</span> {student?.email}</p>
              <p className="text-gray-600"><span className="font-semibold">Phone:</span> {student?.phoneNumber}</p>
              <button
                onClick={() => handleSelectStudent(student)} // Pass student email as parameter
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Select Student
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentList;
