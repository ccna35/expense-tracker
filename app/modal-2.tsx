import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants/http";
import { IExpenseItem } from "@/interfaces";
import { Calendar } from "react-native-calendars";
import Spinner from "@/components/Spinner";

function showToast() {
  ToastAndroid.show("Expense updated successfully!", ToastAndroid.SHORT);
}

export default function ExpenseDetailsModalScreen() {
  const { id } = useLocalSearchParams();

  const {
    data: expense,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["expenseInfo", id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/expenses/${id}.json`);
      return response.data;
    },
  });

  if (isLoading || isRefetching) {
    return <Spinner />;
  }

  return <ExpenseDetails expense={expense} id={id as string} />;
}

type ExpenseDetailsProps = {
  expense: IExpenseItem;
  id: string;
};

const ExpenseDetails = ({ expense, id }: ExpenseDetailsProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateExpense, isPending } = useMutation({
    mutationFn: async (data: Omit<IExpenseItem, "id">) =>
      axios.put(`${API_URL}/expenses/${id}.json`, data),
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

  const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`${API_URL}/expenses/${id}.json`),
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

  const [title, setTitle] = useState(expense.title ?? "");
  const [amount, setAmount] = useState(expense.amount.toString() ?? "");
  const [date, setDate] = useState(expense.date ?? new Date());

  const handleTitleChange = (text: string) => setTitle(text);
  const handleAmountChange = (text: string) => setAmount(text);

  const dateFormatted = new Date(expense.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const router = useRouter();

  const updateExpenseHandler = () => {
    const titleFormatted = title.trim();
    const amountFormatted = amount.trim();
    if (!titleFormatted && !amountFormatted) {
      return;
    }

    updateExpense({
      title: titleFormatted,
      amount: parseInt(amountFormatted),
      date: new Date(date),
    });

    // close the modal
    router.dismiss();
  };

  const deleteExpenseHandler = () => {
    deleteExpense(id);
    router.dismiss();
  };

  const confirmDelete = () => {
    Alert.alert("Delete Expense", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteExpenseHandler,
      },
    ]);
  };

  return (
    <View style={styles.container}>
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
        <Calendar
          onDayPress={({ dateString }: any) => {
            setDate(new Date(dateString));
          }}
          current={new Date(date).toISOString().split("T")[0]}
        />
        <Button
          title="Update Expense"
          onPress={updateExpenseHandler}
          color="rgba(0,100,100,.75)"
        />
        <Button
          title="Delete Expense"
          onPress={confirmDelete}
          color="rgba(200,0,100,.75)"
        />
        <Text
          style={{
            color: "gray",
            fontSize: 12,
          }}
        >
          {dateFormatted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 30,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
  },
});
