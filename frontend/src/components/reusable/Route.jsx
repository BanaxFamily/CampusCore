/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { adminLinks, deanLink, studentLinks } from "../../constants/index";
import SideNav from "./SideNav";

export default function Route(props) {
  return (
    <>
      {props.userType === "Student" &&
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

      {props.userType === "Admin" &&
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

      {props.userType === "Dean" &&
        deanLink.map((nav) => (
          <SideNav
            key={nav.link}
            id={nav.id}
            link={`${props.userType}/${nav.link}`}
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
