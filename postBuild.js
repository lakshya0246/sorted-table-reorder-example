const fse = require("fs-extra");

function copyBuildFolder() {
  console.log("Copying build files...");
  fse
    .copy("dist/table-sort-test", "../website/table-sort-test", {
      overwrite: true,
    })
    .then(() => {
      console.log("Copied successfully!");
    })
    .catch((e) => {
      console.error("There was and error while copying build files", e);
    });
}

copyBuildFolder();
