import SideNav from "../SideNav";
import { studentLinks } from '../../constants/index'

export default function StudentLinks() {
    return (
        <>
            {
                studentLinks.map((nav, index) => (
                    <SideNav
                        key={index}
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

