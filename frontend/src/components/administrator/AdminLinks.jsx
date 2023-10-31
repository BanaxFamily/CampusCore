import { adminLinks } from '../../constants/index'
import SideNav from '../SideNav'

const AdminLinks = () => {
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
          />
          
        ))
      }
    </>
  )
}


export default AdminLinks