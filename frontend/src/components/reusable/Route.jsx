/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { adminLinks, studentLinks } from '../../constants/index'
import SideNav from './SideNav';

export default function Route(props) {
    return (
      <>
        {props.userType === "student" &&
          studentLinks.map((nav) => (
            <SideNav
              key={nav.link}
              id={nav.id}
              link={nav.link}
              icon={nav.icon}
              title={nav.title}
              //   classNames={classNames}
            />
          ))}
  
        {props.userType === "admin" &&
          adminLinks.map((nav) => (
            <SideNav
              key={nav.link}
              id={nav.id}
              link={nav.link}
              icon={nav.icon}
              title={nav.title}
              //   classNames={classNames}
            />
          ))}
      </>
    );
  }