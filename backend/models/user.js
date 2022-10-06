const connect = require('../database');
const myConnect = connect
const {listFormatter} = require('../formatters/projects')

const sqlCreateUser = {
  text: `INSERT INTO public.user (login, password) VALUES ($1, $2)
    RETURNING id, login, password`
}

const sqlProjectById = {
  text: `SELECT * FROM projectdeskdb.projects WHERE id=$1`
}

const sqlUserByLogin = {
  text: `SELECT * FROM public.user WHERE login=$1`
}

const sqlGetUser = {
  text: `SELECT * FROM public.user WHERE login=$1 AND password=$2`
}

const sqlUpdateProjects = {
  text: `UPDATE projectdeskdb.projects SET name=$1, code=$2 WHERE id=$3
    RETURNING id, name, code`
}

const sqlDeleteProject = {
  text: `DELETE FROM projectdeskdb.projects WHERE id=$1;`
}

const sqlDeleteTasksByProject = {
  text: `DELETE FROM projectdeskdb.tasks WHERE project_id=$1;`
}

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
  readUser
}