import styles from "../DisplayMessage/DisplayMessage.module.css"
import PropTypes from "prop-types";

export default function DisplayMessage(props) {

  let messageType = ""

  if (props.messageType === "error") {
    messageType = styles.error
  } else if (props.messageType === "warning") {
    messageType = styles.warning
  } else if (props.messageType === "success") {
    messageType = styles.success
  } else {
    messageType = ""
  }

  return <div className={`${styles.message} ${messageType}`}>{props.children}</div>
}

DisplayMessage.propTypes = {
  messageType: PropTypes.oneOf(['error', 'warning', 'success']),
  children: PropTypes.node.isRequired,
};