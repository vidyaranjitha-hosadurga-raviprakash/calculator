import { toast } from "react-toastify";

export const toastMsgConstant = {
  TOAST_ERROR: "TOAST_ERROR",
  TOAST_SUCCESS: "TOAST_SUCCESS",
  TOAST_INFO: "TOAST_INFO",
};

export const toastMsg = (message) => {
  switch (message.type) {
    case toastMsgConstant.TOAST_ERROR:
      return toast.error(`${message.msg}`, message.css);
    case toastMsgConstant.TOAST_SUCCESS:
      return toast.success(`${message.msg}`, message.css);
    case toastMsgConstant.TOAST_INFO:
      return toast.info(`${message.msg}`, message.css);
    default:
      return;
  }
};
