import API from "./AxiosInstance";

const API_KEY = "my-secret-key-123";

interface SyncCustomerPayload {
  name: string;
  email: string;
  source: string;
}

export const syncCustomer = async (data: SyncCustomerPayload) => {
  const res = await API.post(
    "/api/external/customer-sync",
    data,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );

  return res.data;
};

export const checkCustomerExists = async (email: string): Promise<boolean> => {
  const res = await API.post(
    "/api/external/customer-exists",
    { email },
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );

  return res.data.exists;
};