import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className=" container text-center mt-5">

			<Link to="/new-contact">   
				<div className="d-flex justify-content-end">
					<button type="button" className="btn btn-success">Add new contact </button>
				</div >
			</Link>
			<div className="d-flex justify-contect-around mt-5 border">
				<div className="col mt-3 mb-3">
					<img src="https://picsum.photos/id/237/150/150" className="rounded-circle" alt="..."></img>
				</div>
				<div className="col d-flex flex-column justify-content-center align-items-start" >
						<h3>Mike Anamendolla</h3>
						<div className="font-serif "><i className="fa-solid fa-location-dot" ></i> 5842 Hillcrest Rd</div>
						<div className="font-serif "><i className="fa-solid fa-phone-flip"></i> (870) 288-4149</div>
						<div className="font-serif "><i className="fa-solid fa-envelope "></i> mike_ana@example.com </div>
				</div>
				<div className="col d-flex justify-content-center ms-5 mt-4 ">
					<i className="fa-solid fa-pencil aling-end mx-5"></i>
                	<i className="fa-solid fa-trash"></i>
				</div>
			</div>	
			<div className="d-flex justify-contect-around border">
				<div className="col mt-3 mb-3">
					<img src="https://picsum.photos/id/237/150/150" className="rounded-circle" alt="..."></img>
				</div>
				<div className="col d-flex flex-column justify-content-center align-items-start" >
						<h3>Mike Anamendolla</h3>
						<div className="font-serif "><i className="fa-solid fa-location-dot" ></i> 5842 Hillcrest Rd</div>
						<div className="font-serif "><i className="fa-solid fa-phone-flip"></i> (870) 288-4149</div>
						<div className="font-serif "><i className="fa-solid fa-envelope "></i> mike_ana@example.com </div>
				</div>
				<div className="col d-flex justify-content-center ms-5 mt-4 ">
					<i className="fa-solid fa-pencil aling-end mx-5"></i>
                	<i className="fa-solid fa-trash"></i>
				</div>
			</div>	
			<div className="d-flex justify-contect-around border">
				<div className="col mt-3 mb-3">
					<img src="https://picsum.photos/id/237/150/150" className="rounded-circle" alt="..."></img>
				</div>
				<div className="col d-flex flex-column justify-content-center align-items-start" >
						<h3>Mike Anamendolla</h3>
						<div className="font-serif "><i className="fa-solid fa-location-dot" ></i> 5842 Hillcrest Rd</div>
						<div className="font-serif "><i className="fa-solid fa-phone-flip"></i> (870) 288-4149</div>
						<div className="font-serif "><i className="fa-solid fa-envelope "></i> mike_ana@example.com </div>
				</div>
				<div className="col d-flex justify-content-center ms-5 mt-4 ">
					<i className="fa-solid fa-pencil aling-end mx-5"></i>
                	<i className="fa-solid fa-trash"></i>
				</div>
			</div>	
			
		</div>
	);
}; 