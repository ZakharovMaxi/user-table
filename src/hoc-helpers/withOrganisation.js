import {useMemo} from "react";
import {useApi} from "../hooks";

export default function withOrganisation(Wrapped) {
  return (props) => {
    const api = useApi();

    const organisation = useMemo(() => {
      return api.getOrganisation(props.user.organisationId);
    }, [props.user]);

    return <Wrapped {...props} organisation={organisation}/>
  }
}
