import "./App.css";

import odataProvider, {
  OdataDataProvider,
} from "@ms7700/ra-data-odata-server-forked";
import {
  Admin,
  Resource,
  /*
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  */
  Loading,
} from "react-admin";
import { useEffect, useState } from "react";

import { IngresoList, IngresoEdit, IngresoCreate } from "./entity/ingreso";
import {
  DeduccionList,
  DeduccionEdit,
  DeduccionCreate,
} from "./entity/deduccion";
import {
  DepartamentoList,
  DepartamentoEdit,
  DepartamentoCreate,
} from "./entity/departamento";
import { PuestoList, PuestoEdit, PuestoCreate } from "./entity/puesto";
import {
  TipoNominaList,
  TipoNominaEdit,
  TipoNominaCreate,
} from "./entity/tiponomina";
import { NominaList, NominaShow, NominaCreate } from "./entity/nomina";
import { EmpleadoList, EmpleadoEdit, EmpleadoCreate } from "./entity/empleado";
import {
  TransaccionList,
  TransaccionEdit,
  TransaccionCreate,
} from "./entity/transaccion";
import { UsuarioCreate, UsuarioEdit, UsuarioList } from "./entity/usuario";
import {
  AsientoContableCreate,
  AsientoContableShow,
  AsientoContableList,
} from "./entity/asientocontable";
import { CuentaCreate, CuentaEdit, CuentaList } from "./entity/cuenta";
import { NominaDetalleList } from "./entity/nominadetalle";
import { NominaResumenList } from "./entity/nominaresumen";

import EmpleadosIcon from "@material-ui/icons/People";
import UsuariosIcon from "@material-ui/icons/AccountCircle";
import DepartamentoIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import DeduccionIcon from "@material-ui/icons/Remove";
import IngresoIcon from "@material-ui/icons/Add";
import TransaccionIcon from "@material-ui/icons/AttachMoney";
import NominaIcon from "@material-ui/icons/MenuBook";
import CuentaIcon from "@material-ui/icons/AccountBalance";
import AsientoContableIcon from "@material-ui/icons/AccountBalanceWallet";
import TipoNominaIcon from "@material-ui/icons/Event";

import theme from "./theme";
import { i18nProvider } from "./i18nProvider";

import authProvider from './authProvider';

function App() {
  
  const [dataProvider, setDataProvider] = useState<OdataDataProvider>();
  useEffect(() => {
    if (sessionStorage.getItem("token") !== "null") {
      odataProvider("https://nominaapi202102.azurewebsites.net/", () => {
        return Promise.resolve()
          .then((token) => ({
            headers: {
              Authorization: "Basic " + sessionStorage.getItem('token'),
              "Access-Control-Allow-Headers": "Authorization", "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, DELETE'"
            },
          }));
      }).then((provider) => setDataProvider(provider));
      return () => { };
    } else {
      odataProvider(
        "https://nominaapi202102.azurewebsites.net/"
      ).then((p) => setDataProvider(p));
      return () => { };
    }
  }, []);

  return dataProvider ? (
    <Admin
      locale="es"
      i18nProvider={i18nProvider}
      //@ts-ignore
      theme={theme}
      title="Nómina APP"
      dataProvider={dataProvider}
      //@ts-ignore
      authProvider={authProvider}
    >
      {
        permissions => [
          <Resource
            name="Nomina"
            list={NominaList}
            show={NominaShow}
            create={NominaCreate}
            options={{ label: "Nóminas" }}
            icon={NominaIcon}
          />,
          <Resource
            name="NominaResumen"
            list={permissions.includes("admin") ? NominaResumenList : undefined}
            options={{ label: "Resumen de Nóminas" }}
            icon={NominaIcon}
          />,
          <Resource
            name="NominaDetalle"
            list={permissions.includes("admin") ? NominaDetalleList : undefined}
            options={{ label: "Detalles de Nóminas" }}
            icon={NominaIcon}
          />,
          <Resource
            name="Transaccion"
            list={TransaccionList}
            edit={TransaccionEdit}
            create={TransaccionCreate}
            options={{ label: "Transacciones" }}
            icon={TransaccionIcon}
          />,
          <Resource
            name="TipoIngreso"
            list={IngresoList}
            edit={IngresoEdit}
            create={IngresoCreate}
            options={{ label: "Ingresos" }}
            icon={IngresoIcon}
          />,
          <Resource
            name="TipoDeduccion"
            list={DeduccionList}
            edit={DeduccionEdit}
            create={DeduccionCreate}
            options={{ label: "Deducciones" }}
            icon={DeduccionIcon}
          />,
          <Resource
            name="TipoNomina"
            list={TipoNominaList}
            edit={TipoNominaEdit}
            create={TipoNominaCreate}
            options={{ label: "Tipos de Nóminas" }}
            icon={TipoNominaIcon}
          />,
          <Resource
            name="Empleado"
            list={EmpleadoList}
            edit={EmpleadoEdit}
            create={EmpleadoCreate}
            icon={EmpleadosIcon}
          />,
          <Resource
            name="Puesto"
            list={PuestoList}
            edit={PuestoEdit}
            create={PuestoCreate}
            icon={WorkIcon}
          />,
          <Resource
            name="Departamento"
            list={DepartamentoList}
            edit={DepartamentoEdit}
            create={DepartamentoCreate}
            icon={DepartamentoIcon}
          />,
          <Resource
            name="AsientoContable"
            list={AsientoContableList}
            show={AsientoContableShow}
            create={AsientoContableCreate}
            options={{ label: "Asientos Contables" }}
            icon={AsientoContableIcon}
          />,
          <Resource
            name="Cuenta"
            list={permissions.includes("admin") ? CuentaList : undefined}
            edit={permissions.includes("admin") ? CuentaEdit : undefined}
            create={permissions.includes("admin") ? CuentaCreate : undefined}
            options={{ label: "Catálogo de Cuentas" }}
            icon={CuentaIcon}
          />,
          <Resource
            name="Usuario"
            list={permissions.includes("admin") ? UsuarioList : undefined}
            edit={permissions.includes("admin") ? UsuarioEdit : undefined}
            create={permissions.includes("admin") ? UsuarioCreate : undefined}
            icon={UsuariosIcon}
          />,
        ]
      }
    </Admin>
  ) : (
    <Loading loadingPrimary="Cargando..." loadingSecondary="Espere un momento"></Loading>
  );
}

export default App;
