const { prisma } = require("./common");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const seed = async () => {
  try {
    // Step 1: Define user roles and insert them
    const roles = [
      {
        id: 1,
        name: "individual",
        description: "A regular user account for individuals.",
      },
      {
        id: 2,
        name: "business",
        description: "An account for businesses to manage their products and services.",
      },
      {
        id: 3,
        name: "admin",
        description: "An administrator account with full access to the platform.",
      },
    ];

    for (const role of roles) {
      const existingRole = await prisma.userRole.findUnique({
        where: { name: role.name },
      });

      if (!existingRole) {
        await prisma.userRole.create({
          data: {
            id: role.id,
            name: role.name,
            description: role.description,
            isDeleted: false,
          },
        });
      }
    }

    // Step 2: Create users
    const users = [
      // Individual users (userRoleId: 1)
      {
        email: "1@1",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "1",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 1,
        taxId: faker.phone.number(),
      },
      {
        email: "2@2",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "2",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 1,
        taxId: faker.phone.number(),
      },
      {
        email: "3@3",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "3",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 1,
        taxId: faker.phone.number(),
      },

      // Business users (userRoleId: 2)
      {
        email: "b1@b1",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "1",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 2,
        taxId: faker.phone.number(),
      },
      {
        email: "b2@b2",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "2",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 2,
        taxId: faker.phone.number(),
      },
      {
        email: "b3@b3",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: "3",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 2,
        taxId: faker.phone.number(),
      },

      // Admin user (userRoleId: 3)
      {
        email: "admin@admin",
        firstName: "Admin",
        lastName: "User",
        password: "admin",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        userRoleId: 3,
        taxId: faker.phone.number(),
      },
    ];

    for (const user of users) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: hashedPassword,
            address: user.address,
            phone: user.phone,
            userRoleId: user.userRoleId,
            confirmAdmin: true,//user.userRoleId === 3 ? true : false,
            taxId: user.taxId,
            isDeleted: false,
            createdAt: new Date(),
          },
        });

        // Create a cart for each user
        await prisma.cart.create({
          data: {
            userId: newUser.id,
            isDeleted: false,
          },
        });

        console.log(`User with email ${user.email} created successfully`);
      }
    }

    // Step 3: Create categories, category details, and products
    const usersForProducts = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });

    if (usersForProducts.length === 0) {
      console.log("No users found in the database for product creation.");
      return;
    }

    const categories = [
      "Clothing",
      "Beauty/Cosmetics",
      "Electronics",
      "Food & Beverages",
      "Home & Living",
    ];

    const categoryDetails = {
      "Clothing": [
        "Women's Clothing",
        "Men's Clothing",
        "Kids' Clothing",
        "Sportswear",
        "Accessories",
      ],
      "Beauty/Cosmetics": [
        "Skincare",
        "Makeup",
        "Haircare",
        "Bodycare",
        "Perfume",
      ],
      "Electronics": [
        "Smartphones",
        "Laptops/PCs",
        "TVs/Video Devices",
        "Home Appliances",
        "Audio/Speakers",
      ],
      "Food & Beverages": [
        "Health Supplements",
        "Snacks",
        "Drinks",
        "Fresh Produce",
        "Seasonings/Spices",
      ],
      "Home & Living": [
        "Kitchenware",
        "Cleaning Supplies",
        "Bathroom Essentials",
        "Bedding",
        "Furniture",
      ],
    };

    for (const categoryName of categories) {
      const category = await prisma.category.upsert({
        where: { name: categoryName },
        update: {}, 
        create: {
          name: categoryName,
          description: faker.commerce.productDescription(),
          isDeleted: false,
        },
    });

      for (const categoryDetailName of categoryDetails[categoryName]) {
        const categoryDetail = await prisma.categoryDetail.create({
          data: {
            name: categoryDetailName,
            categoryId: category.id,
            description: faker.commerce.productDescription(),
            isDeleted: false,
          },
        });

        // Add products for each category detail
        for (let i = 0; i < 10; i++) {
          const price = Math.floor(Math.random() * (500 - 10 + 1)) + 10;

          // Assign a random user as the creator of the product
          const randomUser = usersForProducts[Math.floor(Math.random() * usersForProducts.length)];

          await prisma.product.create({
            data: {
              name: faker.commerce.productName(),
              categoryDetailId: categoryDetail.id,
              description: faker.commerce.productDescription(),
              price,
              images: faker.image.avatarGitHub(),
              quantity: 1000,
              isDeleted: false,
              userId: randomUser.id,
            },
          });
        }
      }
    }

    console.log("Categories, category details, and products seeded successfully!");

    // Step 4: Add payment methods
    const paymentMethods = [
      { id: 1, name: "Debit Card" },
      { id: 2, name: "Gift Card" },
      { id: 3, name: "Credit Card" },
    ];

    for (const method of paymentMethods) {
      const existingMethod = await prisma.paymentMethod.findUnique({
        where: { name: method.name },
      });

      if (!existingMethod) {
        await prisma.paymentMethod.create({
          data: {
            id: method.id,
            name: method.name,
            description: method.name,
            isDeleted: false,
          },
        });
      }
    }

    console.log("Payment methods seeded successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed();
