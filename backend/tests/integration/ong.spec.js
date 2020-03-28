const app = require('../../src/app')
const request = require('supertest')
const connection = require('../../src/database/connection')
describe('ONG', ()=> {
    beforeEach(async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async()=>{await connection.destroy()})
    it('should be able to create a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
                name:"ABCD",
                email:"abcd@e.com.br",
                whatsapp:"81000000000",
                city:"Paulista",
                uf:"PE"
    })
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
})
})