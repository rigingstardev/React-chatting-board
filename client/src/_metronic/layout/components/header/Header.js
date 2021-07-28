import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { Topbar } from "./Topbar";
import { HeaderMenuWrapper } from "./header-menu/HeaderMenuWrapper";
import { AnimateLoading } from "../../../_partials/controls";
import { toAbsoluteUrl } from './../../../_helpers/AssetsHelpers';
import { Link } from 'react-router-dom';

export function Header() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      )
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header bg-dark ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}
        <div className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}>
          <AnimateLoading />
          {/*begin::Header Logo*/}
          <div className="header-logo d-lg-block d-md-none d-none m-7">
            <Link to="/">
              <img
                alt="Logo"
                className="max-h-70px max-w-350px w-100"
                src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
              />
            </Link>
          </div>
          {/*end::Header Logo*/}
          {/*begin::Header Menu Wrapper*/}
          {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          {!layoutProps.menuHeaderDisplay && <div />}
          {/*end::Header Menu Wrapper*/}

          {/*begin::Topbar*/}
          {/* <Topbar /> */}
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
