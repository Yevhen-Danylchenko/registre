import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../slices/userSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Некоректний email').required("Email є обов'язковим"),
        password: Yup.string().min(6, 'Пароль має бути не менше 6 символів').required("Пароль є обов'язковим"),
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        console.log("Logging in with:", values); // Додаємо це для перевірки введених даних
        const user = users.find((user) => user.email === values.email && user.password === values.password);
        if (user) {
          dispatch(setCurrentUser(user));
        } else {
          setErrors({ email: 'Некоректний email або пароль' });
        }
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
          <Text>Пароль:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
          <Button onPress={handleSubmit} title="Логін" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginVertical: 8,
  },
  error: {
    color: 'red',
  },
});

export default LoginScreen;