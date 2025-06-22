import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#555',
  },
  hintText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    fontStyle: 'italic',
  },
  calculateButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});