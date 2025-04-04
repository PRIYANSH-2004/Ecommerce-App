# 🛍️ Simple E-Commerce Mobile App

A cross-platform mobile application built with **React Native** targeting both Android and iOS. This app fetches product data from the [FakeStore API](https://fakestoreapi.com/) and allows users to browse, view product details, add items to a cart, and manage a wish list.

---

## 📱 1. Overview

This project is a basic e-commerce app with core features such as:

- Displaying a list/grid of products with images, titles, and prices.
- Viewing product details with a description.
- Adding products to a cart.
- A **Wish List** feature (as an extra feature).
- Local data persistence using AsyncStorage.

---

## 🏗️ 2. Architecture & Key Components

### ⚙️ Core Technologies

- **React Native**: For building a unified mobile experience for both Android and iOS.
- **React Navigation**: Implements stack and tab navigators for smooth screen transitions.
- **FakeStore API**: External API used to fetch product data.
- **AsyncStorage**: Used for local persistence of cart and wish list items.

### 🧩 Screens & Components

- **`ProductListScreen`**:  
  Displays a grid or list of all available products.

- **`ProductDetailScreen`**:  
  Provides detailed product information and includes an "Add to Cart" button.

- **`CartScreen`**:  
  Lists all added products with their total price.

- **`WishListScreen`**:  
  Enables users to mark and review favorite products.

## 🚀 3. How to Run the Project

Follow these steps to get the app running locally:

```bash
# 1. Clone the repository
git clone https://github.com/PRIYANSH-2004/Ecommerce-App.git

# 2. Navigate to the project directory
cd Ecommerce-App

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
