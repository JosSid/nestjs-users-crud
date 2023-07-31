export const configLoader = () => {
  return {
    port: process.env.PORT,
    database: {
      username: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    mongo: {
      uri: process.env.MONGO_URI,
    },
  };
};
