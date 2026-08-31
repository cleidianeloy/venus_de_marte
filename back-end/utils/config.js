require('dotenv').config()

const PORT = process.env.PORT
const RESEND_API_KEY  = process.env.RESEND_API_KEY
const EMAIL_TEST  = process.env.EMAIL_TEST
module.exports = {
  PORT,
  RESEND_API_KEY,
  EMAIL_TEST
}