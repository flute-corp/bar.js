var Materializer = (function ($) {
  var $progress = $('#AjaxInProgress')

  function ajax (url, options) {
    $progress.show()
    return $.ajax(url, options).fail(ajaxError.bind(this)).always(function () {
      $progress.hide('slow')
    })
  }

  function getJSON (url, options, success) {
    $progress.show()
    return $.getJSON(url, options, success).fail(ajaxError.bind(this)).always(function () {
      $progress.hide('slow')
    })
  }

  function ajaxError (xhr) {
    $progress.hide('slow')

    function parseException (exception) {
      return $.map(exception, function (value, index) {
        if ($.isPlainObject(value) || $.isArray(value)) {
          return parseException(value) + '<br/>'
        } else {
          return index + ' : ' + value + '<br/>'
        }
      })
    }

    var data = xhr.responseText
    var $msg = $('<div>').append('<strong>Code status :</strong>').append('<span> ' + xhr.status + '</span>').append('<br/>').append('<strong>Réponse :</strong>').append('<span>' + xhr.statusText + '</span>').append('<br/>')
    if (data) {
      if (data.match(/<(.+)>/)) { // détection du HTML
        var $dom = $(data)
        var $symfonyException = $('.sf-reset', $dom)
        var $css = $($dom).find('link')
        var symfonyException
        if ($symfonyException[0]) {
          symfonyException = $('<div>').append($css).append($symfonyException).html()
        } else {
          symfonyException = $.parseHTML(data)
        }
        $msg.append('<strong>Réponse de serveur :</strong><br/>').append(symfonyException)
      } else if (data.match(/^[\[|\{]/)) { // JSON ?
        var json = JSON.parse(data)
        if (typeof json === 'object') {
          $msg.append('<br/><strong>Réponse du serveur (JSON) :</strong><br/><p>' + json.message + '</p>')
        } else {
          $msg.append('<br/><strong>Réponse du serveur :</strong><br/><p>' + data + '</p>')
        }
      }
    } else {
      $msg.append('<br/><strong>Aucune réponse du serveur</strong>')
    }
    this.createModal({
      'title': 'Erreur au chargement de la page',
      'content': $msg
    })
  }

  function toast (options) {
    var defaults = {
      toast: {
        message: '',
        displayLength: 2000,
        className: '',
        completeCallback: null
      },
      btn: []
    }
    var config = $.extend(true, {}, defaults, options)
    var $toast = $('<div>' + config.toast.message + '</div>')
    var defaultBtn = {
      label: '???',
      color: 'white',
      click: null
    }
    config.btn.forEach(function (v) {
      var btn = $.extend({}, defaultBtn, v)
      $('<a class="waves-effect waves-light btn-flat right ' + btn.color + '-text">' + btn.label + '</a>').appendTo($toast)
        .on('click', function (e) {
          if (btn.click && typeof btn.click == 'function') {
            btn.click.call(this, e)
          }
          Vel(
            $(this).closest('.toast'),
            {
              'opacity': 0,
              marginTop: '-40px'
            },
            {
              duration: 375,
              easing: 'easeOutExpo',
              queue: false
            }
          )
        })
    })
    Materialize.toast($toast, config.toast.displayLength, config.toast.className, config.toast.completeCallback)
  }

  var curModal = 0

  function createModal (options) {
    var optionsDefault = {
      'title': null,
      'content': 'Aucun contenu',
      'type': '',
      'ready': function () {},
      'complete': function () {
        $modal.remove()
      },
      'footer': {
        'Ok': {
          'classe': 'modal-close'
        }
      }
    }
    var settings = $.extend(optionsDefault, options)
    curModal++
    var $modal = $('<div id="modal' + curModal + '" class="modal ' + settings.type + '"></div>')
    var $modalContent = $('<div class="modal-content">')
    if (settings.title) $('<h4>').append(settings.title).appendTo($modalContent)
    var $modalContentContent = $('<p>').append(settings.content)
    var $modalFooter = $('<div class="modal-footer">')
    $.each(settings.footer, function (key, button) {
      var $button = $('<a href="#!" class=" modal-action waves-effect waves-green btn-flat ' + button.classe + '">' + key + '</a>')
      $button.on('click', function (e) {
        e.preventDefault()
      })
      if (button.callback) {
        button.callback($modal, $button)
      }
      $modalFooter.prepend($button)
    })
    $modalContent.append($modalContentContent)
    $modal.append($modalContent, $modalFooter)
    $('body').append($modal)
    $modal.modal(settings)
    $modal.modal('open')
    $modal.materializeLayout()
    return $modal
  }

  function createOverlay (options) {
    var optionsDefault = {
      'content': ''
    }
    var settings = $.extend(optionsDefault, options)
    $(settings.content)
      .css('margin', 'auto')
      .on('click', function (e) {
        e.stopPropagation()
      })
    var $overlay = $('<div class="lean-overlay valign-wrapper" style="z-index: 1002; display:flex; background: rgba(0, 0, 0, 0.5);"></div>').append(settings.content).appendTo($('body'))
    $overlay.on('click', function () {
      $overlay.animate({ opacity: 0 }, 500, function () {
        $overlay.remove()
        $overlay = null
      })
    })
    return $overlay
  }

  /**
   * Function serializeObject
   * @return Object : Le résultat de la serialization d'un formulaire sous format d'objet key => value
   */
  $.fn.serializeObject = function (forceObject) {

    var self = this,
      json = {},
      push_counters = {},
      patterns = {
        'validate': /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
        'key': /[a-zA-Z0-9_]+|(?=\[\])/g,
        'push': /^$/,
        'fixed': /^\d+$/,
        'named': /^[a-zA-Z0-9_]+$/
      }

    this.build = function (base, key, value) {
      if (forceObject) base = {}
      base[key] = value
      return base
    }

    this.push_counter = function (key) {
      if (push_counters[key] === undefined) {
        push_counters[key] = 0
      }
      return push_counters[key]++
    }

    $.each($(this).serializeArray(), function () {

      // skip invalid keys
      if (!patterns.validate.test(this.name)) {
        return
      }

      var k,
        keys = this.name.match(patterns.key),
        merge = this.value,
        reverse_key = this.name

      while ((k = keys.pop()) !== undefined) {

        // adjust reverse_key
        reverse_key = reverse_key.replace(new RegExp('\\[' + k + '\\]$'), '')

        // push
        if (k.match(patterns.push)) {
          merge = self.build([], self.push_counter(reverse_key), merge)
        }

        // fixed
        else if (k.match(patterns.fixed)) {
          merge = self.build([], k, merge)
        }

        // named
        else if (k.match(patterns.named)) {
          merge = self.build({}, k, merge)
        }
      }

      json = $.extend(true, {}, json, merge)
    })

    return json
  }
  $.fn.deserializeObject = function (oForm) {
    function deserializeForm (xTableau, oResult, sRoot) {
      if (oResult === undefined) {
        oResult = {}
      }
      if (sRoot === undefined) {
        sRoot = ''
      }
      var sType = typeof xTableau
      if (xTableau === null) {
        sType = 'null'
      }

      switch (sType) {
        case 'object':
          for (var iKey in xTableau) {
            deserializeForm(
              xTableau[iKey],
              oResult,
              sRoot + (sRoot ? '[' : '') + iKey + (sRoot ? ']' : '')
            )
          }
          break

        default:
          oResult[sRoot] = xTableau
      }
      return oResult
    }
    var $el, val, $this = this
    oForm = deserializeForm(oForm)
    for (var key in oForm) {
      val = oForm[key]
      $el = $this.find('[name="' + key + '"]')
      switch ($el.attr('type')) {
        case 'checkbox':
          $el = $el.filter(function () { return this.value == val }).prop('checked', true)
          break
        default:
          $el.val(val)
          break
      }
      $el.trigger('change')
    }
    return this
  }

  /**
   * Méthode de convertion automatique du HTML au materialize
   *
   * @return : this
   */
  $.fn.materializeLayout = function () {
    $(this).each(function () {
      var $this = $(this)
      // transformation des select
      $('select', $this).material_select()
      $('button[type=\'submit\']', $this).each(function () {
        if (!$(this).hasClass('btn')) {
          $(this).append('<i class="material-icons right">send</i>')
        }
      })
      $('button', $this).each(function () {
        if (!$(this).hasClass('btn')) {
          $(this).addClass('btn waves-effect waves-light')
        }
      })
      $('ul.tabs').tabs()
    })
    return this
  }

  return {
    ajax: ajax,
    getJSON: getJSON,
    createModal: createModal,
    createOverlay: createOverlay,
    toast: toast
  }
})(jQuery)
