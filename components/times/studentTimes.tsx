import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisciplina, setSelectedDisciplina] = useState("");

  function handleCardPress(title: string) {
    setSelectedDisciplina(title);
    setModalVisible(true);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horários</Text>
          <View style={styles.profile}>
            <Ionicons name="person-circle" size={60} color="#000" />
            <Text style={styles.name}>Elikson Tavares</Text>
          </View>
          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleTitle}>Programação para Dispositivos</Text>
            <View style={styles.scheduleRow}>
              <DayBox day="Terça" code="ESW0GNA" time="20:30 - 21:20" room="E-30" />
              <DayBox day="Quinta" code="ESW0GNA" time="20:30 - 21:20" room="E-30" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engenharia de Software</Text>
          <Text style={styles.subtitle}>Disciplinas Ativas</Text>

          <View style={styles.grid}>
            <Card key="programacao" icon={<FontAwesome5 name="book" size={28} color="#000" />} title="Programação para Dispositivos" onPress={handleCardPress} />
            <Card key="gestao" icon={<MaterialIcons name="engineering" size={28} color="#000" />} title="Gestão de Projetos" onPress={handleCardPress} />
            <Card key="rede" icon={<FontAwesome5 name="network-wired" size={28} color="#000" />} title="Rede de Computadores" onPress={handleCardPress} />
            <Card key="calculo1" icon={<FontAwesome5 name="calculator" size={28} color="#000" />} title="Cálculo 1" onPress={handleCardPress} />
            <Card key="arquitetura" icon={<MaterialIcons name="architecture" size={28} color="#000" />} title="Arquitetura de Software" onPress={handleCardPress} />
            <Card key="ed" icon={<FontAwesome5 name="database" size={28} color="#000" />} title="Estrutura de Dados" onPress={handleCardPress} />
          </View>
        </View>

      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '85%' }]}>
            <Text style={styles.modalTitle}>{selectedDisciplina}</Text>

            {/* PDFs - Transformar em links de classroom */}
            <Text style={[styles.sectionTitle, { alignSelf: 'flex-start', marginTop: 8 }]}>Conteúdos</Text>
            <ScrollView horizontal contentContainerStyle={{ paddingVertical: 8 }}>
              <View style={{ flexDirection: 'row' }}>
                <ClassItem title="Sala do Classroom" />
              </View>
            </ScrollView>

            {/* Avisos */}
            <Text style={[styles.sectionTitle, { alignSelf: 'flex-start', marginTop: 8 }]}>Avisos</Text>
            <View style={styles.notice}>
              <Text style={styles.noticeText}>Hoje não haverá aula, repor-nos-emos</Text>
            </View>

            {/* Aulas repositórias */}
            <Text style={[styles.sectionTitle, { alignSelf: 'flex-start', marginTop: 12, }]}>Aulas repositórias</Text>
            <View style={{ width: '100%', marginTop: 20}}>
              <VideoItem title="aula2.yt..." />
            </View>

            <TouchableOpacity style={[styles.modalButton, { marginTop: 12 }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Card({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress: (title: string) => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(title)}>
      {icon}
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function DayBox({ day, code, time, room }: { day: string; code: string; time: string; room: string }) {
  return (
    <View style={styles.dayBox}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.dayDetail}>{code}</Text>
      <Text style={styles.dayDetail}>{time}</Text>
      <Text style={styles.dayDetail}>{room}</Text>
    </View>
  );
}

function ClassItem({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.classItem}>
      <MaterialIcons name="picture-as-pdf" size={45} color="red" />
      <Text style={styles.classText}>{title}</Text>
    </TouchableOpacity>
  );
}

function VideoItem({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.videoBox}>
      <FontAwesome5 name="play-circle" size={28} color="#000" />
      <Text style={styles.videoText}>{title}</Text>
    </TouchableOpacity>
  );
}

// styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
  },
  box: {
    backgroundColor: "#eaf0ff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  boxIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  boxTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#2b4c80",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#f9faff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2b4c80",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#4a4a4a",
    marginBottom: 10,
  },
  classItem: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  classText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#eaf0ff",
    width: "48%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
  profile: {
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#1a73e8",
    marginTop: 5,
  },
  scheduleBox: {
    backgroundColor: "#eaf0ff",
    padding: 10,
    borderRadius: 10,
  },
  scheduleTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 14,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    width: "45%",
  },
  dayText: {
    fontWeight: "bold",
    color: "#2b4c80",
  },
  dayDetail: {
    fontSize: 12,
  },
  notice: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeText: {
    fontSize: 17,
    color: "#333",
  },
  videoBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  videoText: {
    marginLeft: 8,
    color: "#333",
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2b4c80',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2b4c80',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
