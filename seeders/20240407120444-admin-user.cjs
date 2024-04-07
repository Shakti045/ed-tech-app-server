const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let password = process.env.ADMIN_PASSWORD;
        const hashPassword = bcrypt.hashSync(password, 10);
        return queryInterface.bulkInsert('User', [
            {
                name: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: hashPassword,
                profilepic:`https://ui-avatars.com/api/name=${process.env.ADMIN_USERNAME}/?background=random`,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('User', { role: 'admin'}, {});
    },
};