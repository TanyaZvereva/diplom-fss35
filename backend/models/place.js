const sqlCreateCinemahall = {
  text: `INSERT INTO public.cinema_hall (count_x, count_y) VALUES ($1, $2)
    RETURNING id, count_x, count_y`
}

const sqlShowsCinemahall = {
  text: `SELECT * FROM public.cinema_hall`
}

const sqlUpdateCinemahall = {
  text: `UPDATE public.cinema_hall SET count_x=$1, count_y=$2, is_vip=$3, is_blocked=$4 WHERE id=$5
    RETURNING id, count_x, count_y, is_blocked`
}

const sqlUpdateCinemahallPrices = {
  text: `UPDATE public.cinema_hall SET price=$1, price_vip=$2 WHERE id=$3
    RETURNING *`
}

const sqlDeleteCinemahall = {
  text: `DELETE FROM public.cinema_hall WHERE id=$1`
}

const sqlCreatePlace = {
    text: `INSERT INTO public.place (hall_id, row, num) VALUES ($1, $2, $3)`
  }
  
  const sqlShowsPlace = {
    text: `SELECT * FROM public.place WHERE hall_id=$1`
  }
  
  const sqlUpdatePlace = {
    text: `UPDATE public.place SET is_vip=$1, is_blocked=$2 WHERE id=$3`
  }
  
  const sqlDeletePlace = {
    text: `DELETE FROM public.place WHERE id=$1;`
  }

module.exports = {
  sqlCreateCinemahall,
  sqlShowsCinemahall,
  sqlUpdateCinemahall,
  sqlUpdateCinemahallPrices,
  sqlDeleteCinemahall,
  sqlCreatePlace,
  sqlShowsPlace,
  sqlUpdatePlace,
  sqlDeletePlace
}