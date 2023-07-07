import * as SQLite from 'expo-sqlite';
const name = "myDatabase"
const db = SQLite.openDatabase(name)


const ZonasDatabase = {
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
    }, insertZona: async (zona) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql("INSERT INTO zonas VALUES (?,?,?,?,?)",
                        [zona.latitud, zona.longitud, zona.lugar, zona.departamento, zona.cantidadTrabajadores],
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
    }, deleteZona: async (latitud, longitud) => {
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
    modifyZona: async (zona) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(`UPDATE zonas SET lugar = ?, departamento=?, cantidadTrabajadores=? WHERE latitud=${zona.latitud} AND longitud=${zona.longitud}`,
                        [zona.lugar, zona.departamento, zona.cantidadTrabajadores],
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
}

export default ZonasDatabase
