const db = require('../connections/Mysql');

const User = require('./User');
const Domain = require('./Domain');

const models = {
    User,
    Domain
}

// Export models + db connection
module.exports = {
    ...models,
    db,
    connect: async () => {
        try {
            await db.authenticate();
            console.log('\x1b[32m[DB]\x1b[0m', 'Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    syncDB: async () => {
        try {
            await db.sync(); // use { force: true } to drop & recreate tables
            console.log('\x1b[36m[DB]\x1b[0m Tables synchronized successfully.');
        } catch (err) {
            console.error('Error synchronizing database:', err);
        }
    }
};