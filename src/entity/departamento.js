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
  <TextInput label="Departamento" source="Descripcion" />,
];

export const DepartamentoList = (props) => (
  <List {...props} filters={Filters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Departamento" source="Descripcion" />
    </Datagrid>
  </List>
);

export const DepartamentoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm validate={Validations}>
      <TextInput disabled source="id" />
      <TextInput label="Departamento" source="Descripcion" />
    </SimpleForm>
  </Edit>
);

export const DepartamentoCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput label="Departamento" source="Descripcion" />
    </SimpleForm>
  </Create>
);
