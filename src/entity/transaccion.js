import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Edit,
  Create,
  SimpleForm,
  NumberField,
  ReferenceField,
  NumberInput,
  ReferenceInput,
  SelectInput,
  DateField,
  DateInput,
  FormDataConsumer,
  RadioButtonGroupInput,
  Toolbar,
  BooleanInput,
} from "react-admin";

import { TipoInput, MontoInput } from "../components";

const Validations = (values) => {
  const errors = {};
  if (!values.EmpleadoID) {
    errors.EmpleadoID = "El empleado es requerido.";
  }
  if (!values.Fecha) {
    errors.Fecha = "La fecha es requerida.";
  }
  if (!values.Tipo) {
    errors.Tipo = "El tipo de transacción es requerido.";
  }
  if (values.Tipo === "Ingreso" && !values.TipoIngresoID) {
    errors.TipoIngresoID = "Seleccione algún tipo de ingreso.";
  }
  if (values.Tipo === "Deducción" && !values.TipoDeduccionID) {
    errors.TipoDeduccionID = "Seleccione algún tipo de deducción.";
  }
  if (!values.Monto || values.Monto === 0) {
    errors.Monto = "El monto es requerido.";
  }
  if (values.Monto <= 0 || !(typeof values.Monto === "number")) {
    errors.Monto = "Ingrese un monto válido.";
  }
  return errors;
};

const tipos = [
  { id: "Ingreso", name: "Ingreso" },
  { id: "Deducción", name: "Deducción" },
];

const Filters = [
  <NumberInput label="ID" source="id" />,
  <ReferenceInput label="Empleado" source="EmpleadoID" reference="Empleado">
    <SelectInput label="Empleado" optionText="Nombre" />
  </ReferenceInput>,
  <DateInput source="FechaInicial" />,
  <DateInput source="FechaFinal" />,
  <DateInput source="Fecha" />,
  <RadioButtonGroupInput label="Tipo" source="Tipo" choices={tipos} />,
  <ReferenceInput
    label="Tipo de Ingreso"
    source="TipoIngresoID"
    reference="TipoIngreso"
  >
    <SelectInput label="Tipo de Ingreso" optionText="Nombre" />
  </ReferenceInput>,
  <ReferenceInput
    label="Tipo de Deducción"
    source="TipoDeduccionID"
    reference="TipoDeduccion"
  >
    <SelectInput label="Tipo de Deducción" optionText="Nombre" />
  </ReferenceInput>,
  <NumberInput source="Monto" />,
  <BooleanInput source="Contabilizado" />,
];

const transform = (data) => {
  if (data.Tipo && data.Tipo === "Ingreso") {
    console.log("Ingreso");
    return {
      ...data,
      TipoDeduccionID: null,
      Contabilizado: false,
    };
  } else if (data.Tipo && data.Tipo === "Deducción") {
    console.log("Deducción");
    return {
      ...data,
      TipoIngresoID: null,
      Contabilizado: false,
    };
  }
  console.log(data);
  return data;
};

export const TransaccionList = (props) => (
  <List {...props} filters={Filters} sort={{ field: "Fecha", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField label="Empleado" source="EmpleadoID" reference="Empleado">
        <TextField source="Nombre" />
      </ReferenceField>
      <DateField source="Fecha" />
      <TextField source="Tipo" />
      <ReferenceField
        label="Tipo de Ingreso"
        source="TipoIngresoID"
        reference="TipoIngreso"
      >
        <TextField source="Nombre" />
      </ReferenceField>
      <ReferenceField
        label="Tipo de Deducción"
        source="TipoDeduccionID"
        reference="TipoDeduccion"
      >
        <TextField source="Nombre" />
      </ReferenceField>
      <NumberField source="Monto" />
      <BooleanField source="Contabilizado" />
    </Datagrid>
  </List>
);

export const TransaccionEdit = (props) => (
  <Edit {...props} transform={transform}>
    <SimpleForm
      toolbar={<Toolbar alwaysEnableSaveButton />}
      validate={Validations}
    >
      <ReferenceInput label="Empleado" source="EmpleadoID" reference="Empleado">
        <SelectInput label="Empleado" optionText="Nombre" />
      </ReferenceInput>
      <DateInput source="Fecha" />
      <RadioButtonGroupInput label="Tipo" source="Tipo" choices={tipos} />
      <FormDataConsumer subscription={{ values: true }}>
        {({ formData, ...rest }) =>
          formData.Tipo && <TipoInput tipo={formData.Tipo} />
        }
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.EmpleadoID &&
          (formData.TipoIngresoID || formData.TipoDeduccionID) && (
            <MontoInput
              EmpleadoID={formData.EmpleadoID}
              tipoID={
                formData.Tipo === "Ingreso"
                  ? formData.TipoIngresoID
                  : formData.TipoDeduccionID
              }
              tipoResource={"Tipo" + formData.Tipo}
            />
          )
        }
      </FormDataConsumer>
    </SimpleForm>
  </Edit>
);

export const TransaccionCreate = (props) => {
  return (
    <Create {...props} transform={transform}>
      <SimpleForm redirect={false} validate={Validations}>
        <ReferenceInput
          label="Empleado"
          source="EmpleadoID"
          reference="Empleado"
        >
          <SelectInput label="Empleado" optionText="Nombre" />
        </ReferenceInput>
        <DateInput source="Fecha" />
        <RadioButtonGroupInput label="Tipo" source="Tipo" choices={tipos} />
        <FormDataConsumer subscription={{ values: true }}>
          {({ formData, ...rest }) =>
            formData.Tipo && <TipoInput tipo={formData.Tipo} />
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.EmpleadoID &&
            (formData.TipoIngresoID || formData.TipoDeduccionID) && (
              <MontoInput
                EmpleadoID={formData.EmpleadoID}
                tipoID={
                  formData.Tipo === "Ingreso"
                    ? formData.TipoIngresoID
                    : formData.TipoDeduccionID
                }
                tipoResource={"Tipo" + formData.Tipo}
              />
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
