import { StyleSheet, Text, View } from "react-native";

type TotalExpensesProps = {
  title: string;
  totalExpenses: string;
};

const TotalExpenses = ({ title, totalExpenses }: TotalExpensesProps) => {
  return (
    <View
      style={{
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.total}>${totalExpenses}</Text>
    </View>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: "rgba(255,255,255,.5)",
    textAlign: "center",
  },
  total: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
