import guitar from "../assets/guitar.png";
import google from "../assets/google.png";
import phone from "../assets/phone.png";
import { loginWithGoogle } from "../firebase/setup";
import { useNavigate } from "react-router-dom";

interface loginPopupProp {
  loginPop: boolean;
  setLoginPop: (value: boolean) => void;
  sellLogin: boolean;
  setSellLogin: (value: boolean) => void;
}
const Login = (props: loginPopupProp) => {
  const navigate = useNavigate();
  const googleSignIn = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      const user = result.user;
      console.log("Google Sign-In Success:", user);

      if (props.sellLogin) {
        navigate("/sell-product");
      } else {
        navigate("/");
      }

      props.setLoginPop(false);
      props.setSellLogin(false);
    } else {
      console.error("Google Sign-In Failed:", result.error);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
              <h1
                onClick={() => {
                  props.setLoginPop(false);
                  props.setSellLogin(false);
                }}
                className="font-semibold text-3xl cursor-pointer absolute top-5 right-5"
              >
                X
              </h1>
              <div className="sm:flex sm:items-center sm:justify-center">
                <div
                  style={{ marginTop: "35px" }}
                  className="sm:mt-0 text-center sm:ml-0 sm:text-left flex flex-col items-center"
                >
                  <div className="mt-2">
                    <img
                      src={guitar}
                      alt="guitar"
                      className="w-20 h-20 mx-auto"
                    />

                    <p className="text-base font-medium mt-5 text-center">
                      Help us become one of the safest places
                      <br /> to buy and sell
                    </p>

                    <div className="flex items-center border-2 border-black p-2 rounded-md mt-12 cursor-pointer w-full max-w-xs mx-auto">
                      <img src={phone} alt="phone" className="w-6 h-6" />
                      <h1 className="font-semibold ml-3">
                        Continue with Phone
                      </h1>
                    </div>

                    <div
                      onClick={googleSignIn}
                      className="flex items-center border border-gray-300 p-2 rounded-md mt-4 cursor-pointer w-full max-w-xs mx-auto"
                    >
                      <img src={google} alt="google" className="w-6 h-6" />
                      <h1 className="font-semibold ml-3">
                        Continue with Google
                      </h1>
                    </div>
                    <h1 className="text-center mt-4 font-semibold">OR</h1>

                    <h1 className="text-center mt-4 underline cursor-pointer font-semibold">
                      Login with Email
                    </h1>

                    <h1 className="text-center mt-20 text-xs">
                      All your personal details are safe with us.
                    </h1>
                    <h1 className="text-center mt-4 text-xs">
                      If you continue, you are accepting{" "}
                      <span className="text-blue-600">OLX Terms and</span>
                      <br />
                      <span className="text-blue-600">
                        Conditions and Privacy Policy
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
