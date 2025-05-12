import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function UnRegisteredScreen({ navigation, route }) {
  const { user } = route.params; // Nhận thông tin người dùng từ route.params
  console.log('Thông tin người dùng:', user); // In thông tin người dùng ra console để kiểm tra

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top buttons row */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity 
          style={styles.topButton} 
          onPress={() => navigation.navigate('Contracts')}
        >
          <Ionicons name="document-text-outline" size={24} color="#2962FF" style={styles.topButtonIcon} />
          <Text style={styles.topButtonText}>Hợp đồng</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.topButton} 
          onPress={() => navigation.navigate('Requests')}
        >
          <Ionicons name="create-outline" size={24} color="#2962FF" style={styles.topButtonIcon} />
          <Text style={styles.topButtonText}>Yêu cầu</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main button */}
      <View style={styles.mainButtonContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('DormRegister', { user })}
        >
          <View style={styles.houseIconContainer}>
            <Ionicons name="home-outline" size={40} color="#2962FF" />
            <Ionicons name="add" size={20} color="#2962FF" style={styles.plusIcon} />
          </View>
          <Text style={styles.mainButtonText}>ĐĂNG KÝ Ở KÝ TÚC XÁ</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]} 
          onPress={() => {}}
        >
          <Ionicons name="home" size={24} color="#2962FF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Documents')}
        >
          <Ionicons name="document-text-outline" size={24} color="#757575" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  topButton: {
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  topButtonIcon: {
    marginBottom: 8,
  },
  topButtonText: {
    fontSize: 12,
  },
  mainButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  mainButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '80%',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  houseIconContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseIcon: {
    fontSize: 40,
    color: '#2962FF',
  },
  plusIcon: {
    fontSize: 20,
    color: '#2962FF',
    position: 'absolute',
    right: 0,
    bottom: 5,
    fontWeight: 'bold',
  },
  mainButtonText: {
    color: '#2962FF',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#2962FF',
  },
  navIcon: {
    fontSize: 24,
  },
});