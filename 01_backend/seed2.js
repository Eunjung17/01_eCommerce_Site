const { prisma } = require("./common");
const { faker } = require("@faker-js/faker");

//before this, user (individual, business, admin) create
//make Category, CategoryDetail, Product
const seed2 = async () => {
  try {
    // Fetch existing users
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,  // Ensure users are not deleted
      },
    });

    // Check if we have any users to assign as product creators
    if (users.length === 0) {
      console.log("No users found in the database.");
      return;
    }

    const categories = [
      "Clothing",
      "Beauty/Cosmetics",
      "Electronics",
      "Food & Beverages",
      "Home & Living"
    ];

    const categoryDetails = {
      "Clothing": [
        "Women's Clothing",
        "Men's Clothing",
        "Kids' Clothing",
        "Sportswear",
        "Accessories"
      ],
      "Beauty/Cosmetics": [
        "Skincare",
        "Makeup",
        "Haircare",
        "Bodycare",
        "Perfume"
      ],
      "Electronics": [
        "Smartphones",
        "Laptops/PCs",
        "TVs/Video Devices",
        "Home Appliances",
        "Audio/Speakers"
      ],
      "Food & Beverages": [
        "Health Supplements",
        "Snacks",
        "Drinks",
        "Fresh Produce",
        "Seasonings/Spices"
      ],
      "Home & Living": [
        "Kitchenware",
        "Cleaning Supplies",
        "Bathroom Essentials",
        "Bedding",
        "Furniture"
      ]
    };

    for (const categoryName of categories) {
      const category = await prisma.category.create({
        data: {
          name: categoryName,
          description: faker.commerce.productDescription(),
          isDeleted: false
        }
      });

      for (const categoryDetailName of categoryDetails[categoryName]) {
        const categoryDetail = await prisma.categoryDetail.create({
          data: {
            name: categoryDetailName,
            categoryId: category.id,
            description: faker.commerce.productDescription(),
            isDeleted: false
          }
        });

        // Add products for each category detail
        for (let i = 0; i < 2; i++) {
          const price = Math.floor(Math.random() * (500 - 10 + 1)) + 10;

          // Assign a random user as the creator of the product
          const randomUser = users[Math.floor(Math.random() * users.length)];

          await prisma.product.create({
            data: {
              name: faker.commerce.productName(),
              categoryDetailId: categoryDetail.id,
              description: faker.commerce.productDescription(),
              price,
              images: faker.image.avatarGitHub(),
              quantity: Math.floor(Math.random() * 100) + 1,
              isDeleted: false,
              userId: randomUser.id // Assign the userId from the random user
            }
          });
        }
      }
    }

    console.log("Tables populated with categories, category details, and products.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed2();