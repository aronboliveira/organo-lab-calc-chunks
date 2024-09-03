import axios from "axios";
import { useEffect } from "react";
export default function AxiosNonceWrapper(): JSX.Element {
  const updateNonce = async (moduleId: number): Promise<void> => {
    try {
      const response = await axios.post(
        "https://blog.organolab.com.br/wp-admin/admin-ajax.php",
        {
          action: "forminator_get_nonce",
        }
      );
      document
        .querySelector(`#forminator-module-${moduleId} #forminator_nonce`)
        ?.setAttribute("value", response.data);
    } catch (e) {
      console.error(
        `Failed to update nonce for module ${moduleId}:\n${
          (e as Error).message
        }`
      );
    }
  };
  useEffect(() => {
    updateNonce(1707);
    updateNonce(1711);
    updateNonce(1712);
  }, []);
  return (
    <script
      type="text/javascript"
      defer
      id="axios-nonce-updater"
      crossOrigin="anonymous"
    ></script>
  );
}
