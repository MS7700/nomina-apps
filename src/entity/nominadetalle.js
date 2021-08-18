import { List, Datagrid, TextField, NumberField } from "react-admin";

export const NominaDetalleList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="Nómina Resumen" source="NominaResumenID" />
      <NumberField label="Transacción" source="TransaccionID" />
      <TextField source="Tipo" />
      <TextField source="Descripción" />
      <NumberField source="Monto" />
    </Datagrid>
  </List>
);
