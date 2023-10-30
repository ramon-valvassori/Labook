import { BaseDataBase } from "../database/BaseDataBase";
import { TUsers } from "../types";

export class UserDataBase extends BaseDataBase {
  public static TABLE_USERS = "users";

  public async findUsers() {
    const usersDB: TUsers[] = await BaseDataBase.connection(
      UserDataBase.TABLE_USERS
    );

    return usersDB;
  }

  public async insertUsers(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    await BaseDataBase.connection.raw(
      `INSERT INTO ${UserDataBase.TABLE_USERS} (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, password, role]
    );
  }

  public async findUserById(id: string) {
    const result = await BaseDataBase.connection.raw(
      `SELECT * FROM ${UserDataBase.TABLE_USERS} WHERE id = ?`,
      [id]
    );

    if (result[0] && result[0].length > 0) {
      // Retorna o vídeo encontrado no banco de dados
      return result[0][0];
    } else {
      // Retorna null se o vídeo não foi encontrado
      return null;
    }
  }

  public async updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    await BaseDataBase.connection.raw(
      `UPDATE ${UserDataBase.TABLE_USERS} SET name=?, email=?, password=?, role=? WHERE id=?`,
      [name, email, password, role, id]
    );
  }

  public async deleteUser(id: string) {
    await BaseDataBase.connection.raw(
      `DELETE FROM ${UserDataBase.TABLE_USERS} WHERE id=?`,
      [id]
    );
  }
}
