import React from 'react';

const AreasOfInterestPage = () => {
    const interests = [
        {
            title: 'Engineering',
            description: 'Explore the world of engineering and its diverse fields such as civil, mechanical, electrical, and more.'
        },
        {
            title: 'Medicine',
            description: 'Learn about the fascinating field of medicine, from doctors to researchers to medical technicians.'
        },
        {
            title: 'Arts & Humanities',
            description: 'Express your creativity and explore various forms of art, literature, history, and philosophy.'
        },
        {
            title: 'Science',
            description: 'Dive into the realm of scientific discovery and exploration, spanning physics, chemistry, biology, and more.'
        },
        {
            title: 'Technology',
            description: 'Discover the latest advancements in technology, including computer science, software development, and innovation.'
        },
        {
            title: 'Business & Finance',
            description: 'Learn about the world of business, economics, and finance, from entrepreneurship to investment banking.'
        },
        {
            title: 'Law & Justice',
            description: 'Explore the principles of law and justice, including criminal justice, civil rights, and legal advocacy.'
        },
        {
            title: 'Education',
            description: 'Delve into the field of education, from teaching and curriculum development to educational psychology and administration.'
        },
        {
            title: 'Environmental Science',
            description: 'Study the natural world and its ecosystems, and work towards solutions for environmental challenges like climate change and conservation.'
        },
        {
            title: 'Agriculture & Farming',
            description: 'Learn about agricultural practices, crop production, livestock management, and sustainable farming techniques.'
        },
        {
            title: 'Architecture',
            description: 'Design and construct buildings and structures, combining elements of art, engineering, and urban planning.'
        },
        {
            title: 'Psychology',
            description: 'Explore the human mind and behavior, including topics like cognitive processes, social interactions, and mental health.'
        },
        {
            title: 'Sports & Athletics',
            description: 'Engage in physical activity and competition, and study areas such as sports science, coaching, and sports management.'
        },
        {
            title: 'Music',
            description: 'Discover the world of music, including theory, composition, performance, and music production.'
        },
        {
            title: 'Film & Media',
            description: 'Explore the art and technology of filmmaking, television production, digital media, and storytelling.'
        },
        {
            title: 'Fashion & Design',
            description: 'Express your style and creativity through fashion design, textiles, garment construction, and fashion marketing.'
        },
        {
            title: 'Culinary Arts',
            description: 'Learn the art and science of cooking, baking, and culinary techniques, and explore the world of food culture and hospitality.'
        },
        {
            title: 'Automotive Technology',
            description: 'Study automotive engineering, mechanics, and technology, and explore the design and maintenance of vehicles.'
        },
        {
            title: 'Space Exploration',
            description: 'Explore the final frontier and study space science, astronomy, astrophysics, and the exploration of celestial bodies.'
        },
        {
            title: 'Robotics',
            description: 'Dive into the world of robotics and automation, from building and programming robots to applications in industry and research.'
        },
        {
            title: 'Game Development',
            description: 'Create and design video games, and learn about game programming, game design principles, and the gaming industry.'
        },
        {
            title: 'Digital Marketing',
            description: 'Explore the world of online marketing, including social media marketing, search engine optimization (SEO), and content marketing.'
        },
        {
            title: 'Data Science',
            description: 'Analyze and interpret data using statistical methods and machine learning algorithms, and uncover insights for decision-making.'
        },
        // Add more interests here
    ];
    

    return (
        <div>
            <section className="py-20 bg-gray-100 p-3">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Areas of Interest</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {interests.map(interest => (
                            <div key={interest.title} className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{interest.title}</h3>
                                <p className="text-gray-700">{interest.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AreasOfInterestPage;
