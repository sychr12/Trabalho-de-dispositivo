import React from "react";

import { StyleSheet, View } from "react-native";
import { QrCodeSvg, plainRenderer } from "react-native-qr-svg";

const SIZE = 170;
const CONTENT = "{time: '2025-10-14 20:57:15', professorId: '1', classId: '1'}";

export default function QrCodeGenerator() {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <QrCodeSvg
          style={styles.qr}
          renderer={plainRenderer}
          value={CONTENT}
          frameSize={SIZE}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  qr: {
    padding: 15,
  },
});
