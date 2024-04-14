import React from 'react';

const CompaniesPage = () => {
    const companies = [
        {
            name: 'TechGuru',
            industry: 'Technology',
            description: 'TechGuru is a leading tech company specializing in software development and innovation.'
        },
        {
            name: 'MediCare',
            industry: 'Healthcare',
            description: 'MediCare is a healthcare company dedicated to providing quality medical services and products.'
        },
        {
            name: 'ArtMinds',
            industry: 'Arts & Design',
            description: 'ArtMinds is a creative agency offering design, branding, and digital marketing services.'
        },
        {
            name: 'GreenTech Solutions',
            industry: 'Renewable Energy',
            description: 'GreenTech Solutions focuses on developing sustainable energy solutions through renewable sources.'
        },
        {
            name: 'Global Finance Corporation',
            industry: 'Finance',
            description: 'Global Finance Corporation provides financial services including banking, investment, and insurance.'
        },
        {
            name: 'EduSpark Education',
            industry: 'Education',
            description: 'EduSpark Education offers innovative educational programs and learning solutions for students.'
        },
        {
            name: 'MediaWorks',
            industry: 'Media & Entertainment',
            description: 'MediaWorks is a media company producing content for television, film, and digital platforms.'
        },
        {
            name: 'FoodieFusion',
            industry: 'Food & Beverage',
            description: 'FoodieFusion is a restaurant chain offering a fusion of international cuisines and dining experiences.'
        },
        {
            name: 'AutoTech Innovations',
            industry: 'Automotive',
            description: 'AutoTech Innovations specializes in developing advanced automotive technologies for safer and more efficient vehicles.'
        },
        {
            name: 'SpaceTech Enterprises',
            industry: 'Aerospace',
            description: 'SpaceTech Enterprises is a pioneer in space exploration technology, providing solutions for satellite launches and space missions.'
        },
        {
            name: 'BioGenetics Labs',
            industry: 'Biotechnology',
            description: 'BioGenetics Labs conducts research and development in biotechnology, focusing on genetic engineering and medical breakthroughs.'
        },
        {
            name: 'FashionForward',
            industry: 'Fashion',
            description: 'FashionForward is a fashion retailer offering trendy clothing, accessories, and lifestyle products.'
        },
        {
            name: 'SportsStar',
            industry: 'Sports',
            description: 'SportsStar is a sports agency representing athletes and managing sports events, sponsorships, and endorsements.'
        },
        {
            name: 'TravelEase',
            industry: 'Travel & Tourism',
            description: 'TravelEase is a travel agency offering personalized travel planning services and vacation packages.'
        },
        {
            name: 'TechUp',
            industry: 'Information Technology',
            description: 'TechUp is an IT services company providing solutions in cloud computing, cybersecurity, and digital transformation.'
        },
        {
            name: 'HealthFirst',
            industry: 'Healthcare',
            description: 'HealthFirst is a healthcare provider offering comprehensive medical services and personalized patient care.'
        },
        {
            name: 'ArtisticVisions',
            industry: 'Arts & Entertainment',
            description: 'ArtisticVisions is a creative studio specializing in visual effects, animation, and digital art production.'
        },
        {
            name: 'GreenEnergy Solutions',
            industry: 'Renewable Energy',
            description: 'GreenEnergy Solutions develops sustainable energy solutions through solar power, wind energy, and green building technologies.'
        },
        {
            name: 'FinancialStrategies Inc.',
            industry: 'Finance',
            description: 'FinancialStrategies Inc. offers financial planning, investment management, and retirement solutions for individuals and businesses.'
        },
        {
            name: 'EduInnovate',
            industry: 'Education',
            description: 'EduInnovate provides innovative learning solutions and educational technology to empower students and educators.'
        },
        // Add more companies here
    ];
    

    return (
        <div className="container mx-auto py-10 px-3">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Companies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.map(company => (
                    <div key={company.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                            <p className="text-gray-700 mb-4">{company.description}</p>
                            <p className="text-sm text-gray-600">{company.industry}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompaniesPage;
