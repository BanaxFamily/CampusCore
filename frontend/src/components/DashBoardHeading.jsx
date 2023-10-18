import PropTypes from 'prop-types'

const DashBoardHeading = (props) => {
    return ( 
        
        <div className=" bg-mainBlueColor w-full py-4 rounded-sm shadow-sm border border-slate-600  text-white">
            <h1 className={` text-[33px] pl-10 tracking-wider uppercase`} > {props.title } </h1>
        </div>
     );
}

DashBoardHeading.propTypes = {
    title: PropTypes.string
}
 
export default DashBoardHeading;