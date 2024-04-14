import React from 'react';
import muniSekharImage from './images/Sekhar.jpeg'

const OurTeamPage = () => {
    // Sample data for team members
    const teamMembers = [
        
        {
            name: 'Muni Sekhar',
            position: 'Developer',
            bio: 'Muni Sekhar is a passionate developer with expertise in frontend and backend technologies. He enjoys solving complex problems and building scalable applications that make a positive impact.',
            image: muniSekharImage
        },
        {
            name: 'Sai Kumar',
            position: 'Developer',
            bio: 'Saiv Kumar is a dedicated developer with a focus on frontend development. He loves experimenting with new technologies and creating intuitive user experiences.',
            // image: saiKumarImage
        },
        {
            name: 'Vivek',
            position: 'Developer',
            bio: 'Vivek is a versatile developer with skills in both frontend and backend development. He thrives in collaborative environments and enjoys learning new technologies.',
            // image: vivekImage
        },
        {
            name: 'Annam Raju',
            position: 'Developer',
            bio: 'Annam Raju is a talented developer with a passion for building robust and efficient software solutions. He enjoys exploring new frameworks and methodologies to enhance his development skills.',
            // image: annamRajuImage
        }
    ];

    return (
        <div className="container mx-auto px-3 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="w-full h-48 object-cover object-center" src={member?.image} alt={member.name} />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                            <p className="text-gray-600 mb-4">{member.position}</p>
                            <p className="text-gray-700">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurTeamPage;
