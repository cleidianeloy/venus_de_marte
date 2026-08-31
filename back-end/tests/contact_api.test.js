const supertest = require('supertest');
const app = require('../app')
const api = supertest(app)
describe('sending emails', () => {
  test(' it should send an email successfully', async () => {
    const response = await api
      .post('/api/contact')
      .send({
        email: 'teste@example.com',
        name: 'Teste User',
        message: 'Test message - From server test'
      })
      .expect(200);
    expect(response.body).toHaveProperty('message', 'Email sent successfully');
  })

  test('it should return 429 if rate limit is exceeded', async () => {
    const payload = {
      name: 'Teste Rate Limit',
      email: 'teste@example.com',
      message: 'Mensagem de teste',
    };

    // Usamos um IP diferente do primeiro teste para garantir isolamento
    const testIp = '198.51.100.1';

    // 1. Simula as 3 primeiras requisições permitidas
    for (let i = 0; i < 3; i++) {
      const response = await api
        .post('/api/contact')
        .set('X-Forwarded-For', testIp)
        .send(payload);

      expect(response.status).not.toBe(429);
    }

    // 2. A 4ª requisição (excedendo o limite) deve ser bloqueada
    const exceededResponse = await api
      .post('/api/contact')
      .set('X-Forwarded-For', testIp)
      .send(payload);

    expect(exceededResponse.status).toBe(429);
    expect(exceededResponse.body).toEqual({
      error: 'Too many attempts. Try again later.',
    });
  })
})

describe('failing to send a email', () => {
  test('missing the email', async () => {
    const response = await api
      .post('/api/contact')
      .send({
        name: 'Teste User',
        message: '<strong>Test message</strong> - From server test'
      })
      .expect(400);
  })

  test('missing the name', async () => {
    const response = await api
      .post('/api/contact')
      .send({
        email: 'teste@example.com',
        message: '<strong>Test message</strong> - From server test'
      })
      .expect(400);
  })

  test('missing the message', async () => {
    const response = await api
      .post('/api/contact')
      .send({
        name: 'Teste User',
        email: 'teste@example.com'
      })
      .expect(400);
  })
  test('missing the all', async () => {
    const response = await api
      .post('/api/contact')
      .send({})
      .expect(400);
  })
  test('Invalid email format', async () => {
    const response = await api
      .post('/api/contact')
      .send({       
        name: 'Teste User',
        email: 'teste',
        message: '<strong>Test message</strong> - From server test'})
      .expect(400);
  })
  test('empty message', async () => {
    const response = await api
      .post('/api/contact')
      .send({       
         name: 'Teste User',
        email: 'teste@example.com',
        message: ''
      })
      .expect(400);
  })
  test('empty name', async () => {
    const response = await api
      .post('/api/contact')
      .send({       
        name: '',
        email: 'teste@example.com',
        message: '<strong>Test message</strong> - From server test'
      })
      .expect(400);
  })
  test('name or message with only spaces', async () => {
    await api
      .post('/api/contact')
      .send({
        name: '   ',
        email: 'teste@example.com',
        message: '   '
      })
      .expect(400);
  });
})