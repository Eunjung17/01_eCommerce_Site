//admin user create - check userRoleId: 3,  // Assuming the ID for the admin role is 3 

const { prisma } = require("./common");
const bcrypt = require("bcrypt");

const seed4 = async () => {
  try {
    // Check and create the admin role if it doesn't exist
    const adminRole = await prisma.userRole.findUnique({
      where: { name: "admin" },
    });

    if (!adminRole) {
      await prisma.userRole.create({
        data: {
          name: "admin",
          description: "An administrator account with full access to the platform.",
          isDeleted: false,
        },
      });
    }

    // Hash the password for the admin user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('admin', salt);

    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@admin',
        firstName: 'admin',
        lastName: 'admin',
        password: hashPassword,
        address: 'admin',
        phone: '000-000-0000',
        userRoleId: 3,  // Assuming the ID for the admin role is 3
        confirmAdmin: true,
        taxId: 'administrator',
        isDeleted: false,
        createdAt: new Date(),
      },
    });

    console.log("Admin user created successfully");
    console.log("Admin user ID:", adminUser.id); // You can log the ID to confirm the user is created

    console.log("Admin user seed completed.");

  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed4();