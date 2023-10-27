import PropTypes from "prop-types"
import { adminLinks } from '../../constants/index'
import SideNav from '../SideNav'

const AdminLinks = (props) => {
  return (
    <>
      {
        adminLinks.map((nav) => (
          <SideNav
            key={nav.id}
            id={nav.id}
            link={nav.link}
            icon={nav.icon}
            title={nav.title}
            classname={props.classname}
          />
          
        ))
      }
    </>
  )
}

AdminLinks.propTypes = {
  classname: PropTypes.string
}

export default AdminLinks