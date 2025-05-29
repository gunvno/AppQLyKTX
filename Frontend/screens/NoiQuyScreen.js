import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function NoiQuyScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nội quy</Text>
            </View>
        </View>
      <Text style={styles.title}>Nội Quy Ký Túc Xá</Text>
      <Image
        source={require('../../assets/494823013_1046775696893206_8139132804052450743_n.png')} // Thay đường dẫn bằng ảnh trong thư mục assets
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.note}>
        Lưu ý: Vui lòng tuân thủ các nội quy để đảm bảo môi trường sống văn minh và an toàn.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
  },
  note: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 16,
  },
  header: { backgroundColor: '#2E6CF6', padding: 16 },
  headerTitle: { color: 'white', fontSize: 20, marginLeft: 16, fontWeight: 'bold' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 50, // Adjust for iOS notch
  },
});