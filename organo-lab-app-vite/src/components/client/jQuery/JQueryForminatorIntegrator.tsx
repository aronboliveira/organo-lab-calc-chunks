import { useEffect } from "react";
import $ from "jquery";
//@ts-ignore
import loadJQuery from "../../../lib/head/js/jquery/jquery";
//@ts-ignore
import loadJQueryMigrate from "../../../lib/head/js/jquery/jquery-migrate";
//@ts-ignore
import loadJQueryInputMask from "../../../lib/head/js/forminator/jquery-inputmask";
//@ts-ignore
import loadJQueryValidate from "../../../lib/head/js/forminator/jquery.validate";
//@ts-ignore
import loadForminatorForm from "../../../lib/head/js/forminator/ui/forminator-form";
//@ts-ignore
import loadHoverIntent from "../../../lib/head/js/wp/hoverIntent";
//@ts-ignore
import loadInputMask from "../../../lib/head/js/forminator/inputmask";
//@ts-ignore
import loadInputMaskBinding from "../../../lib/head/js/forminator/inputmask-binding";
//@ts-ignore
import loadFlatsome from "../../../lib/head/js/flatsome/flatsome";
//@ts-ignore
import loadFlatsomeLiveSearch from "../../../lib/head/js/flatsome/flatsome-live-search";
export default function JQueryForminatorIntegrator(): JSX.Element {
  useEffect(() => {
    const jQuery = loadJQuery();
    loadJQueryMigrate();
    loadJQueryValidate();
    loadJQueryInputMask(jQuery);
    loadInputMask();
    loadInputMaskBinding();
    loadHoverIntent();
    loadForminatorForm();
    loadFlatsome(jQuery);
    loadFlatsomeLiveSearch(jQuery);
    const initializeForminatorModule = (moduleId: number): void => {
      (window as any).Forminator_Cform_Paginations =
        (window as any).Forminator_Cform_Paginations || [];
      (window as any).Forminator_Cform_Paginations[moduleId] = {
        "has-pagination": false,
        "pagination-header-design": "show",
        "pagination-header": "nav",
        "last-steps": "Terminar",
        "last-previous": "Anterior",
        "pagination-labels": "default",
        "has-paypal": false,
      };
      const runForminatorFront = (
        forminatorFront: any
      ): JQuery<HTMLElement> => {
        console.log("FORMINATOR FRONT");
        console.log(forminatorFront);
        return $(
          `#forminator-module-${moduleId}[data-forminator-render="0"]`
        ).forminatorFront({
          form_type: "custom-form",
          inline_validation: true,
          print_value: false,
          rules: '"number-1": {"minNumber": 1,"maxNumber": 1001,}',
          messages: `"number-1": {
          "number": "Este não é um número válido.",
          "min": "Por favor digite um valor maior ou igual à {0}.",
          "max": "Por favor digite um valor menor ou igual à {0}.",
        }`,
          conditions: {
            fields: [],
            relations: {
              "calculation-5": [],
              "calculation-8": [],
              "calculation-10": [],
              "calculation-7": [],
              "calculation-4": [],
              "calculation-9": [],
              "calculation-6": [],
              "calculation-1": [],
              "calculation-2": [],
              "calculation-3": [],
              "number-1": [],
              "group-1": [],
              "group-2": [],
              submit: [],
            },
          },
          calendar: `{"days":["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],"months":["Jan","Fev","Mar","Abr","Maio","Jun","Jul","Ago","Set","Out","Nov","Dec"]}`,
          paypal_config: {
            live_id: "",
            sandbox_id: "",
            redirect_url: "https://blog.organolab.com.br/calculadora-de-solo",
            form_id: moduleId,
          },
          forminator_fields: [
            "address",
            "calculation",
            "captcha",
            "consent",
            "currency",
            "custom",
            "date",
            "email",
            "gdprcheckbox",
            "group",
            "hidden",
            "html",
            "checkbox",
            "name",
            "number",
            "page-break",
            "password",
            "paypal",
            "phone",
            "postdata",
            "radio",
            "section",
            "select",
            "stripe",
            "text",
            "textarea",
            "time",
            "upload",
            "url",
          ],
          general_messages: {
            calculation_error: "Falha ao calcular campo.",
            payment_require_ssl_error:
              "SSL obrigatório para envio deste formulário, favor verificar seu URL.",
            payment_require_amount_error:
              "O valor do PayPal deve ser maior que 0.",
            form_has_error: "Corrija os erros antes de enviar.",
          },
          payment_require_ssl: false,
          has_loader: true,
          loader_label: "Enviando...",
          calcs_memoize_time: 300,
          is_reset_enabled: true,
          has_stripe: false,
          has_paypal: false,
          submit_button_class: "",
        });
      };
      if (typeof window.ForminatorValidationErrors !== "undefined") {
        $(window.ForminatorValidationErrors.selector)
          .data("forminatorFrontSubmit")
          ?.show_messages(window.ForminatorValidationErrors.errors);
      }
      if (typeof window.ForminatorFormHider !== "undefined") {
        const forminatorFront = $(window.ForminatorFormHider.selector).data(
          "forminatorFront"
        );
        forminatorFront?.forminator_selector &&
          $(forminatorFront.forminator_selector)
            .find(
              ".forminator-row, .forminator-pagination-steps, .forminator-pagination-footer"
            )
            .hide();
        window.elementorFrontend?.hooks
          ? window.elementorFrontend.hooks.addAction(
              "frontend/element_ready/global",
              runForminatorFront
            )
          : runForminatorFront(forminatorFront);
      }
      typeof window.ForminatorFormNewTabRedirect !== "undefined" &&
        open(window.ForminatorFormNewTabRedirect.url, "_blank");
    };
    initializeForminatorModule(1707);
    initializeForminatorModule(1711);
    initializeForminatorModule(1712);
  }, []);
  return (
    <script
      type="text/javascript"
      defer
      id="jquery-forminator-integrator"
      crossOrigin="anonymous"
    ></script>
  );
}
