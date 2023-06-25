import React, { useReducer, createContext, useEffect } from 'react';
import database from '../data/Database';


const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    /*#region UserActions*/
    case 'deleteUser':
      const aBorrar = action.payload;
      database.deleteUser(aBorrar.ci)
      return {
        ...state,
        users: state.users.filter((user) => user.ci !== aBorrar.ci)
      }
    case 'addUser':
      const aAgregar = action.payload;
      database.insertUser(aAgregar)
      return {
        ...state,
        users: [...state.users, aAgregar]
      }
    case 'modifyUser':
      const aModificar = action.payload;
      database.modifyUser(aModificar)
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
      database.insertZona(aInsertar)
      return {
        ...state,
        zones: [...state.zones, aInsertar]
      }
    case 'deleteZone':
      const aBorrarZona = action.payload;
      database.deleteZona(aBorrarZona.latitud, aBorrarZona.longitud)
      return {
        ...state,
        zones: state.zones.filter((zone) => (zone.latitud !== aBorrarZona.latitud) && (zone.longitud !== aBorrarZona.longitud))
      }
    case 'editZone':
      const aModificarZona = action.payload;
      database.modifyZona(aModificarZona);
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
      database.insertInsumos(IAgregar)
      return {
        ...state,
        insumos: [...state.insumos, IAgregar]
      }
    case 'deleteInsumos':
      const IBorrar = action.payload;
      database.deleteInsumos(IBorrar.id)
      return {
        ...state,
        insumos: state.insumos.filter((insumo) => insumo.id !== IBorrar.id)
      }
    case 'modifyInsumos':
      const IModificar = action.payload;
      database.modifyInsumos(IModificar)
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
      database.insertObservacion(OAgregar);
      return {
        ...state,
        observaciones: [...state.observaciones, OAgregar]
      }
    case 'deleteObservacion':
      const idBorrar = action.payload.id;
      database.deleteObservacion(idBorrar);
      return {
        ...state,
        observaciones: state.observaciones.filter((obs) => obs.id !== idBorrar)
      }
    case 'editObservacion':
      const nuevaObservacion = action.payload
      database.modifyObservacion(nuevaObservacion)
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

    default:
      return state;
  }
};





export const Provider = ({ children }) => {
  let initialState = {
    users: [],
    zones: [],
    insumos: [],
    observaciones: []
  }

  //set up de la base de datos y obtención de datos
  useEffect(() => {
    database.setUpDataBase();
    database.getDataFromDB().then((data) => {
      initialState.users = data.users;
      initialState.zones = data.zones;
      initialState.insumos = data.insumos;
      initialState.observaciones = data.observaciones
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
