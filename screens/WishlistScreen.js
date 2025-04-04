import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CartContext } from "../utils/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WISHLIST_STORAGE_KEY = "wishlist_items";
const WishlistScreen = ({ route, navigation }) => {
  const { wishlist: initialWishlist } = route.params; // Get the wishlist from route params
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const [wishlist, setWishlist] = useState(initialWishlist);
  const handleAddToCart = (item) => {
    addToCart(item); // Add the item to the cart
    alert(`${item.title} added to cart!`);
  };
  const removeFromWishlist = async (item) => {
    const updatedWishlist = wishlist.filter(
      (wishItem) => wishItem.id !== item.id
    );
    setWishlist(updatedWishlist); // Update the local state
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(updatedWishlist)
    ); // Persist the updated wishlist
    Alert.alert("Removed from Wishlist", `${item.title} has been removed.`);
  };

  if (wishlist.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromWishlist(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#e91e63",
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#e91e63",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default WishlistScreen;
