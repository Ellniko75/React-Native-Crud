import React, { useReducer, createContext, useEffect } from 'react';
import database from '../data/Database';
import UserDatabase from '../data/UserDatabase';
import ZonasDatabase from '../data/ZonasDatabase';
import InsumosDatabase from '../data/InsumosDatabase';
import TratamientosDatabase from '../data/TratamientosDatabase';
import ObservacionesDatabase from '../data/ObservacionesDatabase';
const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    /*#region UserActions*/
    case 'deleteUser':
      const aBorrar = action.payload;
      UserDatabase.deleteUser(aBorrar.ci)
      return {
        ...state,
        users: state.users.filter((user) => user.ci !== aBorrar.ci)
      }
    case 'addUser':
      const aAgregar = action.payload;
      UserDatabase.insertUser(aAgregar)
      return {
        ...state,
        users: [...state.users, aAgregar]
      }
    case 'modifyUser':
      const aModificar = action.payload;
      UserDatabase.modifyUser(aModificar)
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.ci === aModificar.ci) {
            return {
              ...user,
              nombre: aModificar.nombre,
              apellido: aModificar.apellido
            }
          }
          return user;
        })
      }
    /*#endregion UserActions*/

    /*#region ZoneActions*/
    case 'insertZone':
      const aInsertar = action.payload;
      ZonasDatabase.insertZona(aInsertar)
      return {
        ...state,
        zones: [...state.zones, aInsertar]
      }
    case 'deleteZone':
      const aBorrarZona = action.payload;
      ZonasDatabase.deleteZona(aBorrarZona.latitud, aBorrarZona.longitud)
      return {
        ...state,
        zones: state.zones.filter((zone) => (zone.latitud !== aBorrarZona.latitud) && (zone.longitud !== aBorrarZona.longitud))
      }
    case 'editZone':
      const aModificarZona = action.payload;
      ZonasDatabase.modifyZona(aModificarZona);
      return {
        ...state,
        zones: state.zones.map((zone) => {
          if (zone.longitud == aModificarZona.longitud && zone.latitud == aModificarZona.latitud) {
            return {
              ...zone,
              lugar: aModificarZona.lugar,
              departamento: aModificarZona.departamento,
              cantidadTrabajadores: aModificarZona.cantidadTrabajadores
            }
          }
          return zone;
        })
      }

    /*#endregion ZoneActions*/

    /*#region InsumosActions*/
    case 'addInsumos':
      const IAgregar = action.payload;
      InsumosDatabase.insertInsumos(IAgregar)
      return {
        ...state,
        insumos: [...state.insumos, IAgregar]
      }
    case 'deleteInsumos':
      const IBorrar = action.payload;
      InsumosDatabase.deleteInsumos(IBorrar.id)
      return {
        ...state,
        insumos: state.insumos.filter((insumo) => insumo.id !== IBorrar.id)
      }
    case 'modifyInsumos':
      const IModificar = action.payload;
      InsumosDatabase.modifyInsumos(IModificar)
      return {
        ...state,
        insumos: state.insumos.map((insumo) => {
          if (insumo.id === IModificar.id) {
            return {
              ...insumo,
              nombre: IModificar.nombre,
              cantidad: IModificar.cantidad
            }
          }
          return insumo;
        })
      }
    /*#endregion InsumosActions*/

    /*#region ObservacionesActions*/
    case 'addObservacion':
      const OAgregar = action.payload;
      ObservacionesDatabase.insertObservacion(OAgregar);
      return {
        ...state,
        observaciones: [...state.observaciones, OAgregar]
      }
    case 'deleteObservacion':
      const idBorrar = action.payload.id;
      ObservacionesDatabase.deleteObservacion(idBorrar);
      return {
        ...state,
        observaciones: state.observaciones.filter((obs) => obs.id !== idBorrar)
      }
    case 'editObservacion':
      const nuevaObservacion = action.payload
      ObservacionesDatabase.modifyObservacion(nuevaObservacion)
      return {
        ...state,
        observaciones: state.observaciones.map((obs) => {
          if (obs.id === nuevaObservacion.id) {
            return {
              ...obs,
              titulo: nuevaObservacion.titulo,
              img: nuevaObservacion.img,
              latitud: nuevaObservacion.latitud,
              longitud: nuevaObservacion.longitud
            }
          }
          return obs;
        })
      }
    /*#endregion ObservacionesActions*/

    /*#region TratamientosActions*/
    case 'addTratamiento':
      const tratamiento = action.payload;
      TratamientosDatabase.insertTratamiento(tratamiento)
      return {
        ...state,
        tratamientos: [...state.tratamientos, tratamiento]
      }


    case 'modifyTratamiento':
      const tratamientoModify = action.payload;
      TratamientosDatabase.modifyTratamiento(tratamientoModify)
      return {
        ...state,
        tratamientos: state.tratamientos.map((tra) => {
          if (tra.id == tratamientoModify.id) {
            return {
              ...tra,
              nombre: tratamientoModify.nombre,
              latitudZona: tratamientoModify.latitudZona,
              longitudZona: tratamientoModify.longitudZona,
              fechaInicio: tratamientoModify.fechaInicio,
              ciUser: tratamientoModify.ciUser,
              fechaFin: tratamientoModify.fechaFin,
              tiempo: tratamientoModify.tiempo,
              img: tratamientoModify.img,
              idInsumo: tratamientoModify.idInsumo,
              idObservacion: tratamientoModify.idObservacion
            }
          }
          return tra;
        })
      }
    case 'deleteTratamiento':
      const tratamientoABorrar = action.payload
      TratamientosDatabase.deleteTratamiento(tratamientoABorrar.id)
      return {
        ...state,
        tratamientos: state.tratamientos.filter((t) => t.id !== tratamientoABorrar.id)
      }

    /*#endregion */

    default:
      return state;
  }
};





export const Provider = ({ children }) => {
  let initialState = {
    users: [],
    zones: [],
    insumos: [],
    observaciones: [],
    tratamientos: []
  }

  //set up de la base de datos y obtención de datos
  useEffect(() => {
    database.setUpDataBase();
    database.getDataFromDB().then((data) => {
      initialState.users = data.users;
      initialState.zones = data.zones;
      initialState.insumos = data.insumos;
      initialState.observaciones = data.observaciones;
      initialState.tratamientos = data.tratamientos
    })
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState);

  return (

    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext
