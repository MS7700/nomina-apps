import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Edit,
  Create,
  TextInput,
  SimpleForm,
  BooleanInput,
} from "react-admin";


const Validations = (values) => {
  const errors = {};
  if (!values.UserName) {
    errors.UserName = "El nombre de usuario es requerido.";
  }
  if (!values.Password) {
    errors.Password = "La contraseña es requerida.";
  }
  if (!values.Nombre) {
    errors.Nombre = "El nombre es requerido.";
  }
  if (!values.Apellido) {
    errors.Apellido = "El nombre es requerido.";
  }
  if (!values.Roles) {
    errors.Roles = "Los roles deben ser requeridos.";
  }
  if (!values.Email) {
    errors.Email = "El email es requerido.";
  }
  return errors;
};


const postFilters = [
  <TextInput source="UserName" />,
  <TextInput source="Nombre" />,
  <TextInput source="Apellido" />,
  <TextInput source="Roles" />,
  <TextInput source="Email" />,
  <BooleanInput source="Estado" />,
];

export const UsuarioList = (props) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="UserName" />
      <TextField source="Nombre" />
      <TextField source="Apellido" />
      <TextField source="Roles" />
      <TextField source="Email" />
      <BooleanField source="Estado" />
    </Datagrid>
  </List>
);

export const UsuarioEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="UserName" />
      <TextInput source="Nombre" />
      <TextInput source="Apellido" />
      <TextInput source="Roles" />
      <TextInput source="Email" />
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Edit>
);

export const UsuarioCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput source="UserName" />
      <TextInput source="Password" />
      <TextInput source="Nombre" />
      <TextInput source="Apellido" />
      <TextInput source="Roles" />
      <TextInput source="Email" />
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Create>
);
