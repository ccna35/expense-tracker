import { StyleSheet, Text, View, Pressable } from "react-native";

import { Link } from "expo-router";
import { IExpenseItem } from "@/interfaces";

const ExpenseItem = ({ title, amount, date, id }: IExpenseItem) => {
  const dateFormatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/modal-2?id=${id}`} asChild>
      <Pressable
        style={{
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          marginVertical: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 12,
            }}
          >
            {dateFormatted}
          </Text>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
          }}
        >
          ${amount}
        </Text>
      </Pressable>
    </Link>
  );
};

export default ExpenseItem;
