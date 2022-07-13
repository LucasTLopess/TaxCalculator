const form = document.getElementById("form");
const username = document.getElementById("username");
const cnpj = document.getElementById("cnpj");
const faturamentoMensal = document.getElementById("faturamento-mensal");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const cnpjValue = cnpj.value;
  const faturamentoMensalValue = faturamentoMensal.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }
  if (cnpjValue === "") {
    setErrorFor(cnpj, "O cnpj é obrigatório.");
  } else if (!validarCNPJ(cnpjValue)) {
    setErrorFor(cnpj, "Por favor, insira um CNPJ válido.");
  } else {
    setSuccessFor(cnpj);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem.");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O formulário está 100% válido!");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
function validarCNPJ(cnpj) {
 
  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;
   
  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
      cnpj == "11111111111111" || 
      cnpj == "22222222222222" || 
      cnpj == "33333333333333" || 
      cnpj == "44444444444444" || 
      cnpj == "55555555555555" || 
      cnpj == "66666666666666" || 
      cnpj == "77777777777777" || 
      cnpj == "88888888888888" || 
      cnpj == "99999999999999")
      return false;
       
  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;
         
  return true;
  
}
