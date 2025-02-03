(async () => {
  const inputFile = document.querySelector('#file');
  const button = document.querySelector("#button");
  const link = document.querySelector("#link");
  const fileListContainer = document.querySelector("#fileList");

 
  const loadFileList =  () => {
          fetch("/filelist")
              .then(res => {return res.json();})
              .then(files => {
                  fileListContainer.innerHTML = files.map(fileUrl =>
                      `<li><a href="${fileUrl}" target="_blank">${fileUrl}</a></li>`
                  ).join('');
              });
  };

  const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("file", inputFile.files[0]);

      try {
          const res = await fetch("/upload", {
              method: 'POST',
              body: formData
          });
          const data = await res.json();
          link.href = data.url;
          loadFileList();
      } catch (e) {
          console.log(e);
      }
  };

  button.onclick = handleSubmit;

  loadFileList();
})();