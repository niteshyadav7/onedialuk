<!-- basically : create the schema of catergory section and which is linked to the blog -->
<!-- of that particular . now when you clicked to that then it will open that category > -->
<!-- > all blog >particular blog -->

<!-- And the Blog contains  -->

<!-- - Means there is the category
- Inside the category all its blog
- when click categories particular blog then open that blog  -->

                     +-------------------+
                     |   Client (UI/UX)  |
                     +-------------------+
                              |
                              v
                [HTTP Requests via REST API]
                              |
                              v

+-------------------+ +---------------------+ +------------------------+
| Category Routes |<--> | Express Controllers |<--> | Blog Routes |
| /api/categories | | categoryController | | /api/blogs |
+-------------------+ | blogController | +------------------------+
|
v
+------------------------+
| MongoDB Database |
|------------------------|
| Categories Collection |
| Blogs Collection |
+------------------------+

📁 blog-backend
│
├── 📁 controllers
│ ├── categoryController.js --> Category CRUD logic
│ └── blogController.js --> Blog CRUD logic
│
├── 📁 models
│ ├── Category.js --> Mongoose schema for category
│ └── Blog.js --> Mongoose schema for blog
│
├── 📁 routes
│ ├── categoryRoutes.js --> Category API routes
│ └── blogRoutes.js --> Blog API routes
│
├── 📁 config
│ └── db.js --> MongoDB connection setup
│
├── 📁 middlewares
│ └── errorMiddleware.js --> Centralized error handler
│
├── app.js --> Express app setup
├── server.js --> App entrypoint
└── package.json --> Dependencies

+-------------------+ 1 N +------------------------+
| Category |---------------->| Blog |
+-------------------+ +------------------------+
| \_id (ObjectId) | | \_id (ObjectId) |
| name | | title |
| slug | | slug |
| createdAt | | content (HTML) |
| updatedAt | | image (URL/path) |
+-------------------+ | categoryId (FK) |
| createdAt, updatedAt |
+------------------------+

<!-- post,pages,blogs,setting,ads management  -->
