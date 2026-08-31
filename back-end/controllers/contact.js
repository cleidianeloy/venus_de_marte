const { Resend } = require('resend');
const { isRateLimited } = require('../utils/rateLimiter');
const { RESEND_API_KEY, EMAIL_TEST } = require('../utils/config');
const contactRouter = require('express').Router();

const resend = new Resend(RESEND_API_KEY);

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

contactRouter.post('/', async (request, response, next) => {
    try{
        const {email, name, message} = request.body;
        if(!email || !name || !message){
            return response.status(400).json({ error: 'Missing required fields' });
        }
        
        if(!isValidEmail(email) || email.trim() === ''){
            return response.status(400).json({ error: 'Invalid email format' });
        }

        if( name.trim() === '' || message.trim() === ''){
            return response.status(400).json({ error: 'Name and message cannot be empty' });
        }

        const ip = request.headers['x-forwarded-for']?.split(',')[0] || request.socket.remoteAddress;

        if (isRateLimited(ip)) {
            return response.status(429).json({ error: 'Too many attempts. Try again later.' });
        }

        const { data, error } = await resend.emails.send({
            from: `Acme <onboarding@resend.dev>`,
            to: [`${EMAIL_TEST}`],
            replyTo: email,
            subject: `${name} - Contato do site - ${email}`,
            text: message,
        });

        if (error) {
            return response.status(500).json({ error: 'Failed to send email' });
        }

        response.status(200).json({ message: 'Email sent successfully', data });

    }catch(error){
        next(error)
    }


})


module.exports = contactRouter;