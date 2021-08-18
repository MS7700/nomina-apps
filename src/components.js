import {
  useNotify,
  useRedirect,
  fetchStart,
  fetchEnd,
  Button,
  TopToolbar,
  DeleteButton,
  NumberInput,
  ReferenceInput,
  SelectInput,
  downloadCSV,
  useDataProvider,
} from "react-admin";

import { useState } from "react";
import { useDispatch } from "react-redux";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import { useGetOne } from "react-admin";
import { useForm } from "react-final-form";

import { unparse } from "papaparse";

import ExportIcon from '@material-ui/icons/GetApp';

//Asientos contables
export const EnviarDeleteActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EnviarButton record={data} />
    <DeleteButton basePath={basePath} record={data} resource={resource} />
  </TopToolbar>
);

const useStyles = makeStyles({
  button: {
    fontWeight: "bold",
    color: "green",
    "& svg": { color: "green" },
  },
});

export const EnviarButton = ({ record }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    dispatch(fetchStart()); // start the global loading indicator
    const Record = { ...record };
    console.log(record);
    fetch(
      `https://nominaapi202102.azurewebsites.net/AsientoContable(${record.id})/Contabilidad.EnviarAsiento`,
      { method: "POST", body: Record, headers: {'Authorization': 'Basic QURNSU46MTIzNDU='} }
    )
      .then(() => {
        notify("Asiento enviado a contabilidad");
        redirect("/AsientoContable");
      })
      .catch((e) => {
        notify(
          "Error: El asiento no pudo ser enviado correctamente",
          "warning"
        );
      })
      .finally(() => {
        setLoading(false);
        dispatch(fetchEnd()); // stop the global loading indicator
      });
  };
  return (
    <Button
      children={<SendIcon />}
      className={classes.button}
      label="Enviar"
      onClick={handleClick}
      disabled={loading}
    />
  );
};

//Transacciones
const GetData = (id, recurso) => {
    // eslint-disable-next-line
  const { data, loading, error } = useGetOne(recurso, id);
  return data ? data : undefined;
};

export const TipoInput = ({ tipo }) => {
  let myTipo;
  if (tipo === "Deducción") {
    myTipo = "Deduccion";
  } else {
    myTipo = tipo;
  }
  return (
    <ReferenceInput
      label={"Tipo de " + tipo}
      source={"Tipo" + myTipo + "ID"}
      reference={"Tipo" + myTipo}
    >
      <SelectInput label={"Tipo" + myTipo} optionText="Nombre" />
    </ReferenceInput>
  );
};

export const MontoInput = ({ EmpleadoID, tipoID, tipoResource }) => {
  let mytipoResource;
  if (tipoResource === "TipoDeducción") {
    mytipoResource = "TipoDeduccion";
  } else {
    mytipoResource = tipoResource;
  }
  const empleado = GetData(EmpleadoID, "Empleado");
  const tipo = GetData(tipoID, mytipoResource);

  const form = useForm();
  let monto = 0;
  if (empleado && tipo) {
    if (tipo.Porcentual) {
      monto = empleado.Salario * (tipo.Cantidad / 100);
    } else {
      monto = tipo.Cantidad;
    }
    if (tipo.Automatico) {
      form.change("Monto", monto);
      return <NumberInput label="Monto" source="Monto" disabled={true} />;
    }
    return <NumberInput label="Monto" source="Monto" />;
  }
  return <div></div>;
};

//Nomina
export const ExportNominaButton = (props) => {
  const dataProvider = useDataProvider();
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const handleClick = async () => {
    setLoading(true);
    if (!props.record) {
      notify("No hay record de nómina");
      setLoading(false);
      return;
    }
    const record = JSON.parse(JSON.stringify(props.record));
    console.log(record);
    delete record["@odata.context"];
    if (record.TipoNominaID) {
      let tipo = await dataProvider.getOne("TipoNomina", { id: record.TipoNominaID });
      if (tipo) {
        record["TipoNomina"] = tipo.data.Descripcion;
        delete record["TipoNominaID"];
      }
    }
    console.log(record);
    let csv = unparse([record], { delimiter: ";" }) + "\n\n";
    if (props.detallado) {
      let resumen = await dataProvider.getManyReference('NominaResumen',
        {
          target: 'NominaID',
          id: record.id,
          pagination: { page: 1, perPage: 100000 },
          sort: { field: 'id', order: 'DESC' },
          filter: {}
        }
      );
      if (!resumen) {
        notify("Resumen no recibido");
        setLoading(false);
        return;
      }
      // eslint-disable-next-line no-unused-vars
      let resumenDepurado = await Promise.all(
        resumen.data.map(async r => {
          let empleado = await dataProvider.getOne("Empleado", { id: r.EmpleadoID });
          let detalle = await dataProvider.getManyReference(
            "NominaDetalle",
            {
              target: 'NominaResumenID',
              id: r.id,
              pagination: { page: 1, perPage: 100000 },
              sort: { field: 'id', order: 'DESC' },
              filter: {}
            }
          );
          if (!detalle) {
            return;
          }
          let detalleDepurado = await detalle.data.map(
            d => {
              delete d["id"];
              delete d["NominaResumenID"];
              delete d["TransaccionID"];
              return d;
            }
          );
          if (!empleado) {
            return;
          }
          r.Empleado = empleado.data.Nombre;
          delete r["EmpleadoID"];
          delete r["NominaID"];
          delete r["id"];
          csv += unparse([r], { delimiter: ";" }) + "\n";
          csv += unparse(detalleDepurado, { delimiter: ";" }) + "\n\n";
          return r;
        }
        )
      );
      downloadCSV(csv, "nomina");
      setLoading(false);

    } else {
      let resumen = await dataProvider.getManyReference('NominaResumen',
        {
          target: 'NominaID',
          id: record.id,
          pagination: { page: 1, perPage: 100000 },
          sort: { field: 'id', order: 'DESC' },
          filter: {}
        }
      );
      if (!resumen) {
        notify("Resumen no recibido");
        setLoading(false);
        return;
      }
      let resumenDepurado = await Promise.all(
        resumen.data.map(async r => {
          let empleado = await dataProvider.getOne("Empleado", { id: r.EmpleadoID });
          r.Empleado = empleado.data.Nombre;
          delete r["EmpleadoID"];
          delete r["NominaID"];
          delete r["id"];
          return r;
        }
        )
      );

      csv += unparse(resumenDepurado, { delimiter: ";" });
      downloadCSV(csv, "nomina");
      setLoading(false);
    }
  }

  return <Button children={<ExportIcon />} {...props} onClick={handleClick} disabled={loading} />;
}