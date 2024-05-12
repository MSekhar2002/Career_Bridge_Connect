import React, { useState } from 'react';

const AreasOfInterestPage = () => {
    const interests = [
        {
            title: 'Engineering',
            description: 'Explore the world of engineering and its diverse fields such as civil, mechanical, electrical, and more.',
            category: 'Science & Engineering'
        },
        {
            title: 'Medicine',
            description: 'Learn about the fascinating field of medicine, from doctors to researchers to medical technicians.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Arts & Humanities',
            description: 'Express your creativity and explore various forms of art, literature, history, and philosophy.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Science',
            description: 'Dive into the realm of scientific discovery and exploration, spanning physics, chemistry, biology, and more.',
            category: 'Science & Engineering'
        },
        {
            title: 'Technology',
            description: 'Discover the latest advancements in technology, including computer science, software development, and innovation.',
            category: 'Science & Engineering'
        },
        {
            title: 'Business & Finance',
            description: 'Learn about the world of business, economics, and finance, from entrepreneurship to investment banking.',
            category: 'Business & Finance'
        },
        {
            title: 'Law & Justice',
            description: 'Explore the principles of law and justice, including criminal justice, civil rights, and legal advocacy.',
            category: 'Law & Justice'
        },
        {
            title: 'Education',
            description: 'Delve into the field of education, from teaching and curriculum development to educational psychology and administration.',
            category: 'Education'
        },
        {
            title: 'Environmental Science',
            description: 'Study the natural world and its ecosystems, and work towards solutions for environmental challenges like climate change and conservation.',
            category: 'Science & Engineering'
        },
        {
            title: 'Agriculture & Farming',
            description: 'Learn about agricultural practices, crop production, livestock management, and sustainable farming techniques.',
            category: 'Science & Engineering'
        },
        {
            title: 'Architecture',
            description: 'Design and construct buildings and structures, combining elements of art, engineering, and urban planning.',
            category: 'Science & Engineering'
        },
        {
            title: 'Psychology',
            description: 'Explore the human mind and behavior, including topics like cognitive processes, social interactions, and mental health.',
            category: 'Social Sciences'
        },
        {
            title: 'Sports & Athletics',
            description: 'Engage in physical activity and competition, and study areas such as sports science, coaching, and sports management.',
            category: 'Health & Fitness'
        },
        {
            title: 'Music',
            description: 'Discover the world of music, including theory, composition, performance, and music production.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Film & Media',
            description: 'Explore the art and technology of filmmaking, television production, digital media, and storytelling.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Fashion & Design',
            description: 'Express your style and creativity through fashion design, textiles, garment construction, and fashion marketing.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Culinary Arts',
            description: 'Learn the art and science of cooking, baking, and culinary techniques, and explore the world of food culture and hospitality.',
            category: 'Food & Beverage'
        },
        {
            title: 'Automotive Technology',
            description: 'Study automotive engineering, mechanics, and technology, and explore the design and maintenance of vehicles.',
            category: 'Science & Engineering'
        },
        {
            title: 'Space Exploration',
            description: 'Explore the final frontier and study space science, astronomy, astrophysics, and the exploration of celestial bodies.',
            category: 'Science & Engineering'
        },
        {
            title: 'Robotics',
            description: 'Dive into the world of robotics and automation, from building and programming robots to applications in industry and research.',
            category: 'Science & Engineering'
        },
        {
            title: 'Game Development',
            description: 'Create and design video games, and learn about game programming, game design principles, and the gaming industry.',
            category: 'Technology'
        },
        {
            title: 'Digital Marketing',
            description: 'Explore the world of online marketing, including social media marketing, search engine optimization (SEO), and content marketing.',
            category: 'Business & Finance'
        },
        {
            title: 'Data Science',
            description: 'Analyze and interpret data using statistical methods and machine learning algorithms, and uncover insights for decision-making.',
            category: 'Technology'
        },
        {
            title: 'Chemistry',
            description: 'Study the composition, structure, properties, and reactions of matter, particularly at the atomic and molecular level.',
            category: 'Science & Engineering'
        },
        {
            title: 'Physics',
            description: 'Explore the fundamental principles governing the behavior of matter and energy in the universe.',
            category: 'Science & Engineering'
        },
        {
            title: 'Biology',
            description: 'Examine the structure, function, growth, evolution, and distribution of living organisms.',
            category: 'Science & Engineering'
        },
        {
            title: 'Geology',
            description: 'Investigate the solid Earth, including its materials, processes, structures, and history.',
            category: 'Science & Engineering'
        },
        {
            title: 'Political Science',
            description: 'Analyze systems of government, political activity, political behavior, and political thought.',
            category: 'Social Sciences'
        },
        {
            title: 'Sociology',
            description: 'Study society, social institutions, and social relationships, including patterns of social behavior.',
            category: 'Social Sciences'
        },
        {
            title: 'Anthropology',
            description: 'Explore human societies and cultures, including their origins, development, and diversity.',
            category: 'Social Sciences'
        },
        {
            title: 'Ethnic Studies',
            description: 'Examine the histories, cultures, and experiences of various ethnic groups and minorities.',
            category: 'Social Sciences'
        },
        {
            title: 'Languages',
            description: 'Learn and explore different languages, linguistics, and the structure of communication.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Literature',
            description: 'Read and analyze literary works, including novels, poetry, drama, and prose.',
            category: 'Arts & Humanities'
        },
        {
            title: 'History',
            description: 'Study past events, people, societies, and cultures, and their significance and impact on the present.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Philosophy',
            description: 'Investigate fundamental questions about existence, knowledge, ethics, and reality.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Religious Studies',
            description: 'Examine religious beliefs, practices, texts, and institutions across different cultures and traditions.',
            category: 'Arts & Humanities'
        },
        {
            title: 'Health Sciences',
            description: 'Explore various aspects of health, wellness, disease prevention, and healthcare delivery.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Nutrition',
            description: 'Learn about food, nutrients, and their effects on health, wellness, and disease prevention.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Nursing',
            description: 'Provide care for individuals, families, and communities to promote health and well-being.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Public Health',
            description: 'Promote and protect the health of populations through education, policy, and community initiatives.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Dentistry',
            description: 'Diagnose, treat, and prevent oral diseases and conditions to maintain oral health.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Veterinary Science',
            description: 'Care for and treat animals to promote their health and well-being.',
            category: 'Healthcare & Medicine'
        },
        {
            title: 'Hospitality Management',
            description: 'Manage and oversee operations in hotels, restaurants, resorts, and other hospitality establishments.',
            category: 'Business & Finance'
        },
        {
            title: 'Tourism',
            description: 'Promote and facilitate travel and tourism experiences for individuals and groups.',
            category: 'Business & Finance'
        },
        {
            title: 'Event Management',
            description: 'Plan, organize, and execute events, meetings, and conferences for various purposes and audiences.',
            category: 'Business & Finance'
        },
        {
            title: 'Real Estate',
            description: 'Buy, sell, rent, and manage properties and real estate assets for residential, commercial, or investment purposes.',
            category: 'Business & Finance'
        },
        
        
    ];
    const [selectedCategory, setSelectedCategory] = useState('All'); // State to hold the selected category
    const [filteredInterests, setFilteredInterests] = useState(interests); // State to hold filtered interests

    const categories = [
        'All',
        'Science & Engineering',
        'Healthcare & Medicine',
        'Arts & Humanities',
        'Business & Finance',
        'Law & Justice',
        'Education',
        'Social Sciences',
        'Health & Fitness',
        'Food & Beverage',
        'Technology'
    ];
    
    const filterInterests = (category) => {
        
        if (category === 'All') {
            setFilteredInterests(interests); // If 'All' is selected, show all interests
        } else {
            const filtered = interests.filter(interest => interest.category === category);
            setFilteredInterests(filtered); // Filter interests based on category
        }
        setSelectedCategory(category); // Update selected category
    };

    return (
        <div>
            <section className="py-20 bg-gray-100 p-3">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Areas of Interest</h2>
                    <div className="mb-4 flex justify-center">
    {/* Render category dropdown */}
    <select
        value={selectedCategory}
        onChange={(e) => filterInterests(e.target.value)}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none"
    >
        {categories.map(category => (
            <option key={category} value={category}>{category}</option>
        ))}
    </select>
</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Render filtered interests */}
                        {filteredInterests.map(interest => (
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
