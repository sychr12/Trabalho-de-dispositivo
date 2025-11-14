import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

  const [abaSelecionada, setAbaSelecionada] = useState("info");
  const [novoNome, setNovoNome] = useState("");
  const [classroomLink, setClassroomLink] = useState("");
  const [avisoTexto, setAvisoTexto] = useState("");

  const [novaMateria, setNovaMateria] = useState("");
  const [materiaSelecionada, setMateriaSelecionada] = useState<any>(null);

  const [perfil, setPerfil] = useState({
    nome: "Elikson Tavares",
    email: "elikson.tavares@ifam.edu.br",
    contato: "+55 (92) 99999-9999",
  });

  const abrirEditarMateria = (materia: any) => {
    setMateriaSelecionada(materia);
    setAbaSelecionada("info");
    setNovoNome(materia.nome);
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

      {/* Modal editar perfil */}
      <Modal visible={perfilModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitulo}>Editar Perfil</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={perfil.nome}
              onChangeText={(txt) => setPerfil({ ...perfil, nome: txt })}
              placeholder="Nome do professor..."
            />

            <Text style={styles.label}>Email institucional</Text>
            <TextInput
              style={styles.input}
              value={perfil.email}
              onChangeText={(txt) => setPerfil({ ...perfil, email: txt })}
              autoCapitalize="none"
              placeholder="email@ifam.edu.br"
            />

            <Text style={styles.label}>Contato</Text>
            <TextInput
              style={styles.input}
              value={perfil.contato}
              onChangeText={(txt) => setPerfil({ ...perfil, contato: txt })}
              placeholder="(00) 00000-0000"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setPerfilModal(false)}
                style={[styles.botaoEditarMateria, { flex: 1, marginRight: 6 }]}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPerfilModal(false)}
                style={[styles.botaoEditarMateria, { flex: 1, marginLeft: 6 }]}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* Modal editar materia */}
      <Modal visible={materiaModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>
              Editar {materiaSelecionada?.nome}
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  abaSelecionada === "info" && styles.tabAtiva,
                ]}
                onPress={() => setAbaSelecionada("info")}
              >
                <Text style={styles.tabTexto}>Informações</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  abaSelecionada === "aviso" && styles.tabAtiva,
                ]}
                onPress={() => setAbaSelecionada("aviso")}
              >
                <Text style={styles.tabTexto}>Avisos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  abaSelecionada === "classroom" && styles.tabAtiva,
                ]}
                onPress={() => setAbaSelecionada("classroom")}
              >
                <Text style={styles.tabTexto}>Classroom</Text>
              </TouchableOpacity>
            </View>

            {abaSelecionada === "info" && (
              <View>
                <Text style={styles.label}>Nome da Matéria</Text>
                <TextInput
                  style={styles.input}
                  value={novoNome}
                  onChangeText={setNovoNome}
                  placeholder="Editar nome..."
                />
              </View>
            )}

            {abaSelecionada === "aviso" && (
              <View>
                <Text style={styles.label}>Avisos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escreva um aviso..."
                  value={avisoTexto}
                  onChangeText={setAvisoTexto}
                />
              </View>
            )}

            {abaSelecionada === "classroom" && (
              <View>
                <Text style={styles.label}>Link do Classroom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cole o link do Classroom aqui..."
                  value={classroomLink}
                  onChangeText={setClassroomLink}
                  autoCapitalize="none"
                />

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 8 }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (classroomLink.trim()) Linking.openURL(classroomLink);
                    }}
                    style={styles.classroomIcon}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name="google-classroom"
                      size={24}
                      color="#1a73e8"
                    />
                    <Text style={styles.linkClassroom}>Abrir Classroom</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
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

  label: {
    color: "#2b4c80",
    fontWeight: "600",
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f5f7fb",
    borderRadius: 10,
    padding: 8,
    marginTop: 4,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#aaa",
  },

  tabAtiva: {
    borderColor: "#1a73e8",
  },

  tabTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a73e8",
  },
});
