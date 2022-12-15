import moment from 'moment'

import styles from '../styles/Temperatures.module.css'

interface Props {
  data: any
}

const Temperatures = ({ data }: Props) => {
  let start_date = data.list[0].dt_txt
  let end_date = moment(data.list[data.list.length - 1].dt_txt).format('DD')
  let date = moment(start_date).format(`MMMM DD-${end_date} YYYY`)

  return (
    <div className={styles.temp}>
      <p className={styles.date}>{date}</p>
      <h1 className={styles.average}>10<sup>°C</sup></h1>
      <div className={styles.days}>
        <div>
          <p className={styles.day}>Monday</p>
          <p className={styles.day_temp}>10°C</p>
        </div>
        <div>
          <p className={styles.day}>Tuesday</p>
          <p className={styles.day_temp}>8°C</p>
        </div>
        <div>
          <p className={styles.day}>Wednesday</p>
          <p className={styles.day_temp}>11°C</p>
        </div>
        <div>
          <p className={styles.day}>Thursday</p>
          <p className={styles.day_temp}>11°C</p>
        </div>
        <div>
          <p className={styles.day}>Friday</p>
          <p className={styles.day_temp}>12°C</p>
        </div>
        <div>
          <p className={styles.day}>Saturday</p>
          <p className={styles.day_temp}>9°C</p>
        </div>
        <div>
          <p className={styles.day}>Sunday</p>
          <p className={styles.day_temp}>6°C</p>
        </div> 
      </div>
    </div>
  )
}

export default Temperatures