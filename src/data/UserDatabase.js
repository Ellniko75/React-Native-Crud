import * as SQLite from 'expo-sqlite';
const name = "myDatabase"

const db = SQLite.openDatabase(name)

const UserDatabase = {
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
}
export default UserDatabase