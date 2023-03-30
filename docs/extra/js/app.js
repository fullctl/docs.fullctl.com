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


fullctl.application.ModalRequestDemo = $tc.extend(
  "ModalRequestDemo",
  {
    ModalRequestDemo: function (product="peerctl") {
      var modal = this;
      var form = this.form = new twentyc.rest.Form(
        fullctl.template("form_request_demo")
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
  let product = $(this).attr('data-product');
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
      var modal = this;
      var form = this.form = new twentyc.rest.Form(
        fullctl.template("form_contact_us")
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
  if (fullctl.template("form_contact_us").attr("data-api-base")) {
    new fullctl.application.ModalContactUs();
  } else {
    fullctl.application.send_mail("Contact Us");
  }
})

})(jQuery, twentyc.cls);