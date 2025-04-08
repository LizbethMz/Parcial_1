import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getCamiones, createCamion, updateCamion, deleteCamion } from '../api/CamionesApi';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Camiones = () => {
  const [camionesData, setCamionesData] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCamion, setNewCamion] = useState({
    codigo: '',
    year: '',
    MMA: '',
    matricula: '',
    estado: 'Disponible',
    cod_modelo: '',
    cod_marca: '',
  });

  const fetchData = async () => {
    try {
      const data = await getCamiones();
      setCamionesData(data);
    } catch (error) {
      console.error('Error obteniendo datos de camiones:', error);
      alert('Error al cargar los camiones');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegisterOrUpdate = async () => {
    try {
      if (editingIndex !== null) {
        await updateCamion(newCamion.codigo, newCamion);
        alert('Camión actualizado correctamente');
      } else {
        const camionToCreate = { ...newCamion, estado: 'Disponible' };
        await createCamion(camionToCreate);
        alert('Camión registrado correctamente');
      }
      fetchData();
      setEditingIndex(null);
      setNewCamion({ 
        codigo: '', 
        year: '', 
        MMA: '', 
        matricula: '', 
        estado: 'Disponible',
        cod_modelo: '', 
        cod_marca: '' 
      });
      setIsRegistering(false);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (index) => {
    const camionToEdit = camionesData[index];
    setNewCamion({
      codigo: camionToEdit.codigo?.toString() || '',
      year: camionToEdit.year?.toString() || '',
      MMA: camionToEdit.MMA?.toString() || '',
      matricula: camionToEdit.matricula || '',
      estado: camionToEdit.estado || 'Disponible',
      cod_modelo: camionToEdit.cod_modelo?.toString() || '',
      cod_marca: camionToEdit.cod_marca?.toString() || '',
    });
    setEditingIndex(index);
    setIsRegistering(true);
    setIsConsulting(false);
  };

  const handleDelete = async (index) => {
    try {
      const codigo = camionesData[index].codigo;
      await deleteCamion(codigo);
      alert('Camión eliminado correctamente');
      fetchData();
    } catch (error) {
      console.error('Error eliminando camión:', error);
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  const handleConsult = () => {
    fetchData();
    setIsConsulting(true);
    setIsRegistering(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Camiones</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleConsult}
        >
          <Icon name="search" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Consultar Camiones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            setIsRegistering(true);
            setIsConsulting(false);
            setEditingIndex(null);
            setNewCamion({ 
              codigo: '', 
              year: '', 
              MMA: '', 
              matricula: '', 
              estado: 'Disponible',
              cod_modelo: '', 
              cod_marca: '' 
            });
          }}
        >
          <Icon name="plus-circle" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Registrar Nuevo Camión</Text>
        </TouchableOpacity>
      </View>

      {isConsulting && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Información de Camiones</Text>
          {camionesData.map((camion, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="truck" size={24} color="#005398" />
                <Text style={styles.cardTitle}>Camión #{camion.codigo}</Text>
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Año:</Text> {camion.year}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>MMA:</Text> {camion.MMA}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Matrícula:</Text> {camion.matricula}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Estado:</Text> {camion.estado}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Modelo:</Text> {camion.cod_modelo}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Marca:</Text> {camion.cod_marca}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity 
                  style={styles.secondaryButton} 
                  onPress={() => handleEdit(index)}
                >
                  <Icon name="edit" size={16} color="#fff" />
                  <Text style={styles.secondaryButtonText}> Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.secondaryButton, styles.deleteButton]} 
                  onPress={() => handleDelete(index)}
                >
                  <Icon name="trash-alt" size={16} color="#fff" />
                  <Text style={styles.secondaryButtonText}> Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {isRegistering && (
        <View style={styles.form}>
          <Text style={styles.subTitle}>
            {editingIndex !== null ? 'Editar Camión' : 'Registrar Nuevo Camión'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={newCamion.codigo}
            onChangeText={(text) => setNewCamion({ ...newCamion, codigo: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Año (ej. 2023)"
            value={newCamion.year}
            onChangeText={(text) => setNewCamion({ ...newCamion, year: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="MMA (ej. 3500.50)"
            value={newCamion.MMA}
            onChangeText={(text) => setNewCamion({ ...newCamion, MMA: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Matrícula (ej. ABC123)"
            value={newCamion.matricula}
            onChangeText={(text) => setNewCamion({ ...newCamion, matricula: text })}
          />
          
          {editingIndex !== null ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newCamion.estado}
                onValueChange={(itemValue) => 
                  setNewCamion({ ...newCamion, estado: itemValue })
                }
                style={styles.picker}
              >
                <Picker.Item label="Disponible" value="Disponible" />
                <Picker.Item label="Asignado" value="Asignado" />
                <Picker.Item label="En ruta" value="En ruta" />
                <Picker.Item label="En mantenimiento" value="En mantenimiento" />
              </Picker>
            </View>
          ) : (
            <View style={styles.disabledInputContainer}>
              <Text style={styles.disabledInputLabel}>Estado:</Text>
              <View style={styles.disabledInput}>
                <Text style={styles.disabledInputText}>Disponible</Text>
              </View>
            </View>
          )}
          
          <TextInput
            style={styles.input}
            placeholder="Código Modelo"
            value={newCamion.cod_modelo}
            onChangeText={(text) => setNewCamion({ ...newCamion, cod_modelo: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Código Marca"
            value={newCamion.cod_marca}
            onChangeText={(text) => setNewCamion({ ...newCamion, cod_marca: text })}
            keyboardType="numeric"
          />
          
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleRegisterOrUpdate}
          >
            <Text style={styles.primaryButtonText}>
              {editingIndex !== null ? 'Actualizar Camión' : 'Registrar Camión'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005398',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#005398',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  card: {
    backgroundColor: '#EAF2F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6EAF8',
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005398',
    marginLeft: 10,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#005398',
  },
  form: {
    backgroundColor: '#EAF2F8',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D6EAF8',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  disabledInputContainer: {
    marginBottom: 15,
  },
  disabledInputLabel: {
    fontSize: 16,
    color: '#005398',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#D6EAF8',
    padding: 12,
    borderRadius: 5,
  },
  disabledInputText: {
    fontSize: 16,
    color: '#555',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005398',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D6EAF8',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default Camiones;