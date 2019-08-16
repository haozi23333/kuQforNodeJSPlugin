import config from "./config";
import * as Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(config.mysql.database, config.mysql.username,  config.mysql.password, {
    host:  config.mysql.host,
    dialect: 'mariadb'
});

export default sequelize;