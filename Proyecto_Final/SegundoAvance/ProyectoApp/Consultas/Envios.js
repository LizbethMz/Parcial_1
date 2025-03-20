import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';

const Envios = () => {
  const [enviosData, setEnviosData] = useState([
    { id: 'E001', ruta: 'Planta MedicPro - Clínica 130', camion: 'Camión 101', conductor: 'Juan González', estado: 'En tránsito' },
    { id: 'E002', ruta: 'Farmacéutica Luna - Clínica General 23', camion: 'Camión 102', conductor: 'María Pérez', estado: 'Entregado' },
  ]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEnvio, setSelectedEnvio] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [newEnvio, setNewEnvio] = useState({
    ruta: '',
    camion: '',
    conductor: '',
    estado: 'Pendiente',
  });

  const handleRegister = () => {
    if (editMode) {
      setEnviosData(enviosData.map(envio => (envio.id === selectedEnvio.id ? { ...selectedEnvio, ...newEnvio } : envio)));
      Alert.alert("Edición Completa", "El envío ha sido modificado correctamente.");
      setEditMode(false);
    } else {
      setEnviosData([...enviosData, { id: `E00${enviosData.length + 1}`, ...newEnvio }]);
    }
    setNewEnvio({ ruta: '', camion: '', conductor: '', estado: 'Pendiente' });
    setIsRegistering(false);
    setIsConsulting(false);
  };

  const handleDelete = () => {
    setEnviosData(enviosData.filter(envio => envio.id !== selectedEnvio.id));
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!editMode && (
        <>
          <Text style={styles.title}>Gestión de Envíos</Text>
          <TouchableOpacity style={styles.button} onPress={() => { setIsConsulting(true); setIsRegistering(false); }}>
            <Text style={styles.buttonText}>Consultar Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { setIsRegistering(true); setIsConsulting(false); }}>
            <Text style={styles.buttonText}>Registrar Nuevo Envío</Text>
          </TouchableOpacity>
        </>
      )}

      {isConsulting && !editMode && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Historial de Envíos</Text>
          {enviosData.map((envio, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => { setSelectedEnvio(envio); setModalVisible(true); }}
            >
              <Text style={styles.cardText}><Text style={styles.label}>ID:</Text> {envio.id}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Ruta:</Text> {envio.ruta}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Camión:</Text> {envio.camion}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Conductor:</Text> {envio.conductor}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Estado:</Text> {envio.estado}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {(isRegistering || editMode) && (
        <View style={styles.form}>
          <Text style={styles.subTitle}>{editMode ? 'Editar Envío' : 'Registrar Nuevo Envío'}</Text>
          <TextInput style={styles.input} placeholder="Ruta" value={newEnvio.ruta} onChangeText={(text) => setNewEnvio({ ...newEnvio, ruta: text })} />
          <TextInput style={styles.input} placeholder="Camión" value={newEnvio.camion} onChangeText={(text) => setNewEnvio({ ...newEnvio, camion: text })} />
          <TextInput style={styles.input} placeholder="Conductor" value={newEnvio.conductor} onChangeText={(text) => setNewEnvio({ ...newEnvio, conductor: text })} />
          <Button title={editMode ? "Guardar Cambios" : "Registrar"} onPress={handleRegister} />
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subTitle}>Opciones para {selectedEnvio?.id}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setNewEnvio(selectedEnvio); setIsRegistering(true); setModalVisible(false); setEditMode(true); }}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgb(219, 237, 252)',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 15,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#005398',
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#005398',
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
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f2f2f2',
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
    backgroundColor: '#005398',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
});

export default Envios;
