const app = require('../../app')
const request = require('supertest')

describe('Auth Controller Tests', () => {
    it('returns 200 and json when posting to signup', async ()=>{
        const response = await request(app)
        .post('/auth/signup')
        .send({
            "email" : "lola@lol.com",
            "password" : "lol123",
            "name": "Lola",
            "last_name": "Lolz"
        })
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Account Created')
    })
})