import * as SQLite from 'expo-sqlite';

const name = "myDatabase"

const db = SQLite.openDatabase(name)

const database = {
  createTableUsers: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE if not exists users (ci char(8) primary key, nombre varchar(40), apellido varchar(40))',
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
  createTableZonas: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE if not exists zonas (latitud decimal(9,6),longitud decimal(9,6), lugar varchar(11) check (lugar in ("Estancia","Quinta","Plantacion")), departamento varchar(20) not null, cantidadTrabajadores int not null, primary key(latitud,longitud))',
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
  createTableInsumos: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE if not exists insumos (id int primary key, nombre varchar(40) , cantidad int)',
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
  getUsers: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users",
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
  getZonas: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM zonas",
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
  getInsumos: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM insumos",
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
  insertUser: async (user) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql("INSERT INTO users VALUES (?,?,?)",
            [user.ci, user.nombre, user.apellido],
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
  deleteUser: async (ci) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`DELETE FROM users WHERE ci='${ci}'`,
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
  modifyUser: async (user) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `UPDATE users SET nombre=?, apellido=? WHERE ci=?`,
            [user.nombre, user.apellido, user.ci],
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

  insertZona: async (zona) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql("INSERT INTO zonas VALUES (?,?,?,?,?)",
            [zona.latitud,zona.longitud,zona.lugar,zona.departamento,zona.cantidadTrabajadores],
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
  deleteZona:async(latitud,longitud)=>{
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`DELETE FROM zonas WHERE zonas.latitud=${latitud} AND zonas.longitud=${longitud}`,
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
  modifyZona:async(zona)=>{
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`UPDATE zonas SET lugar = ?, departamento=?, cantidadTrabajadores=? WHERE latitud=${zona.latitud} AND longitud=${zona.longitud}`,
            [zona.lugar,zona.departamento,zona.cantidadTrabajadores],
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
  insertInsumos: async (insumos) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql("INSERT INTO insumos VALUES (?,?,?)",
            [insumos.id, insumos.nombre, insumos.cantidad],
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
  deleteInsumos: async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(`DELETE FROM insumos WHERE id='${id}'`,
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
  modifyInsumos: async (insumos) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `UPDATE insumos SET nombre=?, cantidad=? WHERE id=?`,
            [insumos.nombre, insumos.cantidad, insumos.id],
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
            "SELECT name FROM sqlite_master WHERE type='table'",
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
  setUpDataBase:async()=>{
    await database.createTableUsers();
    await database.createTableZonas();
    await database.createTableInsumos();
    return;
  },
  getDataFromDB:async()=>{
    let usersFromDB = await database.getUsers();
    let zonasFromDB = await database.getZonas();
    let insumosFromDB = await database.getInsumos();

    return{
      users:usersFromDB,
      zones:zonasFromDB,
      insumos:insumosFromDB
    }
  }
    
    
    
   
   

   
}
 












export default database