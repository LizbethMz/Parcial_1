import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';

const Incidentes = () => {
  const [incidentesData, setIncidentesData] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [selectedIncidente, setSelectedIncidente] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [newIncidente, setNewIncidente] = useState({
    envio: '',
    codigo: '',
    descripcion: '',
  });

  const handleRegister = () => {
    if (!newIncidente.envio || !newIncidente.descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setIncidentesData([...incidentesData, { ...newIncidente, codigo: `I00${incidentesData.length + 1}` }]);
    setNewIncidente({ envio: '', codigo: '', descripcion: '' });
    setIsRegistering(false);
    setIsConsulting(false);
    Alert.alert("Registro Exitoso", "El incidente ha sido registrado correctamente.");
  };

  const handleDelete = () => {
    setIncidentesData(incidentesData.filter(inc => inc.codigo !== selectedIncidente.codigo));
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Incidentes</Text>

      <TouchableOpacity style={styles.button} onPress={() => { setIsConsulting(true); setIsRegistering(false); }}>
        <Text style={styles.buttonText}>Consultar Incidentes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { setIsRegistering(true); setIsConsulting(false); }}>
        <Text style={styles.buttonText}>Registrar Nuevo Incidente</Text>
      </TouchableOpacity>

      {isConsulting && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Historial de Incidentes</Text>
          {incidentesData.length === 0 ? (
            <Text style={styles.noData}>No hay incidentes registrados.</Text>
          ) : (
            incidentesData.map((inc, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => { setSelectedIncidente(inc); setModalVisible(true); }}
              >
                <Text style={styles.cardText}><Text style={styles.label}>Código:</Text> {inc.codigo}</Text>
                <Text style={styles.cardText}><Text style={styles.label}>Envío:</Text> {inc.envio}</Text>
                <Text style={styles.cardText}><Text style={styles.label}>Descripción:</Text> {inc.descripcion}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      {isRegistering && (
        <View style={styles.form}>
          <Text style={styles.subTitle}>Registrar Nuevo Incidente</Text>
          <TextInput style={styles.input} placeholder="Código del Envío" value={newIncidente.envio} onChangeText={(text) => setNewIncidente({ ...newIncidente, envio: text })} />
          <TextInput style={styles.input} placeholder="Descripción del Incidente" value={newIncidente.descripcion} onChangeText={(text) => setNewIncidente({ ...newIncidente, descripcion: text })} multiline />
          <Button title="Registrar" onPress={handleRegister} color="#004080" />
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subTitle}>Opciones para {selectedIncidente?.codigo}</Text>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={handleDelete}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#cce5ff',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 15,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#004080',
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#004080',
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
  infoContainer: {
    width: '90%',
    marginTop: 20,
  },
  noData: {
    fontSize: 16,
    color: '#004080',
    textAlign: 'center',
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#99c2ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#004080',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
});

export default Incidentes;
