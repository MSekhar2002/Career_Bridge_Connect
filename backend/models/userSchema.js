const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // Common fields
    name: {
        type: String,
    },
    role:{
        type: String,
    },
    password:{
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    // Student-specific fields
    grade: {
        type: String,
    },
    school: {
        type: String,
    },
    areaOfInterest: {
        type: String,
    },
    academicDetails: {
        type: Object,
    },
    // Company-specific fields
    companyName: {
        type: String,
    },
    industry: {
        type: String,
    },
    location: {
        type: String,
    },
    numberOfEmployees: {
        type: Number,
    },
    contactPerson: {
        type: String,
    },
});

module.exports = mongoose.model("userSchema", userSchema);
