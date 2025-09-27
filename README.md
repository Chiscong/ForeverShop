# E-Commerce Full Stack Project

A complete e-commerce solution built with React.js, Node.js, Express.js, and MongoDB. This project includes a customer-facing frontend, an admin panel for management, and a robust backend API.

## 🚀 Features

### Customer Frontend
- **Product Catalog**: Browse products with search and filter functionality
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Register, login, and profile management
- **Order Management**: Place orders, view order history
- **Payment Integration**: Stripe payment gateway with COD option
- **Responsive Design**: Mobile-friendly interface

### Admin Panel
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View and update order status
- **User Management**: View customer information
- **Dashboard**: Overview of sales and orders
- **Secure Authentication**: Admin-only access

### Backend API
- **RESTful API**: Well-structured endpoints
- **Authentication**: JWT-based auth system
- **File Upload**: Cloudinary integration for images
- **Payment Processing**: Stripe integration
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary** - Image storage
- **Stripe** - Payment processing

### Admin Panel
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
├── frontend/          # Customer-facing React app
│   ├── src/
│   │   ├── assets/    # Images and static files
│   │   ├── components/# Reusable components
│   │   ├── context/   # React context
│   │   └── pages/     # Page components
│   └── package.json
│
├── backend/           # Node.js API server
│   ├── config/        # Database and service configs
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── uploads/       # Local file storage
│   └── server.js      # Entry point
│
├── admin/             # Admin panel React app
│   ├── src/
│   │   ├── components/# Admin components
│   │   ├── pages/     # Admin pages
│   │   └── assets/    # Admin assets
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd your-project-name
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

Create `.env` files in the backend directory:

**backend/.env**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**frontend/.env**
```env
VITE_BACKEND_URL=http://localhost:4000
```

**admin/.env**
```env
VITE_BACKEND_URL=http://localhost:4000
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run server
   ```
   Server will run on `http://localhost:4000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Start the Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   Admin panel will run on `http://localhost:5174`

## 📚 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `POST /api/product/remove` - Remove product (Admin)
- `GET /api/product/single` - Get single product

### Cart
- `POST /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart

### Orders
- `POST /api/order/list` - Get all orders (Admin)
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/place` - Place COD order
- `POST /api/order/stripe` - Create Stripe session
- `POST /api/order/verifyStripe` - Verify Stripe payment
- `POST /api/order/status` - Update order status (Admin)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Users receive a token upon successful login
- Token is stored in localStorage
- Protected routes require valid token
- Admin routes require admin privileges

## 💳 Payment Integration

### Stripe Payment
- Secure payment processing
- Automatic cart clearing on successful payment
- Cart restoration on payment cancellation
- Webhook support for payment verification

### Cash on Delivery (COD)
- Alternative payment method
- Order confirmation without payment
- Manual payment collection

## 🖼️ Image Upload

Images are handled through Cloudinary:
- Automatic image optimization
- Multiple format support
- Secure cloud storage
- Fast CDN delivery

## 🔧 Features in Detail

### Cart Management
- Persistent cart across sessions
- Real-time quantity updates
- Size selection for products
- Cart total calculation

### Order Processing
- Order status tracking
- Email notifications (can be implemented)
- Order history
- Admin order management

### Product Management
- Category-based organization
- Image gallery support
- Stock management
- Price management

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy using Git

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy dist folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Cart items may not persist if localStorage is cleared
- Image upload requires stable internet connection
- Stripe webhook configuration needed for production

## 🔮 Future Enhancements

- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Discount/coupon system
- [ ] Social media integration

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- React.js community
- Node.js community
- MongoDB documentation
- Stripe API documentation
- Tailwind CSS team

---

**Made with ❤️ by [CHÍ CÔNG]**