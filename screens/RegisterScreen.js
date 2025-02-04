import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Ім\'я є обов\'язковим'),
        email: Yup.string().email('Некоректний email').required('Email є обов\'язковим'),
        password: Yup.string().min(6, 'Пароль має бути не менше 6 символів').required('Пароль є обов\'язковим'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Паролі мають співпадати')
          .required('Підтвердження паролю є обов\'язковим'),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(addUser({ name: values.name, email: values.email, password: values.password }));
        resetForm();
        navigation.navigate('Login');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Ім'я:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
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
          <Text>Підтвердження паролю:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
          <Button onPress={handleSubmit} title="Зареєструватися" />
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

export default RegisterScreen;