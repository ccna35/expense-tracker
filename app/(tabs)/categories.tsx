import { FlatList, StyleSheet, Text } from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { View } from "@/components/Themed";
import { API_URL } from "@/constants/http";
import Spinner from "@/components/Spinner";
import { ICategoryItem } from "@/interfaces";
import { COLORS } from "@/constants/Colors";

export default function CategoriesScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/categories.json`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const categories = Object.entries(data)
    .map(([id, value]: [string, any]) => ({
      id,
      ...value,
      date: new Date(value.date),
    }))
    .toReversed();

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryItem {...item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{
        //       height: 1,
        //       width: "100%",
        //       backgroundColor: "#222",
        //     }}
        //   />
        // )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}
type CategoryItemProps = Pick<ICategoryItem, "categoryName"> & {
  index: number;
};

const CategoryItem = ({ categoryName, index }: CategoryItemProps) => {
  return (
    <View
      style={[
        styles.categoryItemContainer,
        {
          backgroundColor: COLORS[index] || COLORS[0],
        },
      ]}
    >
      <Text>{categoryName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryItemContainer: {
    padding: 10,
    borderRadius: 5,
  },
});
