import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      alert("Password updated ✅");
    } catch (err) {
      alert("Invalid or expired token ❌");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}