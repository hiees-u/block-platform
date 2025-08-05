import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Page Not Found.</p>
      <p>You will be redirected to the homepage in 5 seconds...</p>
    </div>
  );
}

export default NotFoundPage;
