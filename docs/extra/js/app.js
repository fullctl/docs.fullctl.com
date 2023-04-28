(function($, $tc) {

window.fullctl = {
  urlparam : new URLSearchParams(window.location.search)
}

var fullctl = window.fullctl;

fullctl.template = function(name) {
  return $('[data-template="'+name+'"]').clone().attr("data-template",null);
}

fullctl.application = {}

fullctl.application.send_mail = function send_mail(subject, message="") {
  window.open("mailto:" + form_email + "?subject="
      + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(message));
}

fullctl.application.Component = $tc.define(
  "Component",
  {
    Component : function(name) {
      this.name = name;
      this.jquery = $('[data-component="'+name+'"]')
      var elements = this.elements = this.$e = {}
      var templates = this.templates = this.$t = {}

      this.widgets = this.$w = {};

      this.jquery.find('[data-element]').each(function(idx) {
        elements[$(this).data("element")] = $(this);
      });

      this.jquery.find('[data-template]').each(function(idx) {
        templates[$(this).data("template")] = $(this);
      });

      this.wire_elements();
    },

    template : function(name, appendTo) {
      var element = this.$t[name].clone().attr('data-template',null);
      if(appendTo)
        element.appendTo(appendTo)
      return element;
    },

    widget : function(name, fn) {
      fn = fn.bind(this);
      var widget = this.$w[name] = fn(this.$e, this.$t);
      return widget;
    },

    wire_elements : function() {
    }
  }
);

fullctl.application.Modal = $tc.extend(
  "Modal",
  {
    Modal : function(type, content) {
      this.Component("modal_"+type)
      this.set_content(content);

      var modal = this;

      content.find('.modal-action-note-text').each(function() {
        $(this).appendTo(modal.jquery.find('.modal-action-note'))
      });

      this.show();
    },
    show : function() {
      this.jquery.modal('show');
    },
    hide : function() {
      this.jquery.modal('hide');
    },
    set_content : function(content) {
      this.jquery.find('.modal-body').empty().append(content);
    }
  },
  fullctl.application.Component
);


/**
 * Sends request to aaactl through contact backend
 * (https://github.com/fullctl/aaactl/blob/contact-backend/docs/contact-form.md)
 *
 * @class fullctl.application.ContactForm
 * @extends twentyc.rest.Form
 */

fullctl.application.ContactForm = twentyc.cls.extend(
  "ContactForm",
  {
    ContactForm : function(jq, type="general", extra_info) {
      const base_url = jq.data("api-base");
      this.type = type;
      this.extra_info = extra_info;
      this.form_action = jq.data("api-action");
      this.submit_inline = jq.data("submit-inline") == "yes";
      this.Widget(base_url, jq);
    },

    payload : function() {
      const data = {};
      this.element.find('[data-api-submit="yes"]').each(function() {
        $(this).find("input,select,textarea").each(function() {
          const input = $(this)
          if(input.attr("type") == "checkbox") {
            if(input.prop("checked"))
              data[input.attr("name")] = true;
            else
              data[input.attr("name")] = false;
          } else {
            if (input.data("type") == "int") {
              data[input.attr("name")] = parseInt(input.val());
            } else if(input.data("type") == "bool") {
              data[input.attr("name")] = (input.val().toLowerCase() == "true" ?  true : false);
            } else {
              data[input.attr("name")] = input.val();
            }
          }
        });
      });

      const message = {};
      Object.keys(data).forEach(function(key) {
        if (!(key == "email" || key == "name")) {
          message[key] = data[key];
          delete data[key]
        }
      });

      data["message"] = message;
      data["type"] = this.type;
      if (this.extra_info) {
        Object.keys(this.extra_info).forEach((key) => {
          data.message[key] = this.extra_info[key];
        })
      }

      return data;
    }

  },
  twentyc.rest.Form
)


fullctl.application.ModalRequestDemo = $tc.extend(
  "ModalRequestDemo",
  {
    ModalRequestDemo: function (product="peerctl") {
      const modal = this;
      const form = this.form = new fullctl.application.ContactForm(
        fullctl.template("form_request_demo"),
        "general",
        {form: "request-demo"}
      );

      $(this.form).on("api-write:success", (ev, e, payload, response) => {
        modal.hide();
      });

      this.Modal("save", form.element);
      modal.form.element.find('[name="product"]').val(product);
      form.wire_submit(this.$e.button_submit);
    }
  },
  fullctl.application.Modal
);

$('[data-element="request-demo-btn"]').click(function() {
  const product = $(this).attr('data-product');
  if(product) {
    new fullctl.application.ModalRequestDemo(product);
  } else {
    new fullctl.application.ModalRequestDemo();
  }
})

fullctl.application.ModalContactUs = $tc.extend(
  "ModalContactUs",
  {
    ModalContactUs: function () {
      const modal = this;
      const form = this.form = new fullctl.application.ContactForm(
        fullctl.template("form_contact_us"),
        "general",
        {form: "contact-us"}
      );

      $(this.form).on("api-write:success", (ev, e, payload, response) => {
        modal.hide();
      });

      this.Modal("save", form.element);
      form.wire_submit(this.$e.button_submit);
    }
  },
  fullctl.application.Modal
);

$('[data-element="contact-us-btn"]').click(function () {
  new fullctl.application.ModalContactUs();
})

})(jQuery, twentyc.cls);