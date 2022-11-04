const sqlCreateCinemahall = {
  text: `INSERT INTO public.cinema_hall (count_x, count_y) VALUES ($1, $2)
    RETURNING id, count_x, count_y`
}

const sqlShowsCinemahall = {
  text: `SELECT * FROM public.111cinema_hall`
}

const sqlUpdateCinemahall = {
  text: `UPDATE public.cinema_hall SET count_x=$1, count_y=$2 WHERE id=$3
    RETURNING id, count_x, count_y`
}

const sqlDeleteCinemahall = {
  text: `DELETE FROM public.cinema_hall WHERE id=$1;`
}

const sqlCreatePlace = {
    text: `INSERT INTO public.place (hall_id, is_vip, row) VALUES ($1, $2, $3)
      RETURNING id, hall_id, is_vip, row`
  }
  
  const sqlShowsPlace = {
    text: `SELECT * FROM public.place WHERE hall_id=$1`
  }
  
  const sqlUpdatePlace = {
    text: `UPDATE public.place SET is_vip=$1 WHERE id=$2
      RETURNING id, hall_id, is_vip, row`
  }
  
  const sqlDeletePlace = {
    text: `DELETE FROM public.place WHERE id=$1;`
  }

module.exports = {
  sqlCreateCinemahall,
  sqlShowsCinemahall,
  sqlUpdateCinemahall,
  sqlDeleteCinemahall,
  sqlCreatePlace,
  sqlShowsPlace,
  sqlUpdatePlace,
  sqlDeletePlace
}