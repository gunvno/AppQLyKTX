import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function ContractPdfScreen({ navigation }) {
  // Đường dẫn đến file PDF tĩnh (trên mạng hoặc local asset)
const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";


  return (
    <View style={{ flex: 1 }}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Xem văn bản hợp đồng</Text>
      </View>

      {/* WebView để hiển thị PDF */}
      <WebView
        source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1976d2',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 40, // Adjust for iOS notch
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
  },
});
