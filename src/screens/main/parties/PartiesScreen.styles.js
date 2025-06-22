import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  feedbackBanner: {
    backgroundColor: '#ffeb3b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '500',
  },
  newPartyButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  partyItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  partyDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  partyDescription: {
    color: '#666',
  },
});