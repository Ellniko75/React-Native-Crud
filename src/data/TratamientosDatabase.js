import * as SQLite from 'expo-sqlite';
const name = "myDatabase"
const db = SQLite.openDatabase(name)

const TratamientosDatabase = {
    getTratamientos: async () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM tratamientos",
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
    createTableTratamientos: async () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE if not exists tratamientos (id int primary key, nombre varchar(30), latitudZona decimal(9,6),longitudZona decimal(9,6), ciUser int, fechaInicio varchar(50), fechaFin varchar(50),tiempo int, img varchar(500),idInsumo int,idObservacion int, FOREIGN KEY (latitudZona,longitudZona) REFERENCES zonas(latitud,longitud), FOREIGN KEY (ciUser) REFERENCES users(ci), FOREIGN KEY (idInsumo) REFERENCES insumos(id), FOREIGN KEY(idObservacion) REFERENCES observaciones(id) )',
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
    insertTratamiento: async (tra) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(`INSERT INTO tratamientos VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                        [tra.id, tra.nombre, tra.latitudZona, tra.longitudZona, tra.ciUser, tra.fechaInicio, tra.fechaFin, tra.tiempo, tra.img, tra.idInsumo, tra.idObservacion],
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
    modifyTratamiento: async (tra) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'UPDATE tratamientos SET nombre=?, latitudZona=?, longitudZona=?,ciUser=?,fechaInicio=?,fechaFin=?,tiempo=?,img=?,idInsumo=?,idObservacion=? WHERE id=?',
                        [tra.nombre, tra.latitudZona, tra.longitudZona, tra.ciUser, tra.fechaInicio, tra.fechaFin, tra.tiempo, tra.img, tra.idInsumo, tra.idObservacion, tra.id],
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
    deleteTratamiento: async (idTratamiento) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(`DELETE FROM tratamientos WHERE id=${idTratamiento}`,
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
}
export default TratamientosDatabase