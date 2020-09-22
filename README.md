# OAuth 2.0 authentication in Passport and Nuxt

An example application using Nuxt, Passport, Express and Mongoose for you to use as reference or as boilerplate code.

## Setup

    git clone https://github.com/isahitya/passport-nuxt-express-mongoose-boilerplate.git

    //In api_server folder,
    npm install

    //In web_server folder,
    npm install

## Deploy

Create .env file in api_server folder,

    touch .env

And paste the following

    WEB_SERVER_HOST=localhost
    WEB_SERVER_PORT=3000
    MONGO_HOST=localhost
    MONGO_PORT=27017
    MONGO_DATABASE_NAME=testDB
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
    GOOGLE_CALLBACK_SERVICE_MAPPING="/your/google/callback/service"

Note: Don't forget to put / at the start of you google callback service. Example: /auth/google/callback

Start servers,

     //In api_server folder,
    node index.js

    //In web_server folder,
    npm run dev

Finally, open http://localhost:3000/ in your browser
