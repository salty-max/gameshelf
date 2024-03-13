import { useState, useCallback, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const usePortal = () => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const createPortal = useCallback(() => {
    let el = document.getElementById("portal-root");
    if (!el) {
      el = document.createElement("div");
      el.setAttribute("id", "portal-root");
      document.body.appendChild(el);
    }

    return el;
  }, []);

  useEffect(() => {
    const el = createPortal();
    setPortalElement(el);

    return () => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [createPortal]);

  const Portal: React.FC<PortalProps> = ({ children }) => {
    if (!portalElement) return null;
    return ReactDOM.createPortal(children, portalElement);
  };

  return Portal;
};

export default usePortal;
