import * as SQLite from 'expo-sqlite';
const name = "myDatabase"
const db = SQLite.openDatabase(name)

const ObservacionesDatabase = {
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
}
export default ObservacionesDatabase