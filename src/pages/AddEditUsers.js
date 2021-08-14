// material
import { Card, Stack, Container, Button, Typography, TextField, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
// components
import useQuery from '../utils/useQuery';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import firebase from '../firebase';
import { userDataGet } from '../utils/cache';

const UserSchemaValidations = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  avatarUrl: Yup.string().required('Required'),
  role: Yup.number().required('Required'),
  password: Yup.string().required('Required')
});

export default function AddEditUsers() {
  const location = useLocation();
  const queryString = useQuery(location.search);
  const act = queryString.get('act');
  const id = queryString.get('id');
  const [users, setUsers] = useState(userDataGet() || []);

  useEffect(() => {
    if (act === 'Edit') {
      firebase
        .firestore()
        .collection('users')
        .onSnapshot((snapshot) => {
          const newUsers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(newUsers);
        });
    }
  }, [act]);

  const filteredUsers = users.filter((user) => id === user.id);

  const handleSubmit = (values) => {
    if (act === 'Add') {
      firebase.firestore().collection('users').add({
        name: values.name,
        email: values.email,
        avatarUrl: values.avatarUrl,
        role: values.role,
        password: values.password,
        status: values.status
      });
    } else {
      firebase.firestore().collection('users').doc(filteredUsers[0].id).set({
        name: values?.name,
        email: values?.email,
        avatarUrl: values?.avatarUrl,
        role: values?.role,
        password: values?.password,
        status: values?.status
      });
    }
  };

  console.log(filteredUsers);

  return (
    <Page title="Users | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {act} Users
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <Formik
              initialValues={
                filteredUsers[0] || {
                  name: '',
                  email: '',
                  avatarUrl: '',
                  role: 1,
                  password: '',
                  status: ''
                }
              }
              validationSchema={UserSchemaValidations}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleSubmit(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} style={{ padding: 20, textAlign: 'center' }}>
                  <Grid container justifyContent="space-between" spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        error={errors?.email && true}
                        required
                        style={{ marginBottom: 15 }}
                        fullWidth
                        helperText={errors?.email}
                        onChange={handleChange}
                        value={values.email}
                        id="email"
                        label="Email"
                      />
                      <TextField
                        required
                        error={errors?.name && true}
                        style={{ marginBottom: 15 }}
                        fullWidth
                        helperText={errors?.name}
                        onChange={handleChange}
                        value={values.name}
                        id="name"
                        label="Name"
                      />
                      <TextField
                        required
                        error={errors?.avatarUrl && true}
                        style={{ marginBottom: 15 }}
                        fullWidth
                        helperText={errors?.avatarUrl}
                        onChange={handleChange}
                        multiline
                        maxRows={3}
                        value={values.avatarUrl}
                        id="avatarUrl"
                        label="Avatar Url"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        error={errors?.password && true}
                        style={{ marginBottom: 15 }}
                        fullWidth
                        helperText={errors?.password}
                        onChange={handleChange}
                        value={values.password}
                        type="password"
                        id="password"
                        label="Password"
                      />
                      <TextField
                        style={{ marginBottom: 15 }}
                        fullWidth
                        onChange={handleChange}
                        value={values.status}
                        id="status"
                        label="Status"
                      />
                      <TextField
                        required
                        error={errors?.role && true}
                        style={{ marginBottom: 15 }}
                        fullWidth
                        helperText={errors?.role}
                        onChange={handleChange}
                        value={values.role}
                        type="nummber"
                        id="role"
                        label="Role"
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" disabled={isSubmitting}>
                    {act === 'Add' ? 'Submit' : 'Save Changes'}
                  </Button>
                </form>
              )}
            </Formik>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
