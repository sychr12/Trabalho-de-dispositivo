// src/screens/HomeProf.tsx
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

  const [perfil, setPerfil] = useState({
    nome: "Elikson Tavares",
    email: "elikson.tavares@ifam.edu.br",
    contato: "+55 (92) 99999-9999",
    classroom: "https://classroom.google.com/",
  });

  const [pdfs, setPdfs] = useState<string[]>([
    "Aula_01.pdf",
    "Resumo_Unidade_2.pdf",
    "Exercicios.pdf",
  ]);

  const abrirEditarMateria = (materia: any) => {
    setMateriaSelecionada(materia);
    setMateriaModal(true);
  };

  const adicionarPDF = () => {
    const novoNome = `NovoArquivo_${pdfs.length + 1}.pdf`;
    setPdfs([...pdfs, novoNome]);
    Alert.alert("PDF Adicionado", `${novoNome} foi adicionado com sucesso.`);
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
      <Text style={styles.titulo}>Home</Text>

      {/* Card do Professor */}
      <View style={styles.cardPerfil}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nome}>{perfil.nome}</Text>
            <Text style={styles.cargo}>Professor de Dispositivos Móveis</Text>
            <Text style={styles.email}>{perfil.email}</Text>
            <Text style={styles.contato}>{perfil.contato}</Text>

            {perfil.classroom ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(perfil.classroom)}
                style={styles.classroomIcon}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="google-classroom"
                  size={24}
                  color="#1a73e8"
                />
                <Text style={styles.linkClassroom}>Google Classroom</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => setPerfilModal(true)}
        >
          <Text style={styles.textoBotao}>editar</Text>
        </TouchableOpacity>
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

      {/* Modal Editar Perfil */}
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

            <Text style={styles.label}>Link do Google Classroom</Text>
            <TextInput
              style={styles.input}
              placeholder="https://classroom.google.com/..."
              value={perfil.classroom}
              onChangeText={(t) => setPerfil({ ...perfil, classroom: t })}
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

      {/* Modal Editar Matéria */}
      <Modal visible={materiaModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>
              Editar {materiaSelecionada?.nome}
            </Text>

            <Text style={styles.label}>Conteúdos (PDFs)</Text>
            <View style={styles.pdfRow}>
              {pdfs.map((pdf, index) => (
                <View key={index} style={styles.pdfBox}>
                  <FontAwesome name="file-pdf-o" size={40} color="red" />
                  <Text style={styles.pdfNome}>{pdf}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addPdfButton} onPress={adicionarPDF}>
              <Ionicons name="add-circle-outline" size={22} color="black" />
              <Text
                style={{ marginLeft: 6, fontWeight: "500", color: "#2b4c80" }}
              >
                Adicionar PDF
              </Text>
            </TouchableOpacity>

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

      {/* Modal Adicionar Matéria */}
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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  titulo: { fontSize: 22, fontWeight: "500", marginBottom: 10 },
  cardPerfil: {
    backgroundColor: "#e8f0ff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  avatarContainer: { flexDirection: "row", alignItems: "center" },
  nome: { fontSize: 18, fontWeight: "600" },
  cargo: { color: "#2b4c80", fontSize: 13 },
  email: { fontSize: 12, color: "#444" },
  contato: { fontSize: 12, color: "#444" },

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
  subtitulo: { fontWeight: "700", color: "#2b4c80" },
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
  pdfRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  pdfBox: { alignItems: "center", width: "30%", marginVertical: 6 },
  pdfNome: {
    fontSize: 10,
    color: "#2b4c80",
    marginTop: 2,
    textAlign: "center",
  },
  addPdfButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0ff",
    borderRadius: 10,
    padding: 8,
    alignSelf: "flex-start",
  },
});
