import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; // Importar Image

const third_image = "https://i.pinimg.com/736x/02/f5/51/02f551cb479ca2b8805d9442c32d8f26.jpg";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Source: Local Image!</Text>
      <Image style={styles.image} source={require('./assets/HelloKitty.jpg')} />
      <Text style={styles.title}>Source: Third Image!</Text>
      <Image style={styles.image} source={{uri: third_image}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
