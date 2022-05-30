import styles from "./StarRating.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"


export default function StarRating(props) {

  let star = <FontAwesomeIcon className={styles.stars} style={{ fontSize: props.fontSize }} icon={faStar} />
  let starsContainer = ""

  if (props.rating > 2) {

    starsContainer = <div>
      <span>{star}</span>
      <span>{star}</span>
    </div>
  }

  if (props.rating > 4) {

    starsContainer = <div>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
    </div>
  }

  if (props.rating > 6) {

    starsContainer = <div>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
    </div>
  }

  if (props.rating > 8) {

    starsContainer = <div>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
      <span>{star}</span>
    </div>
  }

  return <div>{starsContainer}</div>
}