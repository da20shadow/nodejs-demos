const config = {
    production: {
        PORT: 1234,
        DB_URI: 'mongodb://127.0.0.1:27017/offersProject',
    },
    development: {
        PORT: 3000,
        DB_URI: 'mongodb://127.0.0.1:27017/offersProject',
    }
};

module.exports = config[process.env.node_env || 'development'];