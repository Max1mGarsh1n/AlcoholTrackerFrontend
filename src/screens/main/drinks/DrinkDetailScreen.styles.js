import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  titleInput: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#555',
    width: '80%',
    textAlign: 'center',
  },
  subtitle: {
    color: 'orange',
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    color: 'gray',
    width: 100,
    fontSize: 16,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#5a7454',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
