import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeProf() {
  const [materias, setMaterias] = useState([
    { id: 1, nome: "Cálculo 3", icone: "microscope" },
    { id: 2, nome: "Arquitetura de Software", icone: "hammer" },
    { id: 3, nome: "Projeto 3", icone: "book-open" },
    { id: 4, nome: "Engenharia de Requisitos", icone: "project-diagram" },
    { id: 5, nome: "Banco de Dados Avançado", icone: "database" },
    { id: 6, nome: "Programação Web", icone: "code" },
  ]);

  const [perfilModal, setPerfilModal] = useState(false);
  const [materiaModal, setMateriaModal] = useState(false);
  const [addMateriaModal, setAddMateriaModal] = useState(false);

  const [novaMateria, setNovaMateria] = useState("");
  const [materiaSelecionada, setMateriaSelecionada] = useState<any>(null);

<View style={styles.cardPerfil}>
        <Text style={styles.titulo}>Perfil</Text>
</View>
  const [perfil, setPerfil] = useState({
    nome: "Elikson Tavares",
    email: "elikson.tavares@ifam.edu.br",
    contato: "+55 (92) 99999-9999",
  });

  const abrirEditarMateria = (materia: any) => {
    setMateriaSelecionada(materia);
    setMateriaModal(true);
  };

  const confirmarAdicionarMateria = () => {
    if (novaMateria.trim() === "") {
      Alert.alert("Erro", "Digite um nome para a matéria.");
      return;
    }
    setMaterias([
      ...materias,
      { id: Date.now(), nome: novaMateria, icone: "book" },
    ]);
    setNovaMateria("");
    setAddMateriaModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}></Text>

      {/* Card do Professor */}
      <View style={styles.cardPerfil}>
        <Text style={styles.titulo}>Perfil</Text>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nome}>{perfil.nome}</Text>
            <Text style={styles.cargo}>Professor de Dispositivos Móveis</Text>
            <Text style={styles.email}>{perfil.email}</Text>
            <Text style={styles.contato}>{perfil.contato}</Text>

            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => setPerfilModal(true)}
            >
              <Text style={styles.textoBotao}>editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Disciplinas */}
      <View style={styles.cardMaterias}>
        <View style={styles.headerMaterias}>
          <Text style={styles.subtitulo}>Disciplinas do Professor</Text>
          <TouchableOpacity onPress={() => setAddMateriaModal(true)}>
            <Ionicons name="add-circle-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {materias.map((materia) => (
            <View key={materia.id} style={styles.materiaBox}>
              <FontAwesome5 name={materia.icone} size={40} color="black" />
              <Text style={styles.materiaNome}>{materia.nome}</Text>
              <TouchableOpacity
                style={styles.botaoEditarMateria}
                onPress={() => abrirEditarMateria(materia)}
              >
                <Text style={styles.textoBotao}>editar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Editar Perfil */}
      <Modal visible={perfilModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Editar Perfil</Text>

            <Text style={styles.label}>Nome para Exibição</Text>
            <TextInput
              style={styles.input}
              value={perfil.nome}
              onChangeText={(t) => setPerfil({ ...perfil, nome: t })}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={perfil.email}
              onChangeText={(t) => setPerfil({ ...perfil, email: t })}
            />

            <Text style={styles.label}>Contato</Text>
            <TextInput
              style={styles.input}
              value={perfil.contato}
              onChangeText={(t) => setPerfil({ ...perfil, contato: t })}
            />

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={() => setPerfilModal(false)}
            >
              <Text style={styles.textoBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Editar Matéria */}
      <Modal visible={materiaModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>
              Editar {materiaSelecionada?.nome}
            </Text>
          <ScrollView horizontal contentContainerStyle={{ paddingVertical: 8 }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => Linking.openURL("https://classroom.google.com/c/ODIxOTMwOTQ1MTI4?cjc=omnaakqd")}
                  style={styles.classroomIcon}
                  activeOpacity={0.7}
                >
                <MaterialCommunityIcons
                  name="google-classroom"
                  size={24}
                  color="#1a73e8"
                />
                <Text style={styles.linkClassroom}>Classroom</Text>
              </TouchableOpacity>
          </View>
            </ScrollView>
            <Text style={styles.label}>Avisos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Hoje não haverá aula..."
            />

            <Text style={styles.label}>Aulas Repositório</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: link do YouTube..."
            />

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={() => setMateriaModal(false)}
            >
              <Text style={styles.textoBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Adicionar Matéria */}
      <Modal visible={addMateriaModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Adicionar Nova Matéria</Text>
            <Text style={styles.label}>Nome da Matéria</Text>
            <TextInput
              style={styles.input}
              value={novaMateria}
              onChangeText={setNovaMateria}
              placeholder="Ex: Programação para Dispositivos"
            />
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={confirmarAdicionarMateria}
            >
              <Text style={styles.textoBotaoSalvar}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    
  );
  {/* Fazer Excluir Matéria*/}
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  titulo: { fontSize: 21, fontWeight: "600", marginBottom: 10, color: "#2b4c80" },
  subtitulo: { fontSize: 21, fontWeight: "600", color: "#2b4c80" },
  cardPerfil: {
    backgroundColor: "#e8f0ff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  avatarContainer: { flexDirection: "row", alignItems: "center" },
  nome: { fontSize: 18, fontWeight: "600" },
  cargo: { color: "#2b4c80", fontSize: 15 },
  email: { fontSize: 14, color: "#444" },
  contato: { fontSize: 14, color: "#444" },

  classroomIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
  },
  linkClassroom: {
    color: "#1a73e8",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "600",
    textDecorationLine: "none",
  },

  botaoEditar: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotao: { color: "#2b4c80", fontWeight: "500" },
  cardMaterias: {
    backgroundColor: "#e8f0ff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
  },
  headerMaterias: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  materiaBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    width: "28%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  materiaNome: {
    marginTop: 6,
    fontSize: 12,
    color: "#2b4c80",
    textAlign: "center",
  },
  botaoEditarMateria: {
    backgroundColor: "#e8f0ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "85%",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2b4c80",
    marginBottom: 10,
  },
  label: { color: "#2b4c80", fontWeight: "600", marginTop: 10 },
  input: {
    backgroundColor: "#f5f7fb",
    borderRadius: 10,
    padding: 8,
    marginTop: 4,
  },
  botaoSalvar: {
    backgroundColor: "#2b4c80",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  textoBotaoSalvar: { color: "#fff", fontWeight: "600" },
});