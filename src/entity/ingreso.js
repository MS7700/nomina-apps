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
  NumberField,
  NumberInput,
} from "react-admin";

const Validations = (values) => {
  const errors = {};
  if (!values.Nombre) {
    errors.Nombre = "El nombre es requerido.";
  }
  if (!values.Cantidad) {
    errors.Cantidad = "La cantidad es requerida.";
  }
  if (values.Cantidad <= 0) {
    errors.Cantidad = "La cantidad debe ser mayor que cero.";
  }
  return errors;
};

const Filters = [
  <NumberInput label="ID" source="id" />,
  <TextInput source="Nombre" />,
  <BooleanInput label="Automático" source="Automatico" />,
  <BooleanInput source="Porcentual" />,
  <NumberInput source="Cantidad" />,
  <BooleanInput source="Estado" />,
];

export const IngresoList = (props) => (
  <List {...props} filters={Filters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Nombre" />
      <BooleanField label="Automático" source="Automatico" />
      <BooleanField source="Porcentual" />
      <NumberField source="Cantidad" />
      <BooleanField source="Estado" />
    </Datagrid>
  </List>
);

export const IngresoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm validate={Validations}>
      <TextInput source="Nombre" />
      <BooleanInput label="Automático" source="Automatico" />
      <BooleanInput source="Porcentual" />
      <NumberInput source="Cantidad" />
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Edit>
);

export const IngresoCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput source="Nombre" />
      <BooleanInput label="Automático" source="Automatico" />
      <BooleanInput source="Porcentual" />
      <NumberInput source="Cantidad" />
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Create>
);
