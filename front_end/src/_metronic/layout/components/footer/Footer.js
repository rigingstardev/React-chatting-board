import React, { useMemo } from "react";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-dark py-8 d-flex align-items-center justify-content-center ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`flex-column flex-md-row align-items-center justify-content-center`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">&copy;Kin affaire{"   "}{today.toString()}</span>
          <a
            href="http://keenthemes.com/metronic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-75 text-hover-primary"
          >

          </a>
        </div>
      </div>
    </div>
  );
}
