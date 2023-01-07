const sqlCreateSession = {
  text: `INSERT INTO public.session (time_start, cinemahall_id, movie_id) VALUES ($1, $2, $3)
    RETURNING id, time_start, cinemahall_id, movie_id`
}

const sqlShowsSession = {
  text: `SELECT time_start, cinemahall_id, movie_id, movie.info, movie.duration  FROM public.session
        INNER JOIN public.movie on movie.id = session.movie_id
        ORDER BY cinemahall_id`
}

const sqlUpdateSession = {
  text: `UPDATE public.session SET time_start=$1, time_end=$2 WHERE id=$3
    RETURNING id, time_start, time_end`
}

const sqlDeleteSession = {
  text: `DELETE FROM public.session WHERE id=$1;`
}

const sqlCreateMovie = {
    text: `INSERT INTO public.movie (info, duration) VALUES ($1, $2)
      RETURNING info`
  }
  
  const sqlShowsMovie = {
    text: `SELECT * FROM public.movie`
  }
  
  const sqlUpdateMovie = {
    text: `UPDATE public.movie SET info=$1, duration=$3 WHERE id=$2
      RETURNING id, info, duration`
  }
  
  const sqlDeleteMovie = {
    text: `DELETE FROM public.movie WHERE id=$1;`
  }

  module.exports = {
    sqlCreateSession,
    sqlShowsSession,
    sqlDeleteSession,
    sqlCreateMovie,
    sqlShowsMovie,
    sqlUpdateMovie,
    sqlDeleteMovie
  }

