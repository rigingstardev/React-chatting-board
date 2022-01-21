export function removeCSSClass(ele, cls) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele, cls) {
    ele.classList.add(cls);
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;
export const toImageUrl = pathname => process.env.REACT_APP_IMAGE_URL + pathname;
