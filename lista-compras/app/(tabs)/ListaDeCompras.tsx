import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useListaDeCompras } from "../../hooks/useListaDeCompras";
import { ItemDeLista } from "../../components/ItemDeLista";

export default function ListaDeCompras() {
  const {
    items,
    text,
    setText,
    agregarItem,
    marcarItem,
    removerItem,
  } = useListaDeCompras();
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lista de Compras</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Agregar producto"
          style={styles.input}
          onSubmitEditing={agregarItem}
        />

        <Pressable style={styles.boton} onPress={agregarItem}>
          <Text style={styles.botonTexto}>Agregar</Text>
        </Pressable>
      </View>

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
          <Text style={styles.empty}>
            Sin productos
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  boton: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botonTexto: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoItem: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
  },
  tareaPendiente: { backgroundColor: "#eee", color: "#666" },
  tareaCompletada: { backgroundColor: "#2ecc71", color: "#fff" },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
});