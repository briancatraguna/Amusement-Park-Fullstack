import { toast } from "react-toastify";

export const emitNotification = (type, message) => {
	const config = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	};

	return type === "info"
		? toast.info(message, config)
		: type === "success"
		? toast.success(message, config)
		: type === "error"
		? toast.error(message, config)
		: toast(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
		  });
};
