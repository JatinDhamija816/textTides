import { toast } from "sonner";

const useShowToasts = () => {
  const showToast = (message: string, isError: boolean = true) => {
    toast(message, {
      duration: 4000,
      style: {
        backgroundColor: isError ? "#c75f61" : "#43e03a",
        color: "white",
        border: isError ? "1px solid darkred" : "1px solid darkgreen",
      },
    });
  };

  return { showToast };
};

export default useShowToasts;
