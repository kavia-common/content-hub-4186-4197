# Blog Backend API

Run:
- Copy .env.example to .env and fill values.
- Install deps: npm install
- Start dev server: npm run dev
- Swagger docs: /docs

Environment:
- Uses MONGODB_URL and MONGODB_DB for database connection.
- Uses JWT_SECRET and JWT_EXPIRES_IN for auth.
- Uses CLOUDINARY_* for image uploads.
- Uses SITE_URL for feeds absolute URLs.
- Uses CORS_ORIGINS (comma separated).

Routes:
- Health: GET /
- Auth: POST /api/auth/login, GET /api/auth/me
- Posts: GET /api/posts, GET /api/posts/slug/:slug, GET /api/posts/admin/:id, POST /api/posts, PUT /api/posts/:id, POST /api/posts/:id/publish, POST /api/posts/:id/unpublish, DELETE /api/posts/:id
- Comments: GET /api/:postId/comments, POST /api/:postId/comments, GET /api/admin/:postId/comments, PUT /api/admin/comments/:id, DELETE /api/admin/comments/:id
- Likes: GET /api/posts/:postId/likes, POST /api/posts/:postId/likes
- Categories: GET /api/categories, POST /api/categories, PUT /api/categories/:id, DELETE /api/categories/:id
- Tags: GET /api/tags, POST /api/tags, PUT /api/tags/:id, DELETE /api/tags/:id
- Uploads: POST /api/uploads/image (multipart/form-data; field: file)
- Feeds: GET /sitemap.xml, GET /rss.xml
