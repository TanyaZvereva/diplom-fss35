const sqlCreateSession = {
  text: `INSERT INTO public.session (time_start, time_end, movie_id) VALUES ($1, $2, $3)
    RETURNING id, time_start, time_end, movie_id`
}

const sqlShowsSession = {
  text: `SELECT * FROM public.session`
}

const sqlUpdateSession = {
  text: `UPDATE public.session SET time_start=$1, time_end=$2 WHERE id=$3
    RETURNING id, time_start, time_end`
}

const sqlDeleteSession = {
  text: `DELETE FROM public.session WHERE id=$1;`
}

const sqlCreateMovie = {
    text: `INSERT INTO public.movie (info) VALUES ($1)
      RETURNING info`
  }
  
  const sqlShowsMovie = {
    text: `SELECT * FROM public.movie`
  }
  
  const sqlUpdateMovie = {
    text: `UPDATE public.movie SET info=$1 WHERE id=$2
      RETURNING id, info`
  }
  
  const sqlDeleteMovie = {
    text: `DELETE FROM public.movie WHERE id=$1;`
  }

  module.exports = {
    sqlCreateSession,
    sqlShowsSession,
    sqlShowsSession,
    sqlDeleteSession,
    sqlCreateMovie,
    sqlShowsMovie,
    sqlUpdateMovie,
    sqlDeleteMovie
  }

