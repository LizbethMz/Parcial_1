import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Choferes = () => {
  const [choferesData, setChoferesData] = useState([
    { Apellidos: 'González', Nombre: 'Juan', Codigo: 'C001', CamionAsignado: 'Camión 101' },
    { Apellidos: 'Pérez', Nombre: 'María', Codigo: 'C002', CamionAsignado: 'Camión 102' },
    { Apellidos: 'López', Nombre: 'Carlos', Codigo: 'C003', CamionAsignado: 'Camión 103' },
  ]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newChofer, setNewChofer] = useState({ Apellidos: '', Nombre: '', Codigo: '', CamionAsignado: '' });

  const handleRegister = () => {
    if (editingIndex !== null) {
      const updatedChoferes = [...choferesData];
      updatedChoferes[editingIndex] = newChofer;
      setChoferesData(updatedChoferes);
      setEditingIndex(null);
    } else {
      setChoferesData([...choferesData, newChofer]);
    }
    setNewChofer({ Apellidos: '', Nombre: '', Codigo: '', CamionAsignado: '' });
    setIsRegistering(false);
  };

  const handleEdit = (index) => {
    setNewChofer(choferesData[index]);
    setEditingIndex(index);
    setIsRegistering(true);
    setIsConsulting(false);
  };

  const handleDelete = (index) => {
    setChoferesData(choferesData.filter((_, i) => i !== index));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Choferes</Text>

      <TouchableOpacity style={styles.button} onPress={() => { setIsConsulting(true); setIsRegistering(false); }}>
        <Text style={styles.buttonText}>Consultar Información</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { setIsRegistering(true); setIsConsulting(false); setEditingIndex(null); }}>
        <Text style={styles.buttonText}>{editingIndex !== null ? 'Editar Chofer' : 'Registrar Chofer'}</Text>
      </TouchableOpacity>

      {isConsulting && (
        <View style={styles.infoContainer}>
          <Text style={styles.subTitle}>Información de Choferes</Text>
          {choferesData.map((chofer, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}><Text style={styles.label}>Apellidos:</Text> {chofer.Apellidos}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Nombre:</Text> {chofer.Nombre}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Código:</Text> {chofer.Codigo}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Camión Asignado:</Text> {chofer.CamionAsignado}</Text>
              <View style={styles.cardButtons}>
                <Button title="Editar" onPress={() => handleEdit(index)} color="#005398" />
                <Button title="Eliminar" onPress={() => handleDelete(index)} color="#d9534f" />
              </View>
            </View>
          ))}
        </View>
      )}

      {isRegistering && (
        <View style={styles.form}>
          <Text style={styles.subTitle}>{editingIndex !== null ? 'Editar Chofer' : 'Registrar Nuevo Chofer'}</Text>
          <TextInput style={styles.input} placeholder="Apellidos" value={newChofer.Apellidos} onChangeText={(text) => setNewChofer({ ...newChofer, Apellidos: text })} />
          <TextInput style={styles.input} placeholder="Nombre" value={newChofer.Nombre} onChangeText={(text) => setNewChofer({ ...newChofer, Nombre: text })} />
          <TextInput style={styles.input} placeholder="Código" value={newChofer.Codigo} onChangeText={(text) => setNewChofer({ ...newChofer, Codigo: text })} />
          <TextInput style={styles.input} placeholder="Camión Asignado" value={newChofer.CamionAsignado} onChangeText={(text) => setNewChofer({ ...newChofer, CamionAsignado: text })} />
          <Button title={editingIndex !== null ? "Guardar Cambios" : "Registrar"} onPress={handleRegister} />
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
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#005398', 
    marginBottom: 20 
  },
  subTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#005398', 
    marginBottom: 15 
  },
  card: { 
    backgroundColor: 'rgb(219, 237, 252)', 
    padding: 15, 
    borderRadius: 10, 
    width: '90%', 
    marginBottom: 15, 
    elevation: 4 
  },
  cardText: { 
    fontSize: 16, 
    color: '#005398' 
  },
  label: { 
    fontWeight: 'bold' 
  },
  button: { backgroundColor: '#005398',
     padding: 20,
    borderRadius: 5, 
    marginTop: 10, 
    alignItems: 'center', 
    width: '90%' },
  buttonText: { 
    color: '#fff', 
    fontSize: 22 
  },
  infoContainer: { 
    width: '90%', 
    marginTop: 20 
  },
  form: { 
    width: '90%', 
    padding: 20, 
    backgroundColor: '#f2f2f2', 
    borderRadius: 10, 
    marginTop: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 15, 
    backgroundColor: '#fff' 
  },
  cardButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  }
});

export default Choferes;
