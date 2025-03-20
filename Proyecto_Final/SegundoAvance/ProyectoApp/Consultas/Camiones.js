import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Camiones = () => {
  const [camionesData, setCamionesData] = useState([
    { cod_ident: 'CAM001', año: 2015, matricula: 'ABC-123', estado: 'Activo', MMA: '10 Toneladas' },
    { cod_ident: 'CAM002', año: 2018, matricula: 'DEF-456', estado: 'Mantenimiento', MMA: '15 Toneladas' },
    { cod_ident: 'CAM003', año: 2020, matricula: 'GHI-789', estado: 'Activo', MMA: '12 Toneladas' },
  ]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCamion, setNewCamion] = useState({
    cod_ident: '',
    año: '',
    matricula: '',
    estado: '',
    MMA: '',
  });

  const handleRegisterOrUpdate = () => {
    if (editingIndex !== null) {
      // Editar camión existente
      const updatedCamiones = [...camionesData];
      updatedCamiones[editingIndex] = newCamion;
      setCamionesData(updatedCamiones);
      setEditingIndex(null);
    } else {
      // Registrar nuevo camión
      setCamionesData([...camionesData, newCamion]);
    }
    setNewCamion({ cod_ident: '', año: '', matricula: '', estado: '', MMA: '' });
    setIsRegistering(false);
  };

  const handleEdit = (index) => {
    setNewCamion(camionesData[index]);
    setEditingIndex(index);
    setIsRegistering(true);
    setIsConsulting(false);
  };

  const handleDelete = (index) => {
    const updatedCamiones = camionesData.filter((_, i) => i !== index);
    setCamionesData(updatedCamiones);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Camiones</Text>

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
        <Text style={styles.buttonText}>Registrar Camión</Text>
      </TouchableOpacity>

      {isConsulting && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Información de Camiones</Text>
          {camionesData.map((camion, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}><Text style={styles.label}>Cod. Ident.:</Text> {camion.cod_ident}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Año:</Text> {camion.año}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Matrícula:</Text> {camion.matricula}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Estado:</Text> {camion.estado}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>MMA:</Text> {camion.MMA}</Text>

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
          <Text style={styles.subTitle}>{editingIndex !== null ? 'Editar Camión' : 'Registrar Nuevo Camión'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Código Identificación"
            value={newCamion.cod_ident}
            onChangeText={(text) => setNewCamion({ ...newCamion, cod_ident: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Año"
            value={newCamion.año}
            keyboardType="numeric"
            onChangeText={(text) => setNewCamion({ ...newCamion, año: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            value={newCamion.matricula}
            onChangeText={(text) => setNewCamion({ ...newCamion, matricula: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={newCamion.estado}
            onChangeText={(text) => setNewCamion({ ...newCamion, estado: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="MMA (ej. 10 Toneladas)"
            value={newCamion.MMA}
            onChangeText={(text) => setNewCamion({ ...newCamion, MMA: text })}
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

export default Camiones;
