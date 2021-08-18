import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Create,
  SimpleForm,
  NumberField,
  ReferenceField,
  DateField,
  DateInput,
  TextInput,
  Show,
  NumberInput,
  BooleanInput,
  DeleteButton,
  ShowButton,
} from "react-admin";

import { makeStyles } from "@material-ui/core/styles";

import { EnviarDeleteActions } from "../components";

import { BoxedShowLayout, RaBox } from "ra-compact-ui";

const Validations = (values) => {
  const errors = {};
  if (!values.Fecha) {
    errors.Fecha = "La fecha es requerida.";
  }
  if (!values.Descripcion) {
    errors.Descripcion = "La descripción es requerida.";
  }
  return errors;
};

const Filters = [
  <NumberInput label="id" source="ContabilidadID" />,
  <DateInput source="FechaInicial" />,
  <DateInput source="FechaFinal" />,
  <DateInput source="Fecha" />,
  <TextInput label="Descripción" source="Descripción" />,
  <NumberInput label="Monto" source="Monto" />,
  <BooleanInput source="Contabilizado" />,
];

export const AsientoContableList = (props) => (
  <List {...props} filters={Filters} sort={{ field: "Fecha", order: "DESC" }}>
    <Datagrid rowClick="show" >
      <TextField label="id" source="ContabilidadID" />
      <DateField source="Fecha" />
      <TextField label="Descripción" source="Descripcion" />
      <NumberField source="Auxiliar" />
      <ReferenceField
        label="Cuenta débito"
        source="Cuentadb"
        reference="Cuenta"
      >
        <TextField source="Descripcion" />
      </ReferenceField>
      <ReferenceField
        label="Cuenta crédito"
        source="Cuentacr"
        reference="Cuenta"
      >
        <TextField source="Descripcion" />
      </ReferenceField>
      <NumberField source="Monto" />
      <BooleanField source="Contabilizado" />
      <TextField source="Estado" />
    </Datagrid>
  </List>
);

const useStyles = makeStyles({
  button: {
    fontWeight: "bold",
    color: "green",
    "& svg": { color: "green" },
  },
  ContainerBox: {
    marginRight: "20%",
  },
  detailsBox: {
    marginRight: "50px",
  },
});

export const AsientoContableShow = (props) => {
  const classes = useStyles();
  return (
    <Show {...props} actions={<EnviarDeleteActions />}>
      <BoxedShowLayout>
        <RaBox flexWrap="wrap" display="flex" className={classes.ContainerBox}>
          <RaBox flex="1 1 20%" className={classes.detailsBox}>
            <RaBox display="flex" justifyContent="space-between">
              <TextField label="id" source="ContabilidadID" />
              <DateField source="Fecha" />
            </RaBox>
            <RaBox display="flex" justifyContent="space-between">
              <TextField label="Descripción" source="Descripcion" />
              <NumberField source="Auxiliar" />
            </RaBox>
          </RaBox>
          <RaBox flex="1 1 35%" className={classes.detailsBox}>
            <RaBox display="flex" justifyContent="space-between">
              <ReferenceField
                label="Cuenta débito"
                source="Cuentadb"
                reference="Cuenta"
              >
                <TextField source="Descripcion" />
              </ReferenceField>
              <ReferenceField
                label="Cuenta crédito"
                source="Cuentacr"
                reference="Cuenta"
              >
                <TextField source="Descripcion" />
              </ReferenceField>
            </RaBox>
            <RaBox display="flex" justifyContent="space-between">
              <NumberField source="Monto" />
              <BooleanField source="Contabilizado" />
              <TextField source="Estado" />
            </RaBox>
          </RaBox>
        </RaBox>
      </BoxedShowLayout>
    </Show>
  );
};

export const AsientoContableCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={Validations}>
      <DateInput source="Fecha" />
      <TextInput source="Descripcion" />
    </SimpleForm>
  </Create>
);
