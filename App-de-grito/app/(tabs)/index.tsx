import { Audio } from "expo-av";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [sonido, setSonido] = useState<Audio.Recording | null>(null);
  const [nivel, setNivel] = useState("Silencio...");
  const [imagen, setImagen] = useState(
    require("../../assets/images/chiquitapia.jpeg"),
  );

  const NIVEL_PLATENSE = -60;
  const NIVEL_ARGENTINOS = -40;
  const NIVEL_RACING = -20;
  const NIVEL_RIVER = -10;

  async function empezarSonido() {
    try {
      if (sonido) return;

      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const nuevoSonido = new Audio.Recording();

      await nuevoSonido.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });

      await nuevoSonido.startAsync();
      setSonido(nuevoSonido);

      nuevoSonido.setProgressUpdateInterval(100);

      nuevoSonido.setOnRecordingStatusUpdate((status) => {
        if (status.metering !== undefined) {
          const volumen = status.metering;
          console.log(volumen);

          if (volumen < NIVEL_PLATENSE) {
            setNivel("Platense");
            setImagen(require("../../assets/images/platense.jpeg"));
          } else if (volumen < NIVEL_ARGENTINOS) {
            setNivel("Argentinos");
            setImagen(require("../../assets/images/argentinos.png"));
          } else if (volumen < NIVEL_RACING) {
            setNivel("Racing");
            setImagen(require("../../assets/images/racing.png"));
          } else if (volumen < NIVEL_RIVER) {
            setNivel("River");
            setImagen(require("../../assets/images/river.png"));
          } else {
            setNivel("Boca");
            setImagen(require("../../assets/images/boca.png"));
          }
        }
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function pausarSonido() {
    if (!sonido) return;

    await sonido.stopAndUnloadAsync();
    setSonido(null);
    setNivel("Grita para saber");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué equipo del fútbol argentino sos?</Text>

      <Image source={imagen} style={styles.image} />

      <Text style={styles.resultado}>{nivel}</Text>

      <View style={styles.buttons}>
        <Button title="Empezar" onPress={empezarSonido} />
        <Button title="Parar" onPress={pausarSonido} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // fondo blanco
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20, // 👈 bordes redondeados
  },
  resultado: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  buttons: {
    gap: 10, // separación entre botones
  },
});
