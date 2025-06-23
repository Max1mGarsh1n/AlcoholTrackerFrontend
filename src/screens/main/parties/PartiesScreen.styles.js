import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Главный контейнер, занимает весь экран
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  // Контейнер для центрирования контента (загрузка, ошибка)
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  // ВЕРХНЯЯ ЧАСТЬ ЭКРАНА: занимает всё свободное место и центрирует кнопку
  topContainer: {
    flex: 1, // <-- Самое важное: заставляет этот блок расширяться
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  newPartyButton: {
    backgroundColor: '#5a7454',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12, // Увеличим радиус для более приятного вида
    alignItems: 'center',
    width: '90%', // Сделаем немного шире
    elevation: 4, // Добавим тень
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fefffa',
    fontSize: 18, // Увеличим шрифт
    fontWeight: '600',
  },
  // НИЖНЯЯ ЧАСТЬ ЭКРАНА: контейнер для истории с фиксированной высотой
  historyContainer: {
    height: '50%', // <-- Самое важное: задает фиксированную высоту
    backgroundColor: '#222222', // Слегка другой фон для визуального разделения
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  historyTitle: {
    fontSize: 20, // Увеличим заголовок
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d3ae35',
    textAlign: 'center',
  },
  partyItem: {
    backgroundColor: '#2f2f2f',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  partyDate: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fefffa',
    fontSize: 16,
  },
  partyDescription: {
    color: '#d3ae35',
    fontSize: 14,
  },
  emptyText: {
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#5a7454',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fefffa',
    fontSize: 16,
  },
});