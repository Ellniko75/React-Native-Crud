import * as SQLite from 'expo-sqlite';
import UserDatabase from './UserDatabase';
import TratamientosDatabase from './TratamientosDatabase';
import ZonasDatabase from './ZonasDatabase';
import InsumosDatabase from './InsumosDatabase';
import ObservacionesDatabase from './ObservacionesDatabase';
const name = "myDatabase"

const db = SQLite.openDatabase(name)

const database = {

  createTableObservaciones: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE if not exists observaciones (id int primary key, titulo varchar(30), latitud decimal(9,6), longitud decimal(9,6), img varchar(500))',
          [],
          (_, succes) => {
            resolve(succes);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
  },

  getObservaciones: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM observaciones",
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },


  insertObservacion: async (observacion) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql("INSERT INTO observaciones VALUES (?,?,?,?,?)",
            [observacion.id, observacion.titulo, observacion.latitud, observacion.longitud, observacion.img],
            (tx, result) => {
              resolve(result);

            },
            (_, error) => {
              reject(error)

            }
          )
        }
      )
    })
  },
  deleteObservacion: async (idObservacion) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`DELETE FROM observaciones WHERE id='${idObservacion}'`,
            [],
            (tx, result) => {
              resolve(result);
            },
            (_, error) => {
              reject(error)
            }

          )
        }
      )
    })
  },
  modifyObservacion: async (observacion) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `UPDATE observaciones SET titulo=?, latitud=?, longitud=?,img=? WHERE id=?`,
            [observacion.titulo, observacion.latitud, observacion.longitud, observacion.img, observacion.id],
            (tx, result) => {
              resolve(result)
            },
            (_, error) => {
              reject(error)
            }
          )
        }
      )
    })
  },
  dropAllTables: async () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' and name='tratamientos'",
            [],
            (_, result) => {
              const tableNames = result.rows._array.map(row => row.name);
              tableNames.forEach(tableName => {
                tx.executeSql(
                  `DROP TABLE ${tableName}`,
                  [],
                  (_, result) => {
                    console.log(`Table ${tableName} dropped successfully.`);
                  },
                  (_, error) => {
                    console.log(`Error dropping table ${tableName}:`, error);
                  }
                );
              });
              resolve();
            },
            (_, error) => {
              reject(error);
            }
          );
        }
      );
    });
  },
  viewAllTables: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table'",
            [],
            (_, result) => {
              const tableNames = result.rows._array.map(row => row.name);
              console.log(tableNames)

            });


        }
      );
    });
  },
  setUpDataBase: async () => {
    await UserDatabase.createTableUsers();
    await ZonasDatabase.createTableZonas();
    await InsumosDatabase.createTableInsumos();
    await ObservacionesDatabase.createTableObservaciones();
    await TratamientosDatabase.createTableTratamientos();
    return;
  },
  getDataFromDB: async () => {
    let usersFromDB = await UserDatabase.getUsers();
    let zonasFromDB = await ZonasDatabase.getZonas();
    let insumosFromDB = await InsumosDatabase.getInsumos();
    let observacionesFromDB = await ObservacionesDatabase.getObservaciones();
    let tratamientosFromDB = await TratamientosDatabase.getTratamientos();

    return {
      users: usersFromDB,
      zones: zonasFromDB,
      insumos: insumosFromDB,
      observaciones: observacionesFromDB,
      tratamientos: tratamientosFromDB
    }
  }







}













export default database