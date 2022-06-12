const app = require('../../app')
const request = require('supertest')

describe('Auth Controller Tests', () => {
    it('Signup-test: returns 200 and json when posting to signup', async ()=>{
        const res = await request(app)
        .post('/auth/signup')
        .send({
            email : "lola@lol.com",
            password : "lol123",
            name: "Lola",
            last_name: "Lolz"
        })
        expect(res.status).toEqual(200)
        expect(res.body.message).toEqual('Account Created')
    })

    it('Login-test: returns status 200, and a json token', async ()=>{
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: "lola@lol.com",
            password: "lol123",
        })
        await expect(res.status).toEqual(200)
        await expect(res.body).toHaveProperty('token')
    })
})