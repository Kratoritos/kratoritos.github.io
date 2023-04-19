

function send() {
    // Obtener el archivo XSL del input file
const inputFile = document.getElementById('input');
const file = inputFile.files[0];

// Codificar el archivo XSL en Base64
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function () {
  const fileData = reader.result.split(',')[1];

  // Construir el objeto JSON de la petición
  const requestBody = {
    'file': {
      'filename': file.name,
      'data': fileData
    }
  };

  // Realizar la solicitud HTTP POST
  fetch('https://tragical-articles.000webhostapp.com/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    // Manejar la respuesta del servidor
    if (response.ok) {
      response.blob().then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.xsl', '.csv');
        a.click();
      });
    } else {
      console.log('Error al enviar la solicitud');
    }
  })
  .catch(error => {
    console.log('Error al enviar la solicitud:', error);
  });
};
}