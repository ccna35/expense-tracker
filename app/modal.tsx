import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@/constants/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IExpenseItem } from "@/interfaces";
import Spinner from "@/components/Spinner";

function showToast() {
  ToastAndroid.show("Expense added successfully!", ToastAndroid.SHORT);
}

export default function ModalScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleTitleChange = (text: string) => setTitle(text);
  const handleAmountChange = (text: string) => setAmount(text);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: addNewExpense, isPending } = useMutation({
    mutationFn: async (data: Omit<IExpenseItem, "id">) =>
      axios.post(`${API_URL}/expenses.json`, data),
    onSuccess: () => {
      showToast();
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddExpense = () => {
    const titleFormatted = title.trim();
    const amountFormatted = amount.trim();

    if (!titleFormatted && !amountFormatted) {
      return;
    }
    addNewExpense({
      title: titleFormatted,
      amount: parseFloat(amountFormatted),
      date: new Date(),
    });
    // close the modal
    router.dismiss();
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new expense</Text>
      <View
        style={{
          gap: 20,
        }}
      >
        <TextInput
          placeholder="Title"
          onChangeText={handleTitleChange}
          value={title}
          style={styles.input}
          placeholderTextColor="#999"
          cursorColor="#fff"
        />
        <TextInput
          placeholder="Amount"
          onChangeText={handleAmountChange}
          value={amount}
          style={styles.input}
          placeholderTextColor="#999"
          cursorColor="#fff"
        />
        <Button
          title="Add Expense"
          onPress={handleAddExpense}
          color="rgba(200,0,100,.75)"
        />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
  },
});
