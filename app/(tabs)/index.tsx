import { Button, FlatList, StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import ExpenseItem from "@/components/ExpenseItem";
import TotalExpenses from "@/components/TotalExpenses";
import { API_URL } from "@/constants/http";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setIsLoggedIn } from "@/features/user/userSlice";

export default function RecentExpensesScreen() {
  const dispatch = useAppDispatch();

  const { name } = useAppSelector((state) => state.user);

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

  if (!data) {
    return (
      <View style={styles.noDataContainer}>
        <Text
          style={{
            color: "#999",
            fontSize: 28,
          }}
        >
          No expenses found
        </Text>
      </View>
    );
  }

  let recentExpenses = Object.entries(data).map(
    ([id, value]: [string, any]) => ({
      id,
      ...value,
      date: new Date(value.date),
    })
  );

  recentExpenses = recentExpenses
    .filter(
      (expense) =>
        new Date().getTime() - expense.date.getTime() < 7 * 24 * 60 * 60 * 1000
    )
    .toReversed();

  const totalExpenses = recentExpenses
    .reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
          }}
        >
          Hi, <Text style={{ fontWeight: 600 }}>{name}</Text>
        </Text>
        <Button
          title="Log out"
          onPress={() => dispatch(setIsLoggedIn(false))}
        />
      </View>
      <TotalExpenses title="Last 7 days spend" totalExpenses={totalExpenses} />
      <FlatList
        data={recentExpenses}
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
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
