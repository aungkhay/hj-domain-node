require('dotenv').config({ path: `./.env` })

const { connect } = require('../models');
connect();
const UserSeeder = require('./UserSeeder');

const seed = async () => {
    await UserSeeder();

    console.log('\x1b[32m%s\x1b[0m', '[Seeder] All seeders are seeded successfully');
    process.exit();
}

seed();