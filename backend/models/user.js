const sqlCreateUser = {
  text: `INSERT INTO public.user (login, password) VALUES ($1, $2)
    RETURNING login, password`
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

const sqlClientData = {
  text: `SELECT * FROM public.session
        INNER JOIN public.movie ON movie.id = session.movie_id
        INNER JOIN public.cinema_hall ON cinema_hall.id = session.cinemahall_id`
}

const sqlClientPlaces = {
  text: `SELECT * FROM public.place WHERE hall_id=$1`
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

module.exports = {
  sqlCreateUser,
  sqlProjectById,
  sqlUserByLogin,
  sqlGetUser,
  sqlUpdateProjects,
  sqlDeleteProject,
  sqlDeleteTasksByProject,
  sqlClientData,
  sqlClientPlaces
}