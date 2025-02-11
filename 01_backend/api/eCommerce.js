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
      console.log("existingCategoryDetail", existingCategoryDetail);

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

router.post("/register", async(req, res, next) => {
  try {
    console.log("ss");
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

      if(response.id){
          const token = createToken(response.id);
          res.status(201).json(token);
      }else{
          res.status(400).json({  message: "Please try again later." });
      }


  } catch (error) {
      next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const match = bcrypt.compare(password, user.password);
    if (match) {
      const token = createToken(user.id);
      return res.json({ token });
    }
  } catch (error) {
    next(error);
  }
});