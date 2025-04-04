import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../utils/CartContext";
import ProductItem from "../components/ProductItem";

const CartScreen = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ${item.quantity * item.price.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.reduceButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.reduceButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reduceButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.reduceButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  productList: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
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
  },
  reduceButton: {
    height: "45%",
    width: "45%",
    marginTop: 8,
    margin: 8,
    backgroundColor: "#e91e63",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
  reduceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
