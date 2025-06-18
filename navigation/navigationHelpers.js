export const navigateToMainApp = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }],
  });
};

export const navigateToAuth = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Auth' }],
  });
};