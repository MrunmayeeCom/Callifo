import AxiosInstance from "./AxiosInstance";

export const createCustomerSupport = async (payload: {
  fullName: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  inquiryType: string;
  subject: string;
  message: string;
  source: "CALLIFO" | "WORKEYE" | "TALLY" | "MEETHUB" | "GEOTRACK" | "OTHER";
}) => {
  const response = await AxiosInstance.post(
    "api/customer-support",
    payload
  );
  return response.data;
};