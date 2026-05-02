import request from 'supertest';
import { Application } from 'express';
import { App } from '../../../src/app';
import { IUser } from '../../../src/interfaces/IUser';
import { IUserResponse } from '../../../src/interfaces/IUserResponse';
import { UserRepository } from '../../../src/endpoints/users/userRepository';

describe('UserController', () => {
  let app: Application;

  beforeEach(() => {
    jest.restoreAllMocks();
    app = new App().server;
  });

  it('Deve retornar a lista de usuários corretamente', async () => {
    const mockUsers: IUser[] = [
      {
        id: 1,
        name: 'Naruto',
        age: 10,
      },
      {
        id: 2,
        name: 'Sasuke',
        age: 18,
      },
      {
        id: 3,
        name: 'Kakashi',
        age: 50,
      },
    ];

    const expectedUsers: IUserResponse[] = [
      {
        id: 1,
        name: 'Naruto',
        age: 10,
        isOfAge: false,
      },
      {
        id: 2,
        name: 'Sasuke',
        age: 18,
        isOfAge: true,
      },
      {
        id: 3,
        name: 'Kakashi',
        age: 50,
        isOfAge: true,
      },
    ];

    jest.spyOn(UserRepository.prototype, 'list').mockReturnValueOnce(mockUsers);

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(expectedUsers);
  });

  it('Deve retornar um usuário pelo id corretamente', async () => {
    const mockUser: IUser = {
      id: 2,
      name: 'Sasuke',
      age: 18,
    };

    const expectedUser: IUserResponse = {
      ...mockUser,
      isOfAge: true,
    };

    const findOneSpy = jest.spyOn(UserRepository.prototype, 'findOne').mockReturnValueOnce(mockUser);

    const response = await request(app).get('/users/2');

    expect(findOneSpy).toHaveBeenCalledWith(2);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(expectedUser);
  });

  it('Deve retornar erro ao visualizar um usuário inexistente', async () => {
    const findOneSpy = jest.spyOn(UserRepository.prototype, 'findOne').mockReturnValueOnce(undefined);

    const response = await request(app).get('/users/999');

    expect(findOneSpy).toHaveBeenCalledWith(999);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      data: 'Usuário não encontrado',
    });
  });

  it('Deve criar um usuário corretamente', async () => {
    const userData: IUser = {
      id: 4,
      name: 'Sakura',
      age: 17,
    };

    const saveSpy = jest.spyOn(UserRepository.prototype, 'save').mockReturnValueOnce(true);

    const response = await request(app).post('/users').send(userData);

    expect(saveSpy).toHaveBeenCalledWith(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: 'Usuário criado com sucesso',
    });
  });

  it('Deve retornar erro quando a criação de usuário falhar', async () => {
    const userData: IUser = {
      id: 1,
      name: 'Naruto',
      age: 10,
    };

    const saveSpy = jest.spyOn(UserRepository.prototype, 'save').mockReturnValueOnce(false);

    const response = await request(app).post('/users').send(userData);

    expect(saveSpy).toHaveBeenCalledWith(userData);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      data: 'Falha ao criar o usuário',
    });
  });

  it('Deve excluir um usuário corretamente', async () => {
    const deleteSpy = jest.spyOn(UserRepository.prototype, 'delete').mockReturnValueOnce(true);

    const response = await request(app).delete('/users/3');

    expect(deleteSpy).toHaveBeenCalledWith(3);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: 'Usuário excluído com sucesso',
    });
  });

  it('Deve retornar erro quando a exclusão de usuário falhar', async () => {
    const deleteSpy = jest.spyOn(UserRepository.prototype, 'delete').mockReturnValueOnce(false);

    const response = await request(app).delete('/users/999');

    expect(deleteSpy).toHaveBeenCalledWith(999);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      data: 'Falha ao remover o usuário',
    });
  });
});
