import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedProps {
  children: ReactNode;
}

interface PublicProps {
  children: ReactNode;
}

interface AdminProps {
  children: ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true} />;
  }
  return <>{children}</>;
};

export const Public: React.FC<PublicProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <>{children}</>;
  }
  return <Navigate to={"/"} replace={true} />;
};

export const Admin: React.FC<AdminProps> = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token")!);

  if ((user as { isAdmin: boolean }).isAdmin) {
    return <>{children}</>;
  }
  return <Navigate to={"/"} replace={true}></Navigate>;
};
