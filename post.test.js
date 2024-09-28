const app = require('./index.js'); 
const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/posts');
const mongoose = require('mongoose'); 
require('dotenv').config();


describe('POST /create', () => {
    it('I should create a new post', async () => {
        const res = await request(app) 
            .post('/create') 
            .send({
                title: 'My First Post',
                content: 'This is the content of my first post.'
            });
        expect(res.statusCode).toEqual(201); 
        expect(res.body).toHaveProperty('_id'); 
        expect(res.body.title).toEqual('My First Post'); 
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/create')
            .send({
                content: 'This is the content of my post without a title.'
            });
        expect(res.statusCode).toEqual(400); 
        expect(res.body.message).toEqual('Title is required');
    });
});

afterAll(async () => {
    await mongoose.connection.close(); 
});