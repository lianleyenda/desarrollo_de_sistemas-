import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  text: string;
  setText: (val: string) => void;
  agregarItem: () => void;
};

export default function AgregarItemDeComprar({ text, setText, agregarItem }: Props) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Agregar producto"
        style={styles.input}
        onSubmitEditing={agregarItem}
      />
      <Pressable onPress={agregarItem} style={styles.boton}>
        <Text style={styles.botonTexto}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  boton: { backgroundColor: "#007AFF", borderRadius: 4, width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  botonTexto: { color: "#fff", fontSize: 24, lineHeight: 28 },
});