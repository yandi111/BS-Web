
import $confirm from "../components/s-confirm";

const releaseControl = () => {
  $confirm("tips", () => {
    zE('messenger', 'show');
    zE("messenger", "open");
  });
  throw "You have been disabled from this function";
};
export default releaseControl;
