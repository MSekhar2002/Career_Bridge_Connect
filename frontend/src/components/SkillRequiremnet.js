import React from 'react';

const SkillRequirementsPage = () => {
    // Sample skill requirements for companies
    const skillRequirements = [
        {
            companyName: 'TechGuru',
            industry: 'Technology',
            requirements: [
                'Proficiency in programming languages such as JavaScript, Python, or Java',
                'Experience with modern web development frameworks like React or Angular',
                'Understanding of cloud computing platforms such as AWS or Azure',
                'Strong problem-solving and analytical skills'
            ]
        },
        {
            companyName: 'MediCare',
            industry: 'Healthcare',
            requirements: [
                'Medical degree or certification in a relevant field (e.g., MD, RN, LPN)',
                'Experience working in clinical settings',
                'Knowledge of medical terminology and procedures',
                'Excellent communication and interpersonal skills'
            ]
        },
        {
            companyName: 'ArtMinds',
            industry: 'Arts & Design',
            requirements: [
                'Proficiency in design software such as Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
                'Strong understanding of typography, color theory, and layout design',
                'Experience with branding and marketing campaigns',
                'Ability to work collaboratively in a creative team environment'
            ]
        },
        {
            companyName: 'GreenTech Solutions',
            industry: 'Renewable Energy',
            requirements: [
                'Bachelor’s degree in engineering or related field',
                'Knowledge of renewable energy technologies such as solar, wind, or hydroelectric',
                'Experience with energy efficiency analysis and modeling',
                'Understanding of regulatory requirements and environmental policies'
            ]
        },
        {
            companyName: 'Global Finance Corporation',
            industry: 'Finance',
            requirements: [
                'Bachelor’s degree in finance, accounting, or related field',
                'Proficiency in financial modeling and analysis',
                'Knowledge of investment strategies and financial markets',
                'Excellent quantitative and analytical skills'
            ]
        },
        {
            companyName: 'EduSpark Education',
            industry: 'Education',
            requirements: [
                'Bachelor’s degree in education or related field',
                'Experience in curriculum development and instructional design',
                'Knowledge of learning theories and educational psychology',
                'Excellent communication and presentation skills'
            ]
        },
        {
            companyName: 'MediaWorks',
            industry: 'Media & Entertainment',
            requirements: [
                'Experience in media production, including video editing and post-production',
                'Knowledge of digital media platforms and distribution channels',
                'Creativity and ability to generate original ideas for content',
                'Strong communication and collaboration skills'
            ]
        },
        {
            companyName: 'FoodieFusion',
            industry: 'Food & Beverage',
            requirements: [
                'Experience in culinary arts and food preparation',
                'Knowledge of food safety and sanitation guidelines',
                'Creativity in menu planning and recipe development',
                'Ability to work efficiently in a fast-paced kitchen environment'
            ]
        },
        {
            companyName: 'AutoTech Innovations',
            industry: 'Automotive',
            requirements: [
                'Bachelor’s degree in mechanical engineering or automotive technology',
                'Experience with automotive design and manufacturing processes',
                'Knowledge of vehicle dynamics and performance analysis',
                'Proficiency in CAD software for design and modeling'
            ]
        },
        {
            companyName: 'SpaceTech Enterprises',
            industry: 'Aerospace',
            requirements: [
                'Bachelor’s degree in aerospace engineering or related field',
                'Experience with spacecraft design and mission planning',
                'Knowledge of orbital mechanics and propulsion systems',
                'Strong problem-solving and decision-making skills'
            ]
        },
        {
            companyName: 'BioGenetics Labs',
            industry: 'Biotechnology',
            requirements: [
                'PhD in biological sciences, biochemistry, or related field',
                'Experience in molecular biology techniques such as PCR and DNA sequencing',
                'Knowledge of genetic engineering and bioprocess engineering',
                'Ability to work in a laboratory setting and conduct scientific research'
            ]
        },
        {
            companyName: 'FashionForward',
            industry: 'Fashion',
            requirements: [
                'Degree in fashion design, textiles, or related field',
                'Proficiency in pattern-making, garment construction, and draping',
                'Knowledge of fashion trends, fabrics, and manufacturing processes',
                'Creativity and attention to detail in design and styling'
            ]
        },
        {
            companyName: 'SportsStar',
            industry: 'Sports',
            requirements: [
                'Experience in professional sports as an athlete, coach, or sports manager',
                'Knowledge of sports training techniques and sports psychology',
                'Ability to analyze performance data and develop training programs',
                'Strong leadership and communication skills'
            ]
        },
        {
            companyName: 'TravelEase',
            industry: 'Travel & Tourism',
            requirements: [
                'Bachelor’s degree in hospitality management or related field',
                'Experience in travel planning and customer service',
                'Knowledge of travel destinations, accommodations, and transportation options',
                'Ability to work in a fast-paced, customer-focused environment'
            ]
        },
        {
            companyName: 'GreenHouse Solutions',
            industry: 'Environmental Services',
            requirements: [
                'Degree in environmental science, ecology, or related field',
                'Experience with environmental monitoring and assessment',
                'Knowledge of environmental regulations and sustainability practices',
                'Ability to develop and implement environmental management plans'
            ]
        },
        {
            companyName: 'TechHealth Innovations',
            industry: 'Healthcare Technology',
            requirements: [
                'Degree in computer science, software engineering, or related field',
                'Experience in healthcare IT systems development',
                'Knowledge of healthcare data standards and interoperability',
                'Ability to develop secure and scalable healthcare applications'
            ]
        },
        {
            companyName: 'LegalEagle Law Firm',
            industry: 'Legal Services',
            requirements: [
                'Juris Doctor (JD) degree and admission to the bar',
                'Experience in legal research, writing, and case management',
                'Knowledge of applicable laws and regulations in relevant practice areas',
                'Strong advocacy and negotiation skills'
            ]
        },
        // Add more companies and their requirements here
    ];
    

    return (
        <div className="container mx-auto px-3 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Skill Requirements for Companies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillRequirements.map(company => (
                    <div key={company.companyName} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{company.companyName}</h3>
                            <p className="text-gray-600 mb-4">{company.industry}</p>
                            <ul className="list-disc list-inside text-gray-700">
                                {company.requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillRequirementsPage;
