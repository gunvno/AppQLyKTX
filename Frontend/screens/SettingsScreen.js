import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [theme, setTheme] = useState('light'); 
  const [fontSize, setFontSize] = useState(30);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cài đặt</Text>
      </View>

      {/* Giao diện */}
      <View style={styles.section}>
        <Text style={styles.label}>Giao diện</Text>
        <View style={styles.themeRow}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              theme === 'light' && styles.selectedTheme,
            ]}
            onPress={() => setTheme('light')}
          >
            <View style={[styles.themeIcon, { backgroundColor: '#ccc' }]} />
            <Text style={styles.themeLabel}>Sáng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              theme === 'dark' && styles.selectedTheme,
            ]}
            onPress={() => setTheme('dark')}
          >
            <View style={[styles.themeIcon, { backgroundColor: '#333' }]} />
            <Text style={styles.themeLabel}>Tối</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Font size picker */}
      <View style={styles.noidung}> 
        <Text style={styles.label}>Đổi cỡ chữ: {fontSize}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={fontSize}
          style={{ height: 60, width: 120 }}
          onValueChange={(value) => setFontSize(value)}
        >
          {[20, 25, 30, 35, 40, 45].map((size) => (
            <Picker.Item key={size} label={`${size}`} value={size} />
          ))}
        </Picker>
      </View>
      <Text style={styles.sliderLabel}>Kéo để thay đổi cỡ chữ</Text>
      <Slider
        minimumValue={20}
        maximumValue={45}
        step={1}
        value={fontSize}
        onValueChange={(value) => setFontSize(value)}
        style={{ width: '100%' }}
      />

      {/* Preview */}
      <Text style={[styles.previewText, { fontSize }]}>A</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    marginTop: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: { marginTop: 16 , paddingHorizontal: 16 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, paddingHorizontal: 8 },
  themeRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  themeOption: {
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  selectedTheme: { borderColor: '#1976D2' },
  themeIcon: { width: 50, height: 30, marginBottom: 4, borderRadius: 4 },
  themeLabel: { fontSize: 14 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 120,
  },
  sliderLabel: { fontSize: 14, color: '#444', marginBottom: 8 },
  previewText: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noidung:{
    padding: 16,
  }
});
