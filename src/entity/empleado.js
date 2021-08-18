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
  ReferenceField,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import validateDominicanId from "validacion-cedula-dominicana";

const Filters = [
  <TextInput label="Cédula" source="Cedula" />,
  <TextInput label="Nombre" source="Nombre" />,
  <NumberInput label="Salario" source="Salario" />,
  <ReferenceInput
    label="Departamento"
    source="DepartamentoID"
    reference="Departamento"
  >
    <SelectInput label="Departamento" optionText="Descripcion" />
  </ReferenceInput>,
  <ReferenceInput label="Puesto" source="PuestoID" reference="Puesto">
    <SelectInput label="Puesto" optionText="Descripcion" />
  </ReferenceInput>,
  <ReferenceInput label="Nomina" source="TipoNominaID" reference="TipoNomina">
    <SelectInput label="Nomina" optionText="Descripcion" />
  </ReferenceInput>,
  <BooleanInput source="Estado" />,
];

const Validations = (values) => {
  const errors = {};
  if (!values.Cedula) {
    errors.Cedula = "La cédula es requerida.";
  }
  if (!validateDominicanId(values.Cedula)) {
    errors.Cedula = "La cédula es inválida.";
  }
  if (!values.Nombre) {
    errors.Nombre = "El nombre es requerido";
  }
  const regexNombre =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  if (!regexNombre.test(values.Nombre)) {
    errors.Nombre = "El nombre es inválido";
  }
  if (!values.Salario) {
    errors.Salario = "El salario es requerido";
  }
  if (values.Salario <= 0) {
    errors.Salario = "El salario es inválido";
  }
  if (!values.DepartamentoID) {
    errors.DepartamentoID = "El departamento es requerido";
  }
  if (!values.PuestoID) {
    errors.PuestoID = "El puesto es requerido";
  }
  if (!values.TipoNominaID) {
    errors.TipoNominaID = "El tipo de nómina es requerido";
  }
  return errors;
};

export const EmpleadoList = (props) => (
  <List {...props} filters={Filters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField label="Cédula" source="Cedula" />
      <TextField source="Nombre" />
      <NumberField source="Salario" />
      <ReferenceField
        label="Departamento"
        source="DepartamentoID"
        reference="Departamento"
      >
        <TextField label="Departamento" source="Descripcion" />
      </ReferenceField>
      <ReferenceField label="Puesto" source="PuestoID" reference="Puesto">
        <TextField label="Puesto" source="Descripcion" />
      </ReferenceField>
      <ReferenceField
        label="Nomina"
        source="TipoNominaID"
        reference="TipoNomina"
      >
        <TextField label="Nomina" source="Descripcion" />
      </ReferenceField>
      <BooleanField source="Estado" />
    </Datagrid>
  </List>
);

export const EmpleadoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm validate={Validations}>
      <TextInput label="Cédula" source="Cedula" />
      <TextInput source="Nombre" />
      <NumberInput source="Salario" />
      <ReferenceInput
        label="Departamento"
        source="DepartamentoID"
        reference="Departamento"
      >
        <SelectInput label="Departamento" optionText="Descripcion" />
      </ReferenceInput>
      <ReferenceInput label="Puesto" source="PuestoID" reference="Puesto">
        <SelectInput label="Puesto" optionText="Descripcion" />
      </ReferenceInput>
      <ReferenceInput
        label="Nomina"
        source="TipoNominaID"
        reference="TipoNomina"
      >
        <SelectInput label="Nomina" optionText="Descripcion" />
      </ReferenceInput>
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Edit>
);

export const EmpleadoCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <TextInput label="Cédula" source="Cedula" />
      <TextInput source="Nombre" />
      <NumberInput source="Salario" />
      <ReferenceInput
        label="Departamento"
        source="DepartamentoID"
        reference="Departamento"
      >
        <SelectInput label="Departamento" optionText="Descripcion" />
      </ReferenceInput>
      <ReferenceInput label="Puesto" source="PuestoID" reference="Puesto">
        <SelectInput label="Puesto" optionText="Descripcion" />
      </ReferenceInput>
      <ReferenceInput
        label="Nomina"
        source="TipoNominaID"
        reference="TipoNomina"
      >
        <SelectInput label="Nomina" optionText="Descripcion" />
      </ReferenceInput>
      <BooleanInput source="Estado" />
    </SimpleForm>
  </Create>
);
