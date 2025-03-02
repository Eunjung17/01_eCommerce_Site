const { prisma, express } = require("../common");
const router = express.Router();
const bcrypt = require("bcrypt");
module.exports = router;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", (req, res) => {
    res.status(200).json({ message: "This works." });
});


const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "8h" });
};

const isLoggedIn = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader?.slice(7);
    if (!token) return next();
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id,
        },
      });
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token. Please login again.' });
    }
};

router.post("/userRoleRegister", async(req, res, next) => {
  try {
      const { name, description } = req.body;

      const existingUserRole = await prisma.userRole.findUnique({
          where: { name },
      });

      if(existingUserRole) return res.status(400).json({ message: "name already taken" });
      
      const response = await prisma.userRole.create({
          data: {
            name,
            description,
            isDeleted : false,
          },
      });

      if(response.id) res.status(201).json(response); 
      else res.status(400).json({  message: "Please try again later." });

  } catch (error) {
      next(error);
  }
});

router.get("/paymentMethod/all", async(req, res, next) => {
  try {

      const response = await prisma.paymentMethod.findMany();
      res.status(200).json(response);

  } catch (error) {
      next(error);
  }
});

router.get("/category/all", async(req, res, next) => {
  try {

      const response = await prisma.category.findMany({
        where: {isDeleted : false,},
        include: {categoryDetail: true, isDeleted : false,},
        orderBy: {id: 'asc'},
      });
      res.status(200).json(response);

  } catch (error) {
      next(error);
  }
});

router.post("/categoryRegister", async(req, res, next) => {
  try {
      const { name, description } = req.body;

      const existingCategory = await prisma.category.findUnique({
          where: { name },
      });

      if(existingCategory) return res.status(400).json({ message: "name already taken" });
      
      const response = await prisma.category.create({
          data: {
            name,
            description,
            isDeleted : false,
          },
      });

      if(response.id) res.status(201).json(response); 
      else res.status(400).json({  message: "Please try again later." });

  } catch (error) {
      next(error);
  }
});

router.post("/categoryDetailRegister", async(req, res, next) => {
  try {
      const { categoryId, name, description } = req.body;

      const existingCategoryDetail = await prisma.categoryDetail.findUnique({
          where: { name },
      });

      if(existingCategoryDetail) return res.status(400).json({ message: "name already taken" });
      
      const response = await prisma.categoryDetail.create({
          data: {
            categoryId: +categoryId,
            name,
            description,
            isDeleted : false,
          },
      });

      if(response.id) res.status(201).json(response); 
      else res.status(400).json({  message: "Please try again later." });

  } catch (error) {
      next(error);
  }
});

router.post("/user/register/admin", async(req, res, next) => {
  try {

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash('admin', salt);
      
      const response = await prisma.user.create({
          data: {
              email: 'admin@admin',
              firstName: 'admin',
              lastName: 'admin',
              password: hashPassword,
              address: 'admin',
              phone: '000-000-0000',
              userRoleId: 3,
              confirmAdmin: true,
              taxId: 'administrator',
              isDeleted: false,
              createdAt: new Date()
          },
      });

      if(response.id){
          const token = createToken(response.id);
          res.status(201).json({response, token});
      }else{
          res.status(400).json({  message: "Please try again later." });
      }


  } catch (error) {
      next(error);
  }
});

router.post("/user/register", async(req, res, next) => {
  try {

      const { email, firstName, lastName, password, address, phone, userRoleId, taxId} = req.body;

      const existingUser = await prisma.user.findUnique({
          where: { email },
      }); 

      if(existingUser) return res.status(400).json({ message: "Username already taken" });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      
      const response = await prisma.user.create({
          data: {
              email,
              firstName,
              lastName,
              password: hashPassword,
              address,
              phone,
              userRoleId: +userRoleId,
              confirmAdmin: false,
              taxId,
              isDeleted: false,
              createdAt: new Date()
          },
      });
      const response2 = await prisma.cart.create({
        data: {
            userId: response.id,
            isDeleted: false,
        },
      });

      if(response.id){
          const token = createToken(response.id);
          res.status(201).json({response, token});
      }else{
          res.status(400).json({  message: "Please try again later." });
      }


  } catch (error) {
      next(error);
  }
});

router.post('/user/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInformation = await prisma.user.findUnique({
      where: {
        email,
        isDeleted: false,
      },
    });
    if (!userInformation) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const match = bcrypt.compare(password, userInformation.password);
    if (match) {
      const token = createToken(userInformation.id);
      return res.json({ userInformation , token });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/user/UserInfo", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.user.findUnique({
          where: {
            id: req.user.id,
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});

router.put("/business/delete/product", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const { productId} = req.body;
      
      const response = await prisma.product.update({
          where: {
            id: productId,
            userId: req.user.id,
            isDeleted: false,
          },
          data: {
            isDeleted: true,
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});

router.put("/business/recovery/product", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const { id} = req.body;
      
      const response = await prisma.product.update({
          where: {
            id,
            userId: req.user.id,
            isDeleted: true,
          },
          data: {
            isDeleted: false,
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});


router.get("/user/getCart", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
    

      const cart = await prisma.cart.findUnique({
        where: { userId: req.user.id },
      });
      
      const response = await prisma.cartDetail.findMany({
        where: {
          isDeleted: false,
          cartId: cart.id,
        },
        include: {
          cart: true,
          product: {
            include: {
              categoryDetail: {
                include: {
                  category: true,
                }
              }
            }
          },
        },
      });

      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});

// router.get("/user/orderHistory", isLoggedIn, async (req, res, next) => {
// console.log("history!");
//   try {

//     if(!req.user){
//       return res.status(401).json({ message: "Not Authorized" });

//     }else{
    

//       const response = await prisma.orderDetail.findMany({
//         where: {
//           order: {
//             userId: req.user.id, 
//             isDeleted: false,
//           },
//           isDeleted: false,
//         },
//         include: {
//           order: {
//             include: {
//               paymentMethod: true,
//             },

//           }, 
//           product: true,
//         },
//       });
// console.log("orderHistory response:", response);
//       res.status(200).json(response);

//     }
//   } catch (error) {
//       next(error);
//   }
// });

router.get("/user/orderHistory", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const response = await prisma.order.findMany({
        where: {
          userId: req.user.id,
          isDeleted: false,
        },
        include: {
          orderDetails: {
            include: {
              product: {
                include: {
                  categoryDetail: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
          paymentMethod: true,
        },
      });
      console.log("response: history:", response);
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});



router.delete('/user/delete/Cart', isLoggedIn, async (req, res, next) => {
  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const cart = await prisma.cart.findUnique({
        where: {
          userId: req.user.id,
        },
        include: {
          cartDetails: true,
        },
      });

      if(!cart) return res.status(401).json({ message: "Not Authorized" });

      const cartDetails = await prisma.cartDetail.findMany({
        where: {
          cartId: cart.id,
          isDeleted: false,
        },
      });

      await prisma.cartDetail.deleteMany({
        where: {
          cartId: cart.id,
          isDeleted: false,
          productId: {
            in: cartDetails.map(detail => detail.productId),
          },
        },
      });

    res.status(200).json({message: "delete successful"}); 
    }

  } catch (error) {
    next(error);
  }
});




router.post('/user/addCart', isLoggedIn, async (req, res, next) => {
  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
    
      const { productId, quantity } = req.body;

      const cart = await prisma.cart.findFirst({
          where: {
            userId: req.user.id,
            isDeleted: false,
          }
      });

      if(!cart){
        return res.status(404).json({message: "Cart not found"});
      }

      const product = await prisma.product.findFirst({
        where: {
          id: productId,
          isDeleted: false,
        },
        select: {
          price: true,
        },
      });

      const response = await prisma.cartDetail.upsert({

        where: {
          productId_cartId_isDeleted: {
            productId: productId,
            cartId: cart.id,
            isDeleted: false,
          },
        },
        update: {
          quantity: {
            increment: +quantity,
          },
        },
        create: {
            quantity: +quantity,
            price: +product.price,
            isDeleted: false,
            cart: {
              connect: {
                id: cart.id,
              },
            },
            product: {
              connect: {
                id: productId,
              },
            },
        },
    });

    res.status(200).json(response);
    }

  } catch (error) {
    next(error);
  }
});



// change quantity number in product table
//create order detail, order, delete cartDetail, move to order confirm page
router.post('/user/registerOrderFromCart', isLoggedIn, async (req, res, next) => {

    try {

      if(!req.user){
        return res.status(401).json({ message: "Not Authorized" });
  
      }else{
      
        const { orderData } = req.body;


        const cartDetails = await prisma.cartDetail.findMany({
          where: {
            cart: {
              userId: req.user.id,
              isDeleted: false,
            },
            isDeleted: false,
          },
        });

        if(cartDetails.length === 0) return res.status(400).json({ message: "no Cart Info" });

        let quantityCheckFlag = true;

        //before create Order, check if product quantity is enough to order
        for (const cartDetail of cartDetails) {
          const product = await prisma.product.findUnique({
            where: {
              id: cartDetail.productId,
            },
            select: {
              quantity: true,
            },
          });

          if( cartDetail.quantity > product.quantity) quantityCheckFlag = false;

        }

        if(quantityCheckFlag === false){
          return res.status(400).json({ message: "The product quantity is not sufficient to order." });
        }
        
        const orderResponse = await prisma.order.create({
            data: {
              createdAt : new Date(),
              name: orderData.newName,
              address: orderData.newAddress,
              phone: orderData.newPhone,
              paymentMethod: {
                connect: {
                  id: +orderData.paymentMethod,
                },
              },
              isDeleted : false,
              user: {
                connect: {
                  id: req.user.id, 
                },
              },
            },
        });

  
        // 1. If successfully Order created, 
        //    - update Product quantity to minus
        //    - Order Details should be created.
        // 2. Delete cartDetails
        if(orderResponse.id){

          for (const cartDetail of cartDetails) {

            await prisma.product.update({
              where: {
                id: cartDetail.productId,
              },
              data: {
                quantity: {
                  decrement: cartDetail.quantity,
                },
              },
            });

            await prisma.orderDetail.create({
                  data: {
                    orderId: orderResponse.id,
                    productId: cartDetail.productId,
                    quantity: cartDetail.quantity,
                    price: cartDetail.price,
                    isDeleted : false,
                  },
              });
          };

          const cart = await prisma.cart.findUnique({
            where: {
              userId: req.user.id,
            },
            select: {
              id: true,
            },
          });


          if(cart){
            await prisma.cartDetail.deleteMany({
              where: {
                cartId: cart.id,
                isDeleted: false,
              },
            });
          }

        }else res.status(400).json({  message: "Please try again later." });
  
        res.status(200).json(orderResponse);
      }
  
    } catch (error) {
      next(error);
    }
});


router.post('/user/register/singleOrder', isLoggedIn, async (req, res, next) => {
  try {
    console.log("startd");
    const { orderData } = req.body;
console.log(orderData);
    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const product = await prisma.product.findUnique({
        where: {
          id: orderData.productId,
        },
        select: {
          quantity: true,
        },
      });
console.log("product:" , product.quantity);
console.log(" orderData.orderQuantity:" ,  orderData.orderQuantity);
      if(parseInt(product.quantity) < parseInt(orderData.orderQuantity)) return res.status(401).json({ message: "product is not enougth." });

      const orderResponse = await prisma.order.create({
          data: {
            createdAt : new Date(),
            name: orderData.newName,
            address: orderData.newAddress,
            phone: orderData.newPhone,
            paymentMethod: {
              connect: {
                id: +orderData.paymentMethod,
              },
            },
            isDeleted : false,
            user: {
              connect: {
                id: req.user.id, 
              },
            },
          },
      });
  console.log("orderResponse:" , orderResponse);
      if(!orderResponse.id) return res.status(401).json({ message: "Not Authorized" }); 

      const responseUpdate = await prisma.product.update({
        where: {
          id: orderData.productId,
        },
        data: {
          quantity: {
            decrement: +orderData.orderQuantity,
          },
        },
      });
      console.log("responseUpdate:" , responseUpdate);

      const responseCreate = await prisma.orderDetail.create({
          data: {
            quantity: +orderData.orderQuantity,
            price: Math.round(orderData.orderQuantity * responseUpdate.price * 100) / 100,
            isDeleted : false,
            order: {
              connect: {
                id: orderResponse.id,
              },
            },
            product: {
              connect: {
                id: orderData.productId,
              },
            },
          },
      });

      console.log("responseCreate:" , responseCreate);
      

      res.status(200).json(responseCreate);

    }
  } catch (error) {
      next(error);
  }
});



router.post("/user/orderDetail", isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const { orderId } = req.body;
    console.log(orderId);

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const response = await prisma.order.findUnique({
        where: {
          id: orderId,
          userId: req.user.id,
          isDeleted: false,
        },
        include: {
          orderDetails: {
            include: {
              product: {
                include: {
                  categoryDetail: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
          paymentMethod: true,
        },
      });

      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});



router.post("/product/register", async(req, res, next) => {
  try {

      const { userId, name, categoryDetailId, description, price, images, quantity} = req.body;

      const existingProduct = await prisma.product.findUnique({
          where: { name },
      }); 

      if(existingProduct) return res.status(400).json({ message: "Product name already taken" });
      
      const response = await prisma.product.create({
          data:{
              userId,
              name,
              categoryDetailId,
              description,
              price,
              images,
              quantity,
              isDeleted :false
          },
      });

      if(response.id){
          res.status(201).json(response);
      }else{
          res.status(400).json({  message: "Please try again later." });
      }


  } catch (error) {
      next(error);
  }
});

router.post("/category/product", async(req, res, next) => {
  try {

      const { categoryDetailId } = req.body;
      console.log("start categoryDetailId", categoryDetailId);     
      const response = await prisma.categoryDetail.findMany({
          where: {
            id: categoryDetailId,
          },
          include: {
            product: true,
            category: true,
          },
      });
      console.log("start response", response); 
      if (response && response.length > 0) {
          res.status(201).json(response);
      }else{
          res.status(400).json({  message: "Please try again later." });
      }


  } catch (error) {
      next(error);
  }
});



router.post("/keyword/product", async(req, res, next) => {
  try {

      const { searchKeyword } = req.body; 

      const response = await prisma.product.findMany({
        where: {
          name: {
            contains: searchKeyword,
            mode: 'insensitive',
          },
          isDeleted: false,
        },
        include:{
          categoryDetail: {
            include: {
              category: true,
            }
          },
        }
      });
    
      if (response && response.length > 0) {
        console.log("2:", response);
          res.status(201).json(response);
      }else{
          res.status(400).json({  message: "There is no matching product." });
      }


  } catch (error) {
      next(error);
  }
});


router.get("/product/selectItems", isLoggedIn, async(req, res, next) => {
  try {
    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.product.findMany();
      res.status(200).json(response);
    }
  } catch (error) {
      next(error);
  }
});

router.post("/user/singleProduct", isLoggedIn, async(req, res, next) => {
  try {
    console.log("req.body:" , req.body);
    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{

      const { productId } = req.body;
      
      const response = await prisma.product.findUnique(
        {
          where: {
            id: productId,
            isDeleted: false,
          },
          include: {
            categoryDetail: {
              include: {
                category: true,
              },
            },
          },
        },
      );
      res.status(200).json(response);
    }
  } catch (error) {
      next(error);
  }
});

router.get("/admin/userRole", isLoggedIn, async (req, res, next) => {
  try {
    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.userRole.findMany({
          where: {
              id : {notIn: [3],},
          },
          orderBy: {id: 'asc'},
      });
      res.status(200).json(response);
    }
  } catch (error) {
      next(error);
  }
});

router.get("/admin/allUsers", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.user.findMany({
          where: {
              userRoleId : {notIn: [3],},
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});

router.put('/admin/userConfirm', isLoggedIn, async (req, res, next) => {
  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
    
      const { userId } = req.body;

      const response = await prisma.user.update({
          where: {
              id: userId,
          },
          data: {
              confirmAdmin: true,
          }
      });
      res.status(200).json(response);
    }

  } catch (error) {
    next(error);
  }
});

router.get("/business/allProducts", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.product.findMany({
          where: {
              userId : req.user.id,
              isDeleted: false,
          },
          include: {
            categoryDetail: {
              include: {
                category: true,
                isDeleted: false,
              },
            },
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});

router.get("/business/allDeletedProducts", isLoggedIn, async (req, res, next) => {

  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const response = await prisma.product.findMany({
          where: {
              userId : req.user.id,
              isDeleted: true,
          },
          include: {
            categoryDetail: {
              include: {
                category: true,
                isDeleted: false,
              },
            },
          },
      });
      res.status(200).json(response);

    }
  } catch (error) {
      next(error);
  }
});


router.get("/top4Products", async (req, res, next) => {

  try {

      const response = await prisma.product.findMany({
          // where: {
          //     userId : req.user.id,
          // },
          orderBy: {id: 'asc'},
          take: 4, // Limit the result to 4 products
      });
      res.status(200).json(response);

  } catch (error) {
      next(error);
  }
});

router.post("/business/createProduct", isLoggedIn, async(req, res, next) => {
  try {

    if(!req.user){
      return res.status(401).json({ message: "Not Authorized" });

    }else{
      
      const { userId, name, categoryDetailId, description, price, images, quantity } = req.body;

      const existingUserRole = await prisma.product.findMany({
          where: { name },
      });

      if(existingUserRole.length > 0) return res.status(400).json({ message: "name already taken" });
      
      const response = await prisma.product.create({
          data: {
            userId,
            name,
            categoryDetailId,
            description,
            price: +price,
            images,
            quantity: +quantity,
            isDeleted : false,
          },
      });

      if(response.id) res.status(201).json(response); 
      else res.status(400).json({  message: "Please try again later." });

    }

  } catch (error) {
      next(error);
  }
});

// router.get("/business/allProducts", isLoggedIn, async (req, res, next) => {

//   try {

//     if(!req.user){
//       return res.status(401).json({ message: "Not Authorized" });

//     }else{
      
//       const response = await prisma.product.findMany({
//         where: { id: req.user.id },
//       });
//       res.status(200).json(response);

//     }
//   } catch (error) {
//       next(error);
//   }
// });

