const express = require('express');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/BookStore';
const client= new MongoClient(url);

const dbConnect = async () => {
    try {
        return await client.connect();
    } catch (error) {
        console.error('Error connecting to database', error);
    }
};

module.exports = dbConnect;
