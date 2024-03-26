import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ passwordMismatch: false, emailMismatch: false, niceCheck: false });

  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const jojo = [
    { email: 'G1@gmail.com', password: '123' },
    { email: 'G2@gmail.com', password: '123' },
  ];

  const checkUser = () => {
    setErrors({ passwordMismatch: false, emailMismatch: false, niceCheck: false });

    if (!emailRegExp.test(email)) {
      setErrors(prevState => ({ ...prevState, emailMismatch: true }));
    } else {
      const foundUser = jojo.find((user) => user.email === email && user.password === password);

      if (foundUser) {
        setErrors(prevState => ({ ...prevState, niceCheck: true }));
      } else {
        setErrors(prevState => ({ ...prevState, passwordMismatch: true }));
      }
    }
  };

  return (
    <View style={styles.login}>
      <Text>Вход</Text>
      <View style={styles.login__authorization}>
        <Text style={{ fontSize: 18 }}>Введите почту</Text>
        <TextInput
          placeholder="Почта"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{ fontSize: 18 }}>Введите пароль</Text>
        <TextInput
          secureTextEntry
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
        />
        {errors.passwordMismatch && <Text style={styles.error}>Неправильный логин или пароль</Text>}
        {errors.emailMismatch && <Text style={styles.error}>Неправильная почта</Text>}
        {errors.niceCheck && <Text style={styles.error}>Красавчик</Text>}
        <Button title="Подтвердить" onPress={checkUser} />
        <Button title="Зарегистрировать" onPress={() => navigation.navigate('Registration')} />
      </View>
    </View>
  );
};

const RegistrationScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ passwordMismatch: false, emailMismatch: false, niceCheck: false });

  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const jojo = [
    { email: 'G1@gmail.com', password: '123' },
    { email: 'G2@gmail.com', password: '123' },
  ];

  const checkUser = () => {
    setErrors({ passwordMismatch: false, emailMismatch: false, niceCheck: false });

    if (!emailRegExp.test(email)) {
      setErrors(prevState => ({ ...prevState, emailMismatch: true }));
    } else if (password !== confirmPassword) {
      setErrors(prevState => ({ ...prevState, passwordMismatch: true }));
    } else {
      const foundUser = jojo.find((user) => user.email === email && user.password === password);

      if (foundUser) {
        setErrors(prevState => ({ ...prevState, niceCheck: true }));
      }
    }
  };

  return (
    <View style={styles.login}>
      <Text>Регистрация</Text>
      <View style={styles.login__authorization}>
        <Text style={{ fontSize: 18 }}>Введите почту</Text>
        <TextInput
          placeholder="Почта"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{ fontSize: 18 }}>Введите пароль</Text>
        <TextInput
          secureTextEntry
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
        />
        <Text style={{ fontSize: 18 }}>Подтвердите пароль</Text>
        <TextInput
          secureTextEntry
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.passwordMismatch && <Text style={styles.error}>Пароли не совпадают</Text>}
        {errors.emailMismatch && <Text style={styles.error}>Неправильная почта</Text>}
        {errors.niceCheck && <Text style={styles.error}>Красавчик</Text>}
        <Button title="Подтвердить" onPress={checkUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    marginTop: 60,
  },
  login__authorization: {},
  error: {
    fontSize: 12,
    color: "red",
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Авторизация' }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Регистрация' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;