import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function StudentFooter() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Disciplinas')}>
        <Ionicons name="clipboard-outline" size={22} color="#2b4c80" />
        <Text style={styles.footerText}>Disciplinas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Aviso')}>
        <Ionicons name="megaphone-outline" size={22} color="#2b4c80" />
        <Text style={styles.footerText}>Avisos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="person-outline" size={22} color="#2b4c80" />
        <Text style={styles.footerText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <MaterialCommunityIcons name="message-text-outline" size={22} color="#2b4c80" />
        <Text style={styles.footerText}>Mensagens</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ProfessorFooter() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="clipboard-outline" size={22} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="megaphone-outline" size={22} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('HomeProf')}>
        <Ionicons name="person-circle-outline" size={22} color="#000" />
        <Text style={styles.footerText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#2b4c80', marginTop: 3 },
});

export default null;
