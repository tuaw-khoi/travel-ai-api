import dotenv from 'dotenv';
dotenv.config();

export const env = {
    APP_PORT: Number(process.env.APP_PORT),
    APP_PREFIX: process.env.PREFIX || 'Travel API',
    APP_NAME: 'Travel API',
    BACKEND_URL: process.env.BACKEND_URL,
    WEB_URL: process.env.WEB_URL,
    CORS: {
        ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '*').split(',')
    },
    GEMINI_API_KEY: process.env.GEMINI_API_KEY|| "",
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY || "",
};