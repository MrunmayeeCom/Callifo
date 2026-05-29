import axios from "axios";

import API from "./AxiosInstance";

export const submitPartnerApplication = async (data: any) => {
const response = await API.post(
    "/api/partner-program/create",
    data
);
return response.data;
};
