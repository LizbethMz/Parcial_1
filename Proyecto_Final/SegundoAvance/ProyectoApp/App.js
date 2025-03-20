import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importar FontAwesome
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Temperatura from './Consultas/Temperatura';
import Choferes from './Consultas/Choferes';
import Camiones from './Consultas/Camiones';
import Envios from './Consultas/Envios'; 
import Incidentes from './Consultas/Incidentes'; 
import Rutas from './Consultas/Rutas'; 




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Pantalla de Inicio
function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard General</Text>

      {/* Estado General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado General</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Icon name="truck" size={30} color="#003B75" style={styles.icon} />
            <Text style={styles.infoText}>Camiones Activos</Text>
            <Text style={styles.highlight}>12</Text>
          </View>
          <View style={styles.infoCard}>
            <Icon name="box" size={30} color="#003B75" style={styles.icon} />
            <Text style={styles.infoText}>Envíos en Curso</Text>
            <Text style={styles.highlight}>8</Text>
          </View>
          <View style={styles.infoCard}>
            <Icon name="exclamation-circle" size={30} color="#003B75" style={styles.icon} />
            <Text style={styles.infoText}>Incidentes</Text>
            <Text style={styles.highlight}>2</Text>
          </View>
        </View>
      </View>

      {/* Temperatura en Tiempo Real */}
      <View style={styles.tempContainer}>
        <Text style={styles.sectionTitle}> Temperaturas Activas </Text>
        <View style={styles.tempCard}>
          <View style={styles.tempLeft}>
            <Text style={styles.tempText}>2°C</Text>
          </View>
          <View style={styles.tempRight}>
            <Text style={styles.tempTitle}>Camión 101</Text>
            <Text style={styles.statusOK}>Estable</Text>
          </View>
        </View>

        <View style={styles.tempCard}>
          <View style={styles.tempLeft}>
            <Text style={styles.tempText}>8°C</Text>
          </View>
          <View style={styles.tempRight}>
            <Text style={styles.tempTitle}>Camión 102</Text>
            <Text style={styles.statusWarning}>¡Atención!</Text>
          </View>
        </View>

        <View style={styles.tempCard}>
          <View style={styles.tempLeft}>
            <Text style={styles.tempText}>4°C</Text>
          </View>
          <View style={styles.tempRight}>
            <Text style={styles.tempTitle}>Camión 103</Text>
            <Text style={styles.statusOK}>Estable</Text>
          </View>
        </View>
      </View>

      {/* Próximos Envíos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Envíos</Text>
        <View style={styles.envioCard}>
          <View style={styles.envioLeft}>
            <Icon name="shipping-fast" style={styles.iconShipping} />
          </View>
          <View style={styles.envioCenter}>
            <Text style={styles.envioText}>Planta MedicPro <Icon name="angle-right" style={styles.iconShipping} /> Clinica 130</Text>
          </View>
          <View style={styles.envioRight}>
          </View>
        </View>
        <View style={styles.envioCard}>
          <View style={styles.envioLeft}>
            <Icon name="shipping-fast" style={styles.iconShipping} />
          </View>
          <View style={styles.envioCenter}>
            <Text style={styles.envioText}>Farmaceutica Luna  <Icon name="angle-right" style={styles.iconShipping} />  Clinica General 23</Text>
          </View>
          <View style={styles.envioRight}>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Pantalla de Configuración
function SettingsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.settingsList}>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => navigation.navigate('Temperatura')}
        >
          <Text style={styles.settingText}>Consultar Temperatura</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.settingRow}
        onPress={() => navigation.navigate('Envios')} 
        >
        <Text style={styles.settingText} >Gestión de Envíos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => navigation.navigate('Choferes')}
        >
          <Text style={styles.settingText}>Choferes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => navigation.navigate('Camiones')}
        >
          <Text style={styles.settingText}>Gestion de Camiones</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.settingRow} 
          onPress={() => navigation.navigate('Incidentes')}
          >
          <Text style={styles.settingText}>Gestion de Incidentes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => navigation.navigate('Rutas')}>
          <Text style={styles.settingText}> Gestion de Rutas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.settingBox}>
          <Text style={styles.settingText}>Configurar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBox}>
          <Text style={styles.settingText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Navegación Principal
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Temperatura" component={Temperatura} options={{ title: 'Consulta de Temperatura' }} />
      <Stack.Screen name="Choferes" component={Choferes} options={{ title: 'Consulta de Choferes' }} />
      <Stack.Screen name="Camiones" component={Camiones} options={{ title: 'Consulta de Camiones' }} />
      <Stack.Screen name="Envios" component={Envios} options={{ title: 'Gestion de Envios' }} />
      <Stack.Screen name="Incidentes" component={Incidentes} options={{ title: 'Gestion de Incidentes' }} />
      <Stack.Screen name="Rutas" component={Rutas} options={{ title: 'Gestion de Rutas' }} />


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'rgb(189, 211, 228)' },
          headerTitleStyle: { color: '#005398', fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: 'rgb(189, 211, 228)' },
          tabBarActiveTintColor: '#005398',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff', // Fondo blanco
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005398', // Azul principal
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003B75', // Azul oscuro para títulos
    marginBottom: 10,
  },
  // Estilo para las tarjetas de temperatura
  tempContainer: {
    width: '100%',
  },
  tempCard: {
    flexDirection: 'row', // Layout horizontal
    backgroundColor: 'rgb(249 249 255)', // Fondo gris claro
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000', // Sombra para un efecto limpio
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
  },
  tempLeft: {
    flex: 1, // Menor proporción para el lado de la temperatura
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 40, // Tamaño grande para destacar la temperatura
    fontWeight: 'bold',
    color: '#005398', // Azul principal
  },
  tempRight: {
    flex: 2, // Más espacio para la información
    paddingLeft: 10,
  },
  tempTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003B75', // Azul más oscuro para textos informativos
    marginBottom: 5,
  },
  statusOK: {
    fontSize: 14,
    color: '#228B22', // Verde para estado OK
    fontWeight: 'bold',
  },
  statusWarning: {
    fontSize: 14,
    color: '#FF4500', // Rojo para advertencias
    fontWeight: 'bold',
  },
  // Estilo para las tarjetas de Próximos Envíos
  envioCard: {
    flexDirection: 'row', // Diseño horizontal
    backgroundColor: 'rgb(210 222 231)', // Fondo gris claro
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000', // Sombra para un efecto limpio
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
    height: 80, // Tamaño uniforme para todas las tarjetas
  },
  envioLeft: {
    flex: 1, // Espacio para el ícono inicial
    alignItems: 'center',
    justifyContent: 'center',
  },
  envioCenter: {
    flex: 2, // Espacio para la descripción del envío
    paddingLeft: 10,
  },
  envioRight: {
    flex: 1, // Espacio para la fecha
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShipping: {
    color: '#005398', // Azul principal para el ícono
    fontSize: 30, // Tamaño del ícono de envío rápido
  },
  envioText: {
    fontSize: 16, // Texto del envío
    fontWeight: 'bold',
    color: '#003B75', // Azul oscuro
  },
  envioDate: {
    fontSize: 14, // Texto para la fecha
    color: '#003B75', // Azul oscuro
    fontWeight: 'bold',
  },
  // Estilo para las tarjetas de información general
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoCard: {
    backgroundColor: '#DBEDFC', // Azul suave
    width: '30%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#003B75',
    textAlign: 'center',
    marginBottom: 5,
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#005398',
  },
  infoBox: {
    backgroundColor: '#DBEDFC',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 20,
  },
  settingsList: {
    width: '100%',
    marginBottom: 20,
  },
  settingRow: {
    backgroundColor: 'rgb(230 243 254)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  settingBox: {
    backgroundColor: 'rgb(199 223 243)',
    width: '45%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  settingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#005398',
    fontWeight: 'bold',
  },
});
