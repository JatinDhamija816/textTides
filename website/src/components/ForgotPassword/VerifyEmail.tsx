import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail, verifyOtp } from "../../../utils/api/apiCalls";
import useShowToasts from "../../../utils/hooks/showToasts";

const VerifyEmail = () => {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOTP] = useState("");
  const [verifyCode, setVerifyCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [resendTimer, setResendTimer] = useState(60);
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();
  const OTP_LENGTH = 6;

  useEffect(() => {
    if (resendTimer > 0 && verifyCode) {
      const timerId = setTimeout(
        () => setResendTimer((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timerId);
    }
  }, [resendTimer, verifyCode]);

  const { showToast } = useShowToasts();

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      showToast("Please enter your email or username.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyEmail(identifier);
      if (res.success) {
        setVerifyCode(true);
        setResendTimer(60);
        showToast(res.message, false);
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length < OTP_LENGTH) {
      showToast(`Please enter a valid OTP of ${OTP_LENGTH} digits.`);
      return;
    }

    if (attemptsLeft === 0) {
      showToast("No attempts left. Please resend the OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(identifier, otp);
      if (res.success) {
        navigate("/forgotPassword", {
          state: { identifier },
        });
      } else {
        setAttemptsLeft((prevAttempts) =>
          prevAttempts > 0 ? prevAttempts - 1 : 0
        );
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    if (attemptsLeft <= 0) {
      showToast("Try after sometimes max limit reached", false);
      setBlocked(true);
      return;
    }
    setLoading(true);
    try {
      const res = await verifyEmail(identifier);
      if (res.success) {
        setResendTimer(60);
        showToast("OTP resent successfully!", false);
        setAttemptsLeft(attemptsLeft - 1);
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="px-8 py-10 flex-1 flex items-center justify-center">
        <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg md:max-w-sm w-full">
          <p className="font-bold text-2xl text-center text-gray-100 py-5">
            Forgot Password
          </p>

          <div className="flex flex-col">
            <label htmlFor="identifier" className="font-semibold text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="Email or Username"
              required
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={identifier}
              disabled={verifyCode}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          {verifyCode && (
            <div className="flex flex-col my-5">
              <label htmlFor="Otp" className="font-semibold text-gray-300">
                OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={OTP_LENGTH}
                pattern="\d*"
                required
                className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />

              <p className="text-gray-400 text-sm">
                Attempts Left: {attemptsLeft}
              </p>

              <p className="text-blue-500 text-right mt-2 hover:underline cursor-pointer">
                <Link
                  to={""}
                  onClick={handleResendOtp}
                  className={
                    resendTimer === 0 ? "" : "pointer-events-none opacity-50"
                  }
                  title={
                    resendTimer > 0
                      ? `Please wait ${resendTimer}s to resend.`
                      : ""
                  }
                >
                  Resend OTP {resendTimer > 0 && `in ${resendTimer}s`}
                </Link>
              </p>
            </div>
          )}

          <div className="flex justify-center mt-10">
            <button
              onClick={verifyCode ? handleVerifyCode : handleVerifyEmail}
              className="border w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
              disabled={blocked || loading}
            >
              {blocked
                ? "Try after sometime"
                : loading
                ? "Please wait..."
                : verifyCode
                ? "Verify Code"
                : "Send Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
