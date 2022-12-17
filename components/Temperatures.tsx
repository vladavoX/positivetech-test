import moment from 'moment'

import styles from '../styles/Temperatures.module.css'

interface Props {
  data: any,
  dailyTemps: number[]
}

const Temperatures = ({ data, dailyTemps }: Props) => {
  let start_date = data.list[0].dt_txt
  let end_date = moment(data.list[data.list.length - 1].dt_txt).format('DD')
  let date = moment(start_date).format(`MMMM DD-${end_date} YYYY`)

  const average = dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length

  return (
    <div className={styles.temp}>
      <p className={styles.date}>{date}</p>
      <h1 className={styles.average}>{Math.trunc(average)}<sup>°C</sup></h1>
      <div className={styles.days}>
        {dailyTemps.map((temp, index) => (
          <div key={index}>
            <p className={styles.day}>{moment(start_date).add(index, 'days').format('dddd')}</p>
            <p className={styles.day_temp}>{temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Temperatures