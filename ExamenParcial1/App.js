import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/NFLogo.png')} />

      <Text style={styles.title}>NFLGamePass</Text>
      <Text style={styles.title2}>User Registration</Text>

      <Text style={styles.label}>ID</Text>
      <TextInput 
        placeholder="Enter your ID"
        style={styles.input} 
        value={id}
        onChangeText={setId}
      />

      <Text style={styles.label}>NAME</Text>
      <TextInput 
        placeholder="Enter your Name"
        style={styles.input} 
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput 
        placeholder="Enter your Email"
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>PHONE</Text>
      <TextInput 
        placeholder="Enter your Phone"
        style={styles.input} 
        value={phone}
        onChangeText={setPhone}
      />

      <Button 
        title="Register"
        onPress={handleRegister} 
        color="#091C86"
      />

      {submitted && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>User Information:</Text>
          <Text>ID: {id}</Text>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Image style={styles.image2} source={require('./assets/kittyNFL.png')} />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F8FC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#091C86',
  },
  title2: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 17,
    color: '#005B98',
  },
  input: {
    height: 40,
    width: 200,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#DEEFFB'
  },
  button:{
    marginTop: 30,
    width: 200,
    borderRadius: 12,
    color: '#091C86',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 10,
  }, 
   image2: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D3ECFE',
    width: 250,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
