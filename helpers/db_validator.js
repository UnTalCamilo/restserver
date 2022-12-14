const Role = require("../models/role");
const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role ${role} is not registered in the database`);
  }
}
module.exports = {
    isValidRole
}
