import { Pressable, Text } from "react-native";
import { Item } from "../hooks/useListaDeCompras";

export function ItemDeLista({
  item,
  onToggle,
  onDelete,
  styles,
}: {
  item: Item;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  styles: any;
}) {
  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      onLongPress={() => onDelete(item.id)}
      style={styles.row}
    >
      <Text
        style={[
          styles.textoItem,
          item.done && styles.done,
        ]}
      >
        {item.name}
      </Text>

      <Text
        style={[
          styles.pill,
          item.done
            ? styles.tareaCompletada
            : styles.tareaPendiente,
        ]}
      >
        {item.done ? "✔" : "•"}
      </Text>
    </Pressable>
  );
}