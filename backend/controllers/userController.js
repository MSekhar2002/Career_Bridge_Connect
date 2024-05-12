const user = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { faker } = require('@faker-js/faker');
var nodemailer = require('nodemailer');
const { studentWelcomeEmail,companyWelcomeEmail,companySelectedStudentEmail } = require('./emailTemplates.js');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cbcofficialhub007@gmail.com',
    pass: 'jxta aotd qnox qcqg'
  }
});

var mailOptions = {
  from: 'cbcofficialhub007@gmail.com',
  to: 'munisekhar654@gmail.com',
  subject: 'Career Bridge Connect',
  text: 'Career Bridge Connect'
};

//create token
const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//get
const getUser = async (req, res) => {
  try {
    const db = await user.find();

    if (db.length) {
      return res.status(200).send({ message: "Data fetched successfully", db });
    } else {
      return res.status(404).send({ message: "No data fund in the DB" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server  side error" });
  }
};
const generateDummyData = async () => {
  try {
   
    const students = Array.from({ length: 50 }).map(() => ({
      name: faker.person.fullName(),
      role: "student",
      password: faker.internet.password(),
      age: faker.helpers.rangeToNumber({ min: 12, max: 22 }),
      gender: faker.helpers.arrayElement(["male", "female"]),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      grade: faker.helpers.arrayElement(["6th", "7th", "8th", "9th", "10th", "11th", "12th", "Graduation"]),
      school: faker.company.name,
      areaOfInterest: faker.word.words(),
      academicDetails: {
        marks: faker.helpers.rangeToNumber({ min: 35, max: 100 }),
        rank: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
      },
    }));

    // Insert dummy data into MongoDB
    await user.insertMany(students);

    console.log("Dummy data inserted successfully.");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } 
};

// Call the function to generate and insert dummy data
// generateDummyData();

//registration
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } =
      req.body || {};
    console.log("Request Body:", req.body);
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, Please login" });
    }
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      console.log("Invalid Data:", {
        name,
        email,
        password,
        role,
      });
      return res
        .status(400)
        .send({ message: "Invalid data. All fields are required." });
    }
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    
    const newUser = new user({
      name,
      email,
      password: hashedpassword,
      role,
    });
    console.log(newUser)
    const result = await newUser.save();
    console.log(result);
    const token = createToken(newUser);
    res.status(200).json({ message: "Registered successfully", result, token });
    mailOptions.to=email
    if (role==="student"){
      mailOptions.text=studentWelcomeEmail
    }
    else{
      mailOptions.text=companyWelcomeEmail
    }
    mailOptions.subject="Welcome to Career Bridge Connect 🎉"
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).send({ message: "Required field is missing" });
    }
    const loginuser = await user.findOne({ email: email });
    console.log("ps",loginuser)
    if (!loginuser) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }
    try {
      const passwordcheck =await bcrypt.compare(password, loginuser.password);
      if (!passwordcheck) {
        return res.status(401).send({ message: "Invalid email or password!" });
      }
      const token = createToken(loginuser);
      res.status(200).send({
        message: "Logged in successfully",
        loginuser,
        token,
      });
    } catch (bcryptError) {
      console.error("Error comparing passwords:", bcryptError);
      return res.status(400).send({ message: "Email or password is invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

//send mail to student
const sendMail= async (req, res) => {
  try {
    const { student,userData } = req.body;

    // Check if student is provided
    if (!student) {
      return res.status(400).json({ message: 'Student email is required' });
    }

    // Compose email options
    const mailOptions = {
      from: 'cbcofficial007@gmail.com',
      to: student.email,
      subject: 'Congratulations! You have been selected',
      text: companySelectedStudentEmail(student.name,userData.name),
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
      const { _id, ...updateData } = req.body;

      console.log("Data :", updateData);
      console.log("Id :", _id);

      const updatedProfile = await user.findByIdAndUpdate(_id, updateData, {
          new: true,
      });

      if (!updatedProfile) {
          return res.status(404).json({ message: "user not found" });
      }

      res.status(200).json({ message: "Updated successfully", user: updatedProfile });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params || {};
    if (!id) {
      return res.status(400).send({ message: "Required field is missing" });
    }

    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ message: "User data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  sendMail
};
