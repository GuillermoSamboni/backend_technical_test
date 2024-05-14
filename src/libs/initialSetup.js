const RoleSchema = require("../models/RoleModel");
const { errorResponse } = require("../middleware/StructureResponse");
async function createRole() {
  try {
    const countRoles = await RoleSchema.estimatedDocumentCount();
    if (countRoles > 0) return;

    await Promise.all([
      new RoleSchema({
        name_role: "user",
        description_role: "user is a public, not have permission admin",
      }).save(),

      new RoleSchema({
        name_role: "admin",
        description_role: "user is a admin, have persmissions of admin",
      }).save(),
    ]);
  } catch (error) {
    errorResponse(500, "Error creating roles default", error.message);
  }
}

module.exports = createRole;
