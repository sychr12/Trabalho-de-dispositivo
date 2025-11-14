// Ícones usados nos cards e na interface
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

// Hooks e utilidades do React
import React, { useEffect, useRef, useState } from "react";

// Componentes nativos e animação
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Banco local com disciplinas e horários
const DISCIPLINAS: any = {
  "Programação para Dispositivos": {
    professor: "Elikson Tavares",
    horarios: [
      { day: "Terça", code: "ESW0GNA", time: "20:30 - 21:20", room: "E-30" },
      { day: "Quinta", code: "ESW0GNA", time: "20:30 - 21:20", room: "E-30" },
    ],
  },
  "Gestão de Projetos": {
    professor: "Patrícia Alencar",
    horarios: [
      { day: "Segunda", code: "GPL0001", time: "19:00 - 21:00", room: "C-12" },
      { day: "Quarta", code: "GPL0001", time: "19:00 - 21:00", room: "C-12" },
    ],
  },
  "Rede de Computadores": {
    professor: "Bruno Araújo",
    horarios: [
      { day: "Segunda", code: "RED123", time: "20:30 - 21:20", room: "B-22" },
    ],
  },
  "Cálculo 1": {
    professor: "Fabrício Menezes",
    horarios: [
      { day: "Terça", code: "CAL001", time: "19:00 - 20:40", room: "A-10" },
    ],
  },
  "Arquitetura de Software": {
    professor: "Ana Clara Borges",
    horarios: [
      { day: "Quinta", code: "ARQ500", time: "19:00 - 20:40", room: "Lab 2" },
    ],
  },
  "Estrutura de Dados": {
    professor: "Sergio Cleger",
    horarios: [
      { day: "Sexta", code: "ED2024", time: "19:00 - 20:40", room: "Lab 5" },
    ],
  },
};

// Tela principal
export default function Home() {
  // Guarda a disciplina selecionada
  const [selectedDisciplina, setSelectedDisciplina] = useState(
    "Programação para Dispositivos"
  );

  // Valores animados para fade, movimento e escala
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animação ao tocar em um card de disciplina
  function handleCardPress(title: string) {
    // Animação de saída
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Atualiza disciplina exibida
      setSelectedDisciplina(title);

      // Animação de retorno
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          speed: 1.8,
          bounciness: 6,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }

  // Dados da disciplina selecionada
  const professorAtual = DISCIPLINAS[selectedDisciplina].professor;
  const horariosAtuais = DISCIPLINAS[selectedDisciplina].horarios;

  return (
    <View style={styles.screen}>
      {/* Scroll geral da página */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Bloco de horários da disciplina */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horários</Text>

          {/* Perfil do professor atual */}
          <View style={styles.profile}>
            <Ionicons name="person-circle" size={60} color="#000" />
            <Text style={styles.name}>{professorAtual}</Text>
          </View>

          {/* Caixa animada que mostra horários */}
          <Animated.View
            style={[
              styles.scheduleBox,
              {
                opacity: fadeAnim,
                transform: [{ translateY }, { scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.scheduleTitle}>{selectedDisciplina}</Text>

            {/* Linha com os dias/horários */}
            <View style={styles.scheduleRow}>
              {horariosAtuais.map((h: any, i: number) => (
                <DayBox
                  key={i}
                  day={h.day}
                  code={h.code}
                  time={h.time}
                  room={h.room}
                />
              ))}
            </View>
          </Animated.View>
        </View>

        {/* Bloco com listagem de cards de disciplinas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engenharia de Software</Text>
          <Text style={styles.subtitle}>Disciplinas Ativas</Text>

          {/* Grade dos cards */}
          <View style={styles.grid}>
            <Card
              index={0}
              showNotification
              icon={<FontAwesome5 name="book" size={28} color="#000" />}
              title="Programação para Dispositivos"
              onPress={handleCardPress}
            />

            <Card
              index={1}
              icon={<MaterialIcons name="engineering" size={28} color="#000" />}
              title="Gestão de Projetos"
              onPress={handleCardPress}
            />

            <Card
              index={2}
              icon={<FontAwesome5 name="network-wired" size={28} color="#000" />}
              title="Rede de Computadores"
              onPress={handleCardPress}
            />

            <Card
              index={3}
              icon={<FontAwesome5 name="calculator" size={28} color="#000" />}
              title="Cálculo 1"
              onPress={handleCardPress}
            />

            <Card
              index={4}
              icon={<MaterialIcons name="architecture" size={28} color="#000" />}
              title="Arquitetura de Software"
              onPress={handleCardPress}
            />

            <Card
              index={5}
              icon={<FontAwesome5 name="database" size={28} color="#000" />}
              title="Estrutura de Dados"
              onPress={handleCardPress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Componente de card animado
function Card({
  icon,
  title,
  onPress,
  index,
  showNotification,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: (title: string) => void;
  index: number;
  showNotification?: boolean;
}) {
  // Valores animados para entrada dos cards
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  // Animação de aparecimento ao montar
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay: index * 130,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 380,
        delay: index * 130,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 2,
        bounciness: 5,
        delay: index * 130,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
        width: "48%",
      }}
    >
      {/* Botão do card */}
      <TouchableOpacity style={styles.card} onPress={() => onPress(title)}>
        
        {/* Indicador opcional de notificação */}
        {showNotification && <View style={styles.notificationDot} />}

        {icon}
        <Text style={styles.cardText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Caixa de dia/horário da disciplina
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

// Estilos visuais
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f4fa", // fundo geral da tela
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#264a7d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#e9efff",
    width: "100%",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 12,
    height: 12,
    backgroundColor: "red",
    borderRadius: 6,
  },

  cardText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    color: "#1f1f1f",
    fontWeight: "500",
  },
  profile: {
    alignItems: "center",
    marginBottom: 18,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 6,
    color: "#1e2a38",
  },
  scheduleBox: {
    backgroundColor: "#e9efff",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  scheduleTitle: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 12,
    fontSize: 15,
    color: "#334b7a",
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    width: "46%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  dayText: {
    fontWeight: "700",
    color: "#2b4c80",
    marginBottom: 4,
  },
  dayDetail: {
    fontSize: 12,
    color: "#444",
  },
});
