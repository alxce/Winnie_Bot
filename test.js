
console.log("test");

// console.log(require('dotenv').config({ debug: process.env.DEBUG }));


if (process.env.POSTGRES_CONNECTION_STRING != "") {
    console.log("POSTGRES_CONNECTION_STRING exists");
}

if (process.env.REDIS_HOST != "") {
    console.log("REDIS_HOST exists");
}

if (process.env.REDIS_PORT != "") {
    console.log("REDIS_PORT exists");
}

if (process.env.BOT_TOKEN != "") {
    console.log("BOT_TOKEN exists");
}

if (process.env.NODE_ENV != "") {
    console.log("NODE_ENV exists: " + process.env.NODE_ENV);
}
