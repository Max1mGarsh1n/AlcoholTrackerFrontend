import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d3ae35',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailRow: {
    marginBottom: 16,
  },
  label: {
    color: '#fefffa',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    color: '#d3ae35',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
