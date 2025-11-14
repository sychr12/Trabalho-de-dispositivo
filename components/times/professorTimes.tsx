// Ícones usados nos cards
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// Hooks e componentes básicos do React Native
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Componente principal
export default function HomeProf() {
  // Lista de matérias cadastradas
  const [materias, setMaterias] = useState([
    { id: 1, nome: "Cálculo 3", icone: "microscope", sala: "Bloco A - 201" },
    {
      id: 2,
      nome: "Arquitetura de Software",
      icone: "hammer",
      sala: "Bloco B - 101",
    },
    { id: 3, nome: "Projeto 3", icone: "book-open", sala: "Lab 3" },
    {
      id: 4,
      nome: "Engenharia de Requisitos",
      icone: "project-diagram",
      sala: "Bloco C - 12",
    },
    {
      id: 5,
      nome: "Banco de Dados Avançado",
      icone: "database",
      sala: "Lab BD",
    },
    { id: 6, nome: "Programação Web", icone: "code", sala: "Lab Web" },
  ]);

  // Estados dos modais
  const [perfilModal, setPerfilModal] = useState(false);
  const [materiaModal, setMateriaModal] = useState(false);
  const [addMateriaModal, setAddMateriaModal] = useState(false);

  // Estados internos de edição
  const [abaSelecionada, setAbaSelecionada] = useState("info");
  const [novoNome, setNovoNome] = useState("");
  const [novaSala, setNovaSala] = useState("");
  const [classroomLink, setClassroomLink] = useState("");
  const [avisoTexto, setAvisoTexto] = useState("");

  const [novaMateria, setNovaMateria] = useState("");
  const [materiaSelecionada, setMateriaSelecionada] = useState<any>(null);

  // Dados do perfil
  const [perfil, setPerfil] = useState({
    nome: "Elikson Tavares",
    email: "elikson.tavares@ifam.edu.br",
    contato: "+55 (92) 99999-9999",
  });

  // Criando animações independentes para cada card
  const animations = useRef(
    materias.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
      scale: new Animated.Value(0.9),
    }))
  ).current;

  // Animação de entrada dos cards
  useEffect(() => {
    materias.forEach((_, index) => {
      Animated.parallel([
        Animated.timing(animations[index].opacity, {
          toValue: 1,
          duration: 450,
          delay: index * 120,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index].translateY, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          delay: index * 120,
          useNativeDriver: true,
        }),
        Animated.spring(animations[index].scale, {
          toValue: 1,
          speed: 2,
          bounciness: 5,
          delay: index * 120,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [materias]);

  // Abre modal para editar matéria
  const abrirEditarMateria = (materia: any) => {
    setMateriaSelecionada(materia);
    setAbaSelecionada("info");
    setNovoNome(materia.nome);
    setNovaSala(materia.sala || "");
    setMateriaModal(true);
  };

  // Salva alterações de matéria
  const salvarMateria = () => {
    setMaterias((prev) =>
      prev.map((m) =>
        m.id === materiaSelecionada.id
          ? { ...m, nome: novoNome, sala: novaSala }
          : m
      )
    );
    setMateriaModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* CARD DO PERFIL */}
      <Text style={styles.titulo}></Text>

      <View style={styles.cardPerfil}>
        <Text style={styles.titulo}>Perfil</Text>

        {/* Avatar e informações */}
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="black" />

          {/* Informações do professor */}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nome}>{perfil.nome}</Text>
            <Text style={styles.cargo}>Professor de Dispositivos Móveis</Text>
            <Text style={styles.email}>{perfil.email}</Text>
            <Text style={styles.contato}>{perfil.contato}</Text>

            {/* Botão editar perfil */}
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => setPerfilModal(true)}
            >
              <Text style={styles.textoBotao}>editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* CARD DAS MATÉRIAS */}
      <View style={styles.cardMaterias}>
        <View style={styles.headerMaterias}>
          <Text style={styles.subtitulo}>Disciplinas do Professor</Text>
        </View>

        {/* Grade de matérias */}
        <View style={styles.grid}>
          {materias.map((materia, index) => {
            const anim = animations[index];
            return (
              <Animated.View
                key={materia.id}
                style={{
                  opacity: anim.opacity,
                  transform: [
                    { translateY: anim.translateY },
                    { scale: anim.scale },
                  ],
                }}
              >
                {/* Box de cada matéria */}
                <View style={styles.materiaBox}>
                  <FontAwesome5 name={materia.icone} size={40} color="black" />
                  <Text style={styles.materiaNome}>{materia.nome}</Text>
                  <Text style={{ fontSize: 11, marginTop: 3 }}>
                    Sala: {materia.sala || "—"}
                  </Text>

                  {/* Botão editar matéria */}
                  <TouchableOpacity
                    style={styles.botaoEditarMateria}
                    onPress={() => abrirEditarMateria(materia)}
                  >
                    <Text style={styles.textoBotao}>editar</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* MODAL EDITAR PERFIL */}
      <Modal visible={perfilModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {/* Botão fechar */}
            <TouchableOpacity
              style={styles.fecharX}
              onPress={() => setPerfilModal(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.modalTitulo}>Editar Perfil</Text>

            {/* Campos */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={perfil.nome}
              onChangeText={(txt) => setPerfil({ ...perfil, nome: txt })}
            />

            <Text style={styles.label}>Email institucional</Text>
            <TextInput
              style={styles.input}
              value={perfil.email}
              onChangeText={(txt) => setPerfil({ ...perfil, email: txt })}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Contato</Text>
            <TextInput
              style={styles.input}
              value={perfil.contato}
              onChangeText={(txt) => setPerfil({ ...perfil, contato: txt })}
            />

            {/* Botões do modal */}
            <View style={styles.botoesLinha}>
              <TouchableOpacity
                onPress={() => setPerfilModal(false)}
                style={styles.botaoEditarMateria}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPerfilModal(false)}
                style={styles.botaoEditarMateria}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL EDITAR MATÉRIA */}
      <Modal visible={materiaModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {/* Botão fechar */}
            <TouchableOpacity
              style={styles.fecharX}
              onPress={() => setMateriaModal(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Título com nome da matéria */}
            <Text style={styles.modalTitulo}>
              Editar {materiaSelecionada?.nome}
            </Text>

            {/* Abas (Tabs) */}
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              {/* Aba INFO */}
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  abaSelecionada === "info" && styles.tabAtiva,
                ]}
                onPress={() => setAbaSelecionada("info")}
              >
                <Text style={styles.tabTexto}>Informações</Text>
              </TouchableOpacity>

              {/* Aba AVISO */}
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  abaSelecionada === "aviso" && styles.tabAtiva,
                  { position: "relative" },
                ]}
                onPress={() => setAbaSelecionada("aviso")}
              >
                <Text style={styles.tabTexto}>Avisos</Text>

                {/* Pontinho vermelho de notificação */}
                {avisoTexto.trim() !== "" && (
                  <View style={styles.notificationDot} />
                )}
              </TouchableOpacity>

              {/* Aba CLASSROOM */}
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

            {/* CONTEÚDO DA ABA INFO */}
            {abaSelecionada === "info" && (
              <View>
                <Text style={styles.label}>Nome da Matéria</Text>
                <TextInput
                  style={styles.input}
                  value={novoNome}
                  onChangeText={setNovoNome}
                />

                <Text style={styles.label}>Sala da Disciplina</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Bloco B — Sala 12"
                  value={novaSala}
                  onChangeText={setNovaSala}
                />
              </View>
            )}

            {/* CONTEÚDO DA ABA AVISO */}
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

            {/* CONTEÚDO DA ABA CLASSROOM */}
            {abaSelecionada === "classroom" && (
              <View>
                <Text style={styles.label}>Link do Classroom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cole o link aqui..."
                  value={classroomLink}
                  onChangeText={setClassroomLink}
                  autoCapitalize="none"
                />

                {/* Botão abrir link */}
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

            {/* Botões salvar/cancelar */}
            <View style={styles.botoesLinha}>
              <TouchableOpacity
                onPress={() => setMateriaModal(false)}
                style={styles.botaoEditarMateria}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={salvarMateria}
                style={styles.botaoEditarMateria}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ---------------------------------------------------
   ESTILOS DO COMPONENTE
--------------------------------------------------- */

const styles = StyleSheet.create({
  // Estrutura principal da tela
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  // Títulos gerais
  titulo: {
    fontSize: 21,
    fontWeight: "600",
    marginBottom: 10,
    color: "#2b4c80",
  },
  subtitulo: { fontSize: 21, fontWeight: "600", color: "#2b4c80" },

  // Card do perfil
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

  // Icone classroom
  classroomIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
  },

  // Link dentro do Classroom
  linkClassroom: {
    color: "#1a73e8",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "600",
  },

  // Botão "editar"
  botaoEditar: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  textoBotao: { color: "#2b4c80", fontWeight: "500" },

  // Card de matérias
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

  // Layout em grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  materiaNome: {
    marginTop: 6,
    fontSize: 12,
    color: "#2b4c80",
    textAlign: "center",
  },

  // Fundo do modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  // Caixa do modal
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 450,
    alignSelf: "center",
  },

  // Botão fechar no canto
  fecharX: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2b4c80",
    marginBottom: 10,
    marginTop: 40,
  },

  label: {
    color: "#2b4c80",
    fontWeight: "600",
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f1f4fa",
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    fontSize: 15,
  },

  // Tabs
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginTop: 20,
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

  // Botões inferior dos modais
  botoesLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 10,
  },

  // Bolinha vermelha
  notificationDot: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 14,
    height: 14,
    backgroundColor: "red",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  // Botão editar matéria — separado e organizado
  botaoEditarMateria: {
    backgroundColor: "#e8f0ff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 12, // separa melhor do conteúdo acima
    alignSelf: "center", // deixa o botão alinhado no card
  },

  // Card de matéria — mais espaço interno
  materiaBox: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: 125,
    height: 185, // mais altura para o botão
    paddingVertical: 20,
    paddingHorizontal: 12,
    margin: 15,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
