import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Rutas = () => {
  const [rutasData, setRutasData] = useState([
    { cod_ident: 'RUTA001', origen: 'Ciudad A', destino: 'Ciudad B', distancia: '150 km', tiempo: '2 horas' },
    { cod_ident: 'RUTA002', origen: 'Ciudad C', destino: 'Ciudad D', distancia: '200 km', tiempo: '3 horas' },
    { cod_ident: 'RUTA003', origen: 'Ciudad E', destino: 'Ciudad F', distancia: '250 km', tiempo: '4 horas' },
  ]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRuta, setNewRuta] = useState({
    cod_ident: '',
    origen: '',
    destino: '',
    distancia: '',
    tiempo: '',
  });

  const handleRegisterOrUpdate = () => {
    if (editingIndex !== null) {
      // Editar ruta existente
      const updatedRutas = [...rutasData];
      updatedRutas[editingIndex] = newRuta;
      setRutasData(updatedRutas);
      setEditingIndex(null);
    } else {
      // Registrar nueva ruta
      setRutasData([...rutasData, newRuta]);
    }
    setNewRuta({ cod_ident: '', origen: '', destino: '', distancia: '', tiempo: '' });
    setIsRegistering(false);
  };

  const handleEdit = (index) => {
    setNewRuta(rutasData[index]);
    setEditingIndex(index);
    setIsRegistering(true);
    setIsConsulting(false);
  };

  const handleDelete = (index) => {
    const updatedRutas = rutasData.filter((_, i) => i !== index);
    setRutasData(updatedRutas);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Rutas</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsConsulting(true);
          setIsRegistering(false);
        }}
      >
        <Text style={styles.buttonText}>Consultar Información</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsRegistering(true);
          setIsConsulting(false);
          setEditingIndex(null);
        }}
      >
        <Text style={styles.buttonText}>Registrar Ruta</Text>
      </TouchableOpacity>

      {isConsulting && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Información de Rutas</Text>
          {rutasData.map((ruta, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}><Text style={styles.label}>Cod. Ident.:</Text> {ruta.cod_ident}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Origen:</Text> {ruta.origen}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Destino:</Text> {ruta.destino}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Distancia:</Text> {ruta.distancia}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Tiempo:</Text> {ruta.tiempo}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(index)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {isRegistering && (
        <View style={styles.form}>
          <Text style={styles.subTitle}>{editingIndex !== null ? 'Editar Ruta' : 'Registrar Nueva Ruta'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Código Identificación"
            value={newRuta.cod_ident}
            onChangeText={(text) => setNewRuta({ ...newRuta, cod_ident: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Origen"
            value={newRuta.origen}
            onChangeText={(text) => setNewRuta({ ...newRuta, origen: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Destino"
            value={newRuta.destino}
            onChangeText={(text) => setNewRuta({ ...newRuta, destino: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Distancia"
            value={newRuta.distancia}
            onChangeText={(text) => setNewRuta({ ...newRuta, distancia: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo"
            value={newRuta.tiempo}
            onChangeText={(text) => setNewRuta({ ...newRuta, tiempo: text })}
          />
          <Button backgroundColor="rgb(0, 64, 128)" title={editingIndex !== null ? 'Actualizar' : 'Registrar'} onPress={handleRegisterOrUpdate} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005398',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005398',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'rgb(230, 242, 255)',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#005398',
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgb(0, 64, 128)',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#F0A500',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#D7263D',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgb(230, 242, 255)',
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default Rutas;
