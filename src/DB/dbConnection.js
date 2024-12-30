import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("breakfast", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export const dbAuth = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Authenticate Success");
  } catch (error) {
    console.log(error);
  }
};

export const dbSync = async () => {
  try {
    await sequelize.sync({alter : false});
    console.log("DB Sync Success");
  } catch (error) {
    console.log(error);
  }
};
