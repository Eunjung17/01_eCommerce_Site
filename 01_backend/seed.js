const { prisma } = require("./common");
const { faker } = require("@faker-js/faker");

const seed = async () => {
  try {

    const numProduct = 20;
    const products = [];

    for(let i = 0 ; i < numProduct ; i++){

        
        const numRandomNumber = (5 + Math.random() * 1000).toFixed(2);

        const response = await prisma.product.create({
            data: {
                title: faker.vehicle.model(),
                description: faker.vehicle.manufacturer(),
                price: numRandomNumber,
            },
        });
        products.push(response);
    }

    console.log("tables populated");
  } catch (error) {
    console.error(error);
  }
};

seed();
