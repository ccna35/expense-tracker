import { FlatList, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ExpenseItem from "@/components/ExpenseItem";
import TotalExpenses from "@/components/TotalExpenses";
import { API_URL } from "@/constants/http";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function TabTwoScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/expenses.json`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const expenses = Object.entries(data)
    .map(([id, value]: [string, any]) => ({
      id,
      ...value,
      date: new Date(value.date),
    }))
    .toReversed();

  const totalExpenses = expenses
    .reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <TotalExpenses
        title="All Time Total Expenses"
        totalExpenses={totalExpenses}
      />
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseItem {...item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#222",
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
