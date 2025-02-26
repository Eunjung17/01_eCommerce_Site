const { prisma } = require("./common");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

// make UerRole

const seed1 = async () => {
  try {
    const roles = [
      {
        name: "individual",
        description: "A regular user account for individuals.",
      },
      {
        name: "business",
        description: "An account for businesses to manage their products and services.",
      },
      {
        name: "admin",
        description: "An administrator account with full access to the platform.",
      },
    ];

    // Add user roles to the database
    for (const role of roles) {
      const existingRole = await prisma.userRole.findUnique({
        where: { name: role.name },
      });

      if (!existingRole) {
        await prisma.userRole.create({
          data: {
            name: role.name,
            description: role.description,
            isDeleted: false, // Assuming all roles are active
          },
        });
      }
    }


    console.log("Tables populated");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed1();