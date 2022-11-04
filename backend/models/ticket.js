const sqlCreateTicket = {
  text: `INSERT INTO public.ticket (place_id, movie_id, code) VALUES ($1, $2, $3)
    RETURNING id, place_id, movie_id, code`
}

const sqlShowsTicket = {
    text: `SELECT * FROM public.ticket`
  }
  
const sqlDeleteTicket = {
    text: `DELETE FROM public.ticket WHERE id=$1;`
}
  
module.exports = {
  sqlCreateTicket,
  sqlShowsTicket,
  sqlDeleteTicket
}