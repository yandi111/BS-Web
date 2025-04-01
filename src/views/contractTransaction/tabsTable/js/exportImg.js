import html2canvas from "html2canvas";

export const ExportImg = (element, fliename, ext) => {
  html2canvas(element, {
    backgroundColor: null,
    useCORS: true,
    tainttest: true,
    logging: false,
  }).then((canvas) => {
    if (navigator.msSaveBlob) {
      const blob = canvas.msSaveBlob(); //IE10+
      return navigator.msSaveBlob(blob, name);
    } else {
      let imageurl = canvas.toDataURL("image/png");
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.download = `${fliename}.${ext}`;
      aLink.href = imageurl;
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    }
  });
};
