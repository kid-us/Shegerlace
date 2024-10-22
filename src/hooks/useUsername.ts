import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";
import { User } from "../components/Protected/Protected";

const useUsername = () => {
  const [username, setUsername] = useState<string>();

  const access_token = localStorage.getItem("token");

  // Fetch Brands
  useEffect(() => {
    if (access_token) {
      axios
        .get<User>(`${baseUrl}auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          setUsername(response.data.user.username);
        });
    }
  }, [access_token]);

  return {
    username,
  };
};

export default useUsername;
