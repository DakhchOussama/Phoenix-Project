import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

// Define the type for User data
interface User {
  id: number;
  name: string;
  email: string;
}

const API_BASE_URL = 'http://10.32.101.67:3000';
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});

export default App;
