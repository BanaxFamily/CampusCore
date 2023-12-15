/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { adminLinks, deanLink, facultyLinks, prcLink, studentLinks } from "../../constants/index";
import { useAuth } from "../../utils/AuthContext";
import SideNav from "./SideNav";

export default function Route(props) {
  const { userRole } = useAuth()
  return (
    <>
      {userRole === "Student" &&
        studentLinks.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={nav.link}
            icon={nav.icon}
            title={nav.title}
            onDismiss={props.onClose}

          //   classNames={classNames}
          />
        ))}
      {userRole === "Faculty" &&
        facultyLinks.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={nav.link}
            icon={nav.icon}
            title={nav.title}
            onDismiss={props.onClose}

          />
        ))}

      {userRole === "Admin" &&
        adminLinks.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={nav.link}
            icon={nav.icon}
            title={nav.title}
            classNames={props.className}
            openMobileMenu={props.openMobileMenu}
            onDismiss={props.onClose}
          />
        ))}

      {userRole === "Dean" &&
        deanLink.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={`${nav.link}`}
            icon={nav.icon}
            title={nav.title}
            classNames={props.className}
            openMobileMenu={props.openMobileMenu}
            onDismiss={props.onClose}
          />
        ))}

      {userRole === "PRC" &&
        prcLink.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={`${nav.link}`}
            icon={nav.icon}
            title={nav.title}
            classNames={props.className}
            openMobileMenu={props.openMobileMenu}
            onDismiss={props.onClose}
          />
        ))}
    </>
  );
}
