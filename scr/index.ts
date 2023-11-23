import express, { Request, Response } from "express";
import cors from "cors";
import { BaseDataBase } from "./database/BaseDataBase";
import { UserDataBase } from "./models/UserDataBase";
import { User } from "./models/Users";
import { TUsers } from "./types";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const userDataBase = new BaseDataBase();
    const usersDB = await UserDataBase.findUsers();

    const users: User[] = usersDB.map(
      (userDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    );

    res.status(200).send(users);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, role } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser string");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser uma string");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'role' deve ser uma string");
    }

    if (typeof role !== "string") {
      res.status(400);
      throw new Error("'email' deve ser uma string");
    }

    const userDB = new UserDataBase();
    const idExists = await userDB.findUsersById(id);

    if (idExists) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    await userDB.insertVideos(id, name, email, password, role);

    const user = new Users(id, name, email, password, new Date().toISOString());

    const newUser: TUsers = {
      id: user.getId(),
      name: user.getTitle(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const userDataBase = new UserDataBase();
    const userIdToEdit = await userDataBase.findUserById(idToEdit);

    if (!userIdToEdit) {
      res.status(400);
      throw new Error("'id' não existe");
    }

    const user = new User(
      userIdToEdit.id,
      userIdToEdit.name,
      userIdToEdit.email,
      userIdToEdit.password,
      userIdToEdit.role,
      userIdToEdit.created_at
    );

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'newId' deve ser string");
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'newName' deve ser string");
      }
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'email' deve ser uma string");
      }
    }

    if (password !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'password' deve ser uma string");
      }
    }

    if (role !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'role' deve ser uma string");
      }
    }

    id && user.setId(id);
    name && user.setName(name);
    email && user.setEmail(email);
    password && user.setPassword(password);
    role && user.setRole(role);

    const newUser: TUsers = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    await userDataBase.updateUser(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role
    );

    res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso", newUser });
  } catch (error) {}
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const userDatabase = new UserDataBase();
    const userToDelete = await userDatabase.findUserById(idToDelete);

    if (!userToDelete) {
      res.status(400);
      throw new Error("'id' não existe");
    }

    const user = new User(
      userToDelete.id,
      userToDelete.name,
      userToDelete.email,
      userToDelete.password,
      userToDelete.role,
      userToDelete.created_at
    );

    await userDatabase.deleteUser(user.getId());

    res.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
