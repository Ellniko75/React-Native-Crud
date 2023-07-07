import * as SQLite from 'expo-sqlite';
const name = "myDatabase"
const db = SQLite.openDatabase(name)

const InsumosDatabase = {
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

}
export default InsumosDatabase