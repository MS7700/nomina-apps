import {
  List,
  Datagrid,
  TextField,
  Edit,
  Create,
  TextInput,
  SimpleForm,
  NumberInput,
} from "react-admin";

const Validations = (values) => {
  const errors = {};
  if (!values.Descripcion || values.Descripcion === "") {
    errors.Descripcion = "La descripción es requerida.";
  }
  return errors;
};

const Filters = [
  <NumberInput label="ID" source="id" />,
  <TextInput label="Puesto" source="Descripcion" />,
];

export const PuestoList = (props) => (
  <List {...props} filters={Filters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Puesto" source="Descripcion" />
    </Datagrid>
  </List>
);

export const PuestoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm validate={Validations}>
      <TextInput disabled source="id" />
      <TextInput label="Puesto" source="Descripcion" />
    </SimpleForm>
  </Edit>
);

export const PuestoCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput label="Puesto" source="Descripcion" />
    </SimpleForm>
  </Create>
);
