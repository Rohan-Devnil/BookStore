const express = require("express");
const dbConnect = require("./Database");
const DatabaseName = 'BookStore';
const collectionName = 'customer';
const bcrypt = require('bcryptjs');
const addCustomer = require("./addCustomer");
const {authenticateToken, generateToken} = require('./jwtUtils');
const sendMail = require('./nodeMailer');
require('dotenv').config();
const nodemailer = require("nodemailer");

const loginCustomer = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password ) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        const client = await dbConnect();
        const db = client.db(DatabaseName);
        const collection = db.collection(collectionName);

        const customer = await collection.findOne({ Email });

        if (!customer) {
            return res.status(404).json({ message: 'Email does not exist' });
        }
        const existingCustomer = await collection.findOne({ Email: Email });
        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer does not exist.' });
        }

        const isPasswordMatch = await bcrypt.compare(Password, existingCustomer.Password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect Password.' });
        }
        const token = generateToken(customer.Email);
        console.log('Token is:', token);
        
        const subject = 'Successful Login Notification';
        const html = `<p>Hello,</p>
                      <p>You have successfully logged in.</p>`;
                      
        const emailResponse = await sendMail(Email, subject, html);

        return res.status(200).json({
            statusCode: 200,
            body: 'Login successful',
            token,
            emailResponse: emailResponse.body
        });

        const result = await collection.find().toArray(); 
        console.log("Data: ", result);

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: error.message });
    }
};
module.exports = loginCustomer;
