require('dotenv').config()

export const PORT: string = process.env.PORT || '8080'

export const MONGODB_URI: string = process.env.NODE_ENV === 'test' || ''
  ? process.env.TEST_MONGODB_URI || ''
  : process.env.MONGODB_URI || ''

