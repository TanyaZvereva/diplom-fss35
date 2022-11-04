const {sqlCreateUser, sqlDeleteProject, sqlDeleteTasksByProject, sqlGetUser, sqlProjectById, sqlUpdateProjects, sqlUserByLogin} = 
require('..models/user')
const connect = require('../database');
const myConnect = connect

const readOneProject = async (id) => ({status : 200, data: await myConnect.query(sqlProjectById, [id])})

const readOneUserByLogin = async (login) => ({status : 200, data: await myConnect.query(sqlUserByLogin, [login])})

const createUser = async (login, password) => {
  const {data : {rows}} = await readOneUserByLogin(login)

  if(rows.length){
    return {status: 400, data: 'project code already exist'}
  }
  const newProject = await myConnect.query(sqlCreateUser, [login, password])
  return {status: 200, data: newProject.rows[0]}
}

//await awaits a promise
const readUser = async (login, password) => ({status: 200, data: await myConnect.query(sqlGetUser, [login, password])})

const updateProject = async (name, code, id) => {
  const {data : {rows}} = await readOneProject(id)
  if(rows.length === 0){
    return {status: 400, data: 'project id is missing'}
  }
  return {status: 200, data: await myConnect.query(sqlUpdateProjects, [name, code, id])}
}

const deleteProject = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteProject, [id])})

const deleteTasksByProject = async (id) => ({status: 200, data: await myConnect.query(sqlDeleteTasksByProject, [id])})



module.exports = {
  createUser,
  readUser,
  deleteProject,
  deleteTasksByProject,
  updateProject,
  readOneProject,
  readOneUserByLogin
}