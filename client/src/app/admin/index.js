import React, { useState } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { makeStyles} from "@material-ui/core";

function AdminPage(props) {

    const useStyles = makeStyles(theme => ({

    }));
    return (
        <div className="container">
            <h1 className="text-uppercase text-white-50 text-center my-10">entrepreneurs et professionnels congolais et d’ailleurs</h1>
        </div>
    )
}

export default injectIntl(connect(null, null)(AdminPage));
