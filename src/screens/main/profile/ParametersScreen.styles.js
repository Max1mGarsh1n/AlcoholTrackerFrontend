import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#d3ae35',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fefffa',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#3a3a3a',
    color: '#fefffa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  genderToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#4CAF50',
  },
  genderText: {
    color: '#fefffa',
    fontSize: 16,
  },
  genderTextSelected: {
    fontWeight: 'bold',
    color: '#fefffa',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fefffa',
    fontSize: 18,
    fontWeight: '600',
  },
});
