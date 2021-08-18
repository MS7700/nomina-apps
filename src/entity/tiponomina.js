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
  <TextInput label="Tipo de Nómina" source="Descripcion" />,
];

export const TipoNominaList = (props) => (
  <List {...props} filters={Filters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Tipo de Nómina" source="Descripcion" />
    </Datagrid>
  </List>
);

export const TipoNominaEdit = (props) => (
  <Edit {...props}>
    <SimpleForm validate={Validations}>
      <TextInput disabled source="id" />
      <TextInput label="Tipo de Nómina" source="Descripcion" />
    </SimpleForm>
  </Edit>
);

export const TipoNominaCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput label="Tipo de Nómina" source="Descripcion" />
    </SimpleForm>
  </Create>
);
