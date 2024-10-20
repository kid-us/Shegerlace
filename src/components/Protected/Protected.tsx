import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../services/request";
import { StockShoes } from "../../hooks/useStock";
import useAuth from "../../stores/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export interface UserProps {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  favorite: StockShoes[];
}

export interface User {
  user: UserProps;
}

const Protected = ({ children }: ProtectedProps) => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    if (access_token) {
      axios
        .get<User>(`${baseUrl}auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          login(
            response.data.user.id,
            response.data.user.username,
            response.data.user.email,
            response.data.user.phone_number,
            response.data.user.favorite
          );
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [access_token]);

  return children;
};

export default Protected;
