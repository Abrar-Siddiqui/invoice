import { CLOSE_DRAWER, LOGIN, LOGOUT, OPEN_DRAWER, TOGGLE_DRAWER,PDF_DOC } from "./actions.js";

export default function reducer(state, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, auth: { currentUser: payload.data, token: payload.token } };
        case LOGOUT:
            return { ...state, auth: { currentUser: null, token: null } };
        case OPEN_DRAWER:
            return { ...state, drawerOpen: true };
        case CLOSE_DRAWER:
            return { ...state, drawerOpen: false };
        case TOGGLE_DRAWER:
            return { ...state, drawerOpen: !state.drawerOpen };
        case PDF_DOC:
      return {
        ...state,
        pdfDoc: {
          title: payload.title,
          column: payload.column,
          data: payload.data,
          generalData:payload.generalData,
        },
      };
        default:
            return state;
    }
}