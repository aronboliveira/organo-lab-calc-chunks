const forminatorProps = {
  ajaxUrl: "https://blog.organolab.com.br/wp-admin/admin-ajax.php",
  cform: {
    processing: "Enviando formulário, por favor espere",
    error: "An error occurred while processing the form. Please try again",
    upload_error:
      "An upload error occurred while processing the form. Please try again",
    pagination_prev: "Anterior",
    pagination_next: "Próximo",
    pagination_go: "Enviar",
    gateway: {
      processing: "Processando pagamento, aguarde",
      paid: "Sucesso! Pagamento confirmado. Enviando Formulário, aguarde!",
      error: "Erro! Algo deu errado ao verificar o pagamento",
    },
    captcha_error: "CAPTCHA Inválido",
    no_file_chosen: "Nenhum arquivo selecionado ainda",
    intlTelInput_utils_script:
      "https://blog.organolab.com.br/wp-content/plugins/forminator/assets/js/library/intlTelInputUtils.js",
    process_error: "Por favor, tente novamente",
  },
  poll: {
    processing: "Enviando voto, aguarde",
    error: "Ocorreu um erro ao salvar o voto. Por favor tente novamente",
  },
  quiz: {
    view_results: "View Results",
  },
  select2: {
    load_more: "Carregando mais resultados...",
    no_result_found: "Nenhum resultado encontrado",
    searching: "Procurando...",
    loaded_error: "Os resultados não puderam ser carregados.",
  },
};
export default forminatorProps;
