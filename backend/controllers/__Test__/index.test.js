const app = require('../../app')
const request = require('supertest')

describe('global 404', () => {
    it('return 404 when directed to a non-existing page', async ()=>{
        const response = await request(app)
        .get('/')
        expect(response.status).toEqual(404)
    })
})