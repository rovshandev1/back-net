/**
 * @swagger
 * /sello/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authenticate and log in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: UserCredentials
 *         description: User credentials (email and password)
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/UserCredentials"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         schema:
 *           $ref: "#/definitions/AuthenticatedUser"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/confirmEmail:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Confirm a user's email address
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: EmailConfirmation
 *         description: Email confirmation object (email and token)
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/EmailConfirmation"
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *
 *   UserCredentials:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 *   AuthenticatedUser:
 *     properties:
 *       token:
 *         type: string
 *
 *   EmailConfirmation:
 *     properties:
 *       email:
 *         type: string
 *       token:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /sello/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     description: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     description: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     description: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /sello/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               price:
 *                 type: number
 *               isFeatured:
 *                 type: boolean
 *               image:
 *                 type: string
 *             required:
 *               - name
 *               - subcategory
 *               - price
 *               - image
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     description: Update a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               price:
 *                 type: number
 *               isFeatured:
 *                 type: boolean
 *               image:
 *                 type: string
 *             required:
 *               - name
 *               - subcategory
 *               - price
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     description: Delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/count:
 *   get:
 *     summary: Get the count of all products
 *     tags: [Products]
 *     description: Get the count of all products
 *     responses:
 *       200:
 *         description: Product count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productCount:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/featured/{count}:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     description: Get featured products
 *     parameters:
 *       - in: path
 *         name: count
 *         required: false
 *         description: Number of featured products to retrieve (default is 0)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Featured products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/gallery-images/{id}:
 *   put:
 *     summary: Upload gallery images for a product
 *     tags: [Products]
 *     description: Upload gallery images for a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to upload gallery images for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Gallery images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Get all products
 *     parameters:
 *       - in: query
 *         name: q
 *         required: false
 *         description: Search query (optional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Pagination options (optional)
 *         schema:
 *           type: object
 *           properties:
 *             limit:
 *               type: integer
 *             offset:
 *               type: integer
 *         style: deepObject
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Sorting options (optional)
 *         schema:
 *           type: object
 *           properties:
 *             by:
 *               type: string
 *             order:
 *               type: string
 *         style: deepObject
 *       - in: query
 *         name: price
 *         required: false
 *         description: Price range filter (optional)
 *         schema:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *             max:
 *               type: number
 *         style: deepObject
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *                 pageInfo:
 *                   type: object
 *                   properties:
 *                     limit:
 *                       type: integer
 *                     offset:
 *                       type: integer
 *                 priceInfo:
 *                   type: object
 *                   properties:
 *                     min:
 *                       type: number
 *                     max:
 *                       type: number
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     description: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       subcategory:
 *         type: string
 *       price:
 *         type: number
 *       isFeatured:
 *         type: boolean
 *       image:
 *         type: string
 *       images:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: User profile management
 */

/**
 * @swagger
 * /sello/profile:
 *   post:
 *     summary: Create a new user profile
 *     tags: [Profiles]
 *     description: Create a new user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               website:
 *                 type: string
 *               profileImage:
 *                 type: string
 *             required:
 *               - bio
 *               - website
 *               - profileImage
 *     responses:
 *       201:
 *         description: User profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Profile'
 *       403:
 *         description: Profile already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profiles]
 *     description: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               website:
 *                 type: string
 *               profileImage:
 *                 type: string
 *             required:
 *               - bio
 *               - website
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Profile'
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profiles]
 *     description: Delete user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/profile/{userId}:
 *   get:
 *     summary: Get user profile by user ID
 *     tags: [Profiles]
 *     description: Get user profile by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user profile to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Profile'
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   Profile:
 *     type: object
 *     properties:
 *       user:
 *         type: string
 *       bio:
 *         type: string
 *       website:
 *         type: string
 *       profileImage:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /sello/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Get a list of all orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Order'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     description: Get a single order by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: integer
 *                     product:
 *                       type: string
 *                 required:
 *                   - quantity
 *                   - product
 *               shippingAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               status:
 *                 type: string
 *               user:
 *                 type: string
 *             required:
 *               - orderItems
 *               - shippingAddress
 *               - city
 *               - status
 *               - user
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       400:
 *         description: Order creation failed
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/{id}:
 *   put:
 *     summary: Update an order's status by ID
 *     tags: [Orders]
 *     description: Update an order's status by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     description: Delete an order by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/totalSale:
 *   get:
 *     summary: Get total sales
 *     tags: [Orders]
 *     description: Get the total sales amount
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total sales amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalsales:
 *                   type: number
 *       400:
 *         description: Sales data not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/count:
 *   get:
 *     summary: Get order count
 *     tags: [Orders]
 *     description: Get the total count of orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderCount:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/order/userOrders/{userId}:
 *   get:
 *     summary: Get orders for a specific user
 *     tags: [Orders]
 *     description: Get a list of orders for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve orders for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Order'
 *       404:
 *         description: User orders not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       orderItems:
 *         type: array
 *         items:
 *           type: string
 *       shippingAddress:
 *         type: string
 *       city:
 *         type: string
 *       status:
 *         type: string
 *       totalPrice:
 *         type: number
 *       user:
 *         type: string
 *       dateOrdered:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing
 */

/**
 * @swagger
 * /sello/payment:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     description: Process a payment using Stripe
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *             required:
 *               - amount
 *               - currency
 *               - paymentMethod
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 paymentIntent:
 *                   type: object
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategory management
 */

/**
 * @swagger
 * /sello/subcategory/:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     description: Create a new subcategory under a category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *             required:
 *               - name
 *               - categoryId
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/subcategory/{id}:
 *   put:
 *     summary: Update a subcategory
 *     tags: [Subcategories]
 *     description: Update an existing subcategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subcategory ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/subcategory/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Subcategories]
 *     description: Delete a subcategory by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subcategory ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/subcategory/:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Subcategories]
 *     description: Get a list of all subcategories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subcategories
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sello/subcategory/{id}:
 *   get:
 *     summary: Get a single subcategory by ID
 *     tags: [Subcategories]
 *     description: Get a subcategory by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subcategory ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory details
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
