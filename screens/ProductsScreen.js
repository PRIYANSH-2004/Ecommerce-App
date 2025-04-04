"use client";

import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../services/api";
import AsyncStorageHelper from "../utils/AsyncStorageHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCTS_STORAGE_KEY = "fakestore_products";
const WISHLIST_STORAGE_KEY = "wishlist_items";

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const loadProducts = async () => {
    try {
      // Try to get products from AsyncStorage first
      const cachedProducts = await AsyncStorageHelper.getItems(
        PRODUCTS_STORAGE_KEY
      );

      if (cachedProducts.length > 0) {
        setProducts(cachedProducts);
        setLoading(false);
      }

      // Fetch fresh products from API
      const freshProducts = await fetchProducts();

      if (freshProducts.length > 0) {
        setProducts(freshProducts);
        // Cache the products
        await AsyncStorage.setItem(
          PRODUCTS_STORAGE_KEY,
          JSON.stringify(freshProducts)
        );
      }
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  };

  const toggleWishlist = async (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(updatedWishlist)
    );
  };
  useEffect(() => {
    loadProducts();
    loadWishlist();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate("Cart")}
        />
        <Button
          title="Go to Wishlist"
          onPress={() => navigation.navigate("Wishlist", { wishlist })}
        />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductItem
              product={item}
              onPress={() => handleProductPress(item)}
            />
            <TouchableOpacity
              style={[
                styles.wishlistButton,
                wishlist.some((wishItem) => wishItem.id === item.id) &&
                  styles.wishlistedButton, // Apply a different style if the item is wishlisted
              ]}
              onPress={() => toggleWishlist(item)}
            >
              <Text style={styles.wishlistButtonText}>
                {wishlist.some((wishItem) => wishItem.id === item.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  productList: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  wishlistButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  wishlistedButton: {
    backgroundColor: "#e91e63",
  },
  wishlistButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductsScreen;
