// create payment method
const { prisma } = require("./common");
const bcrypt = require("bcrypt");

const seed3 = async () => {
  try {
    
    const paymentMethods = [
        { id: 1, name: "Debit Card" },
        { id: 2, name: "Gift Card" },
        { id: 3, name: "Credit Card" }
      ];
      
      // Add payment methods
      for (const method of paymentMethods) {
        const existingMethod = await prisma.paymentMethod.findUnique({
          where: { name: method.name },
        });
      
        if (!existingMethod) {
          await prisma.paymentMethod.create({
            data: {
              id: method.id,  // Forcefully set the ID
              name: method.name,
              description: method.name,
              isDeleted: false
            }
          });
        }
      }

  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed3();
