import React,{useContext,useState} from 'react';
import AuthContext from "../context/AuthContext";
import UserContext from '../context/UserContext';
function StudentHomePage() {
    const {data,setData}= useState([])
    const { loggedIn } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const role = userData.role

console.log(userData);
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {role==="student" && 
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Career Bridge Connect</h1>
          <p className="text-lg text-gray-700 mb-8">Empowering students to explore their interests and connect with future Careers from an early age.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Areas of Interest</h2>
              <p className="text-gray-700 mb-4">Discover a variety of fields and industries to explore based on your interests, passions, and skills.</p>
              <a href="/intrest" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Explore Now</a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Companies</h2>
              <p className="text-gray-700 mb-4">Explore companies available based on your interests, passions, and skills.</p>
              <a href="/companylist" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Explore Now</a>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Why Choose Career Bridge Connect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Exposure to Careers</h3>
                <p className="text-gray-700">Gain valuable real-world exposure to various Career paths from a young age, helping you make informed decisions about your future.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h3>
                <p className="text-gray-700">Receive personalized recommendations based on your interests, skills, and goals, helping you discover new opportunities.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Skill Development</h3>
                <p className="text-gray-700">Access resources and training programs tailored to your interests, allowing you to develop valuable skills and enhance your employability.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Connections</h3>
                <p className="text-gray-700">Connect with leading companies and professionals in your areas of interest, opening doors to internship and job opportunities.</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Additional Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Assessments</h3>
                <p className="text-gray-700">Take Career assessments to identify your strengths, interests, and values, helping you make informed decisions about your future Career path.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Mentorship Programs</h3>
                <p className="text-gray-700">Join mentorship programs where experienced professionals provide guidance, support, and advice to help you navigate your Career journey.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Internship Opportunities</h3>
                <p className="text-gray-700">Access internship opportunities at leading companies to gain practical experience, build your resume, and network with industry professionals.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Workshops</h3>
                <p className="text-gray-700">Attend workshops and seminars on various Career-related topics, including resume writing, interview skills, networking, and professional development.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Scholarship Opportunities</h3>
                <p className="text-gray-700">Explore scholarship opportunities to fund your education and support your Career goals, ensuring that financial barriers do not hinder your success.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Engagement</h3>
                <p className="text-gray-700">Get involved in community service projects and volunteer opportunities to develop leadership skills, expand your network, and make a positive impact on society.</p>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {role==="company" && 
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Career Bridge Connect company</h1>
          <p className="text-lg text-gray-700 mb-8">Connecting companies with talented students from an early age.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Talent</h2>
              <p className="text-gray-700 mb-4">Discover talented students who match your company's needs and requirements.</p>
              <a href="/studentlist" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Search Now</a>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Why Choose Career Bridge Connect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Access to Talent Pool</h3>
                <p className="text-gray-700">Gain access to a diverse pool of talented students with a wide range of skills and interests.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Talent Development</h3>
                <p className="text-gray-700">Nurture talent from an early age, providing opportunities for skill development and real-world exposure.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Cost-Effective Recruitment</h3>
                <p className="text-gray-700">Save on recruitment costs by identifying and engaging with potential candidates at an early stage.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Build Future Talent Pipeline</h3>
                <p className="text-gray-700">Build a pipeline of future talent, ensuring a steady supply of skilled individuals for your company's future needs.</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Additional Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Internship Programs</h3>
                <p className="text-gray-700">Offer internship programs to students, providing them with valuable work experience and helping them develop relevant skills.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Mentorship Opportunities</h3>
                <p className="text-gray-700">Provide mentorship opportunities for students, offering guidance and support to help them succeed in their chosen Career paths.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Partnerships</h3>
                <p className="text-gray-700">Collaborate with educational institutions and other companies to create industry partnerships and foster innovation.</p>
              </div>
            </div>
          </div>
      
      </div>
    </div>}
    </div>
  );
}

export default StudentHomePage;
