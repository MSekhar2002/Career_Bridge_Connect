const studentWelcomeEmail = `
Hey there! 👋

Welcome to our web portal! We're excited to have you join our community and embark on this journey with us. 🚀

As a student, you're taking the first step towards shaping your future. By registering with us, you're opening doors to exciting opportunities and experiences that will help you grow and thrive. 💼

Here's what our web portal offers:

1. Registration: Complete your registration process to access exclusive features and resources tailored to your interests.

2. Explore Opportunities: Browse through a wide range of opportunities from leading companies looking for talented individuals like you. 🔍

3. Skill Development: Take advantage of our resources to enhance your skills and stay ahead in your chosen field. 📚

4. Real-world Exposure: Gain valuable real-world experience by connecting with companies early on and exploring internship opportunities. 🌍

5. Support and Guidance: Our team is here to support you every step of the way. If you have any questions or need assistance, feel free to reach out to us. 🤝

We're committed to helping you reach your goals and achieve success. Get started now and unlock your full potential!

Best regards,
Career Bridge Connect Team 🚀
`;

const companyWelcomeEmail = `
Hello there! 👋

Welcome to our web portal! We're thrilled to have your company join our community and explore the exciting opportunities that await. 🎉

By registering with us, you're gaining access to a pool of talented individuals who are eager to contribute to your company's success. 💡

Here's what our web portal offers:

1. Talent Discovery: Explore a diverse range of talented students who are passionate about making a difference in your industry. 🌟

2. Internship Programs: Connect with promising students early on and offer internship opportunities to nurture and develop their skills. 💼

3. Skill Matching: Find students whose areas of interest align with your company's needs, ensuring a perfect fit for both parties. 🔍

4. Networking: Expand your network and engage with other industry professionals to stay informed about the latest trends and developments. 📈

5. Support and Assistance: Our team is dedicated to providing you with support and assistance every step of the way. If you have any questions or need help, don't hesitate to reach out. 🤝

We're excited to see the amazing collaborations that will unfold between your company and our talented students. Let's work together to achieve great things!

Best regards,
Career Bridge Connect Team 🚀
`;
const companySelectedStudentEmail = (studentName,companyName) => {
return `
Hey ${studentName}! 👋

Congratulations! 🎉

We are thrilled to inform you that you have been selected for ${companyName} company for an exciting opportunity. 🌟

We believe that your skills and talents will make a valuable contribution to our team. We are excited to work with you and help you grow in your Career journey. 💼

Please let us know if you have any questions or need any further information. We look forward to hearing from you soon! 📩

Best regards,
Career Bridge Connect Team 🚀`;
};

  
module.exports = {
  studentWelcomeEmail,
  companyWelcomeEmail,
  companySelectedStudentEmail
};
