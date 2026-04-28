import { ItemDeLista } from "@/components/ItemDeLista";
import { Item } from "@/hooks/useListaDeCompras";
import { FlatList, StyleSheet, Text } from "react-native";

type Props = {
  items: Item[];
  marcarItem: (id: string) => void;
  removerItem: (id: string) => void;
};

export default function ListaDeCompras({ items, marcarItem, removerItem }: Props) {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <ItemDeLista
          item={item}
          onToggle={marcarItem}
          onDelete={removerItem}
          styles={styles}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>Sin productos</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  empty: { textAlign: "center", marginTop: 24, color: "#888" },
});