import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContractPdfScreen({ navigation }) {
  // Đường dẫn đến ảnh trong thư mục assets
  const imageSource = require('../../assets/495268653_1043920637882496_6126281109086339459_n.png'); // Thay bằng đường dẫn ảnh của bạn

  return (
    <View style={{ flex: 1 }}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Xem văn bản hợp đồng</Text>
      </View>

      {/* Hiển thị ảnh */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3366FF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 50, // Adjust for iOS notch
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});