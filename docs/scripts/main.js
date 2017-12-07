"use strict";var FieldTypes=["short","paragraph","choices","dropdown","checkboxes","linear","title","grid","section","date","time","image","video"];Handlebars.registerHelper("ifType",function(e,t,n){return e.typeid===FieldTypes.indexOf(t)?n.fn(this):""}),Handlebars.registerHelper("fieldtype",function(e){return FieldTypes[e]}),Handlebars.registerHelper("legend",function(e,t){return t?e[e.length-1].label:e[0].label}),Handlebars.registerHelper("datePlaceholder",function(){return(new Date).toLocaleDateString()}),Handlebars.registerHelper("timePlaceholder",function(){return(new Date).toLocaleTimeString()});var bootstrapForm=Handlebars.compile('\n<form action="https://docs.google.com{{path}}/d/{{action}}/formResponse"\n      target="_self"\n      id="bootstrapForm"\n      method="POST">\n\n    {{#if title}}\n    <fieldset>\n        <h2>{{ title }}<br><small>{{desc}}</small></h2>\n    </fieldset>\n    {{/if}}\n    {{#each fields as |f|}}\n    \x3c!-- emptyline --\x3e\n    \x3c!-- emptyline --\x3e\n    \x3c!-- Field type: "{{ fieldtype f.typeid }}" id: "{{f.id}}" --\x3e\n    <fieldset>\n        <legend for="{{f.id}}">{{f.label}}</legend>\n        <div class="form-group">\n            {{#if f.desc}}\n            <p class="help-block">{{ f.desc }}</p>\n            {{/if}}\n\n            {{#ifType f \'short\'}}\n            <input id="{{f.widgets.0.id}}" type="text" name="entry.{{f.widgets.0.id}}" class="form-control" {{#if f.widgets.0.required}}required{{/if}}>\n            {{/ifType}}\n\n            {{#ifType f \'paragraph\'}}\n            <textarea id="{{f.widgets.0.id}}" name="entry.{{f.widgets.0.id}}" class="form-control" {{#if f.widgets.0.required}}required{{/if}}></textarea>\n            {{/ifType}}\n\n            {{#ifType f \'choices\'}}\n            {{#each f.widgets.0.options as |c|}}\n            <div class="radio">\n                {{#if c.custom}}\n                <label>\n                    <input type="radio" name="entry.{{f.widgets.0.id}}" value="__other_option__" {{#if f.widgets.0.required}}required{{/if}}>\n                </label>\n                <input type="text" name="entry.{{f.widgets.0.id}}.other_option_response" placeholder="custom value">\n                {{else}}\n                <label>\n                    <input type="radio" name="entry.{{f.widgets.0.id}}" value="{{c.label}}" {{#if f.widgets.0.required}}required{{/if}}>\n                    {{c.label}}\n                </label>\n                {{/if}}\n            </div>\n            {{/each}}\n            {{/ifType}}\n\n            {{#ifType f \'checkboxes\'}}\n            {{#each f.widgets.0.options as |c|}}\n            <div class="checkbox">\n                {{#if c.custom}}\n                <label>\n                    <input type="checkbox" name="entry.{{f.widgets.0.id}}" value="__other_option__" {{#if f.widgets.0.required}}required{{/if}}>\n                </label>\n                <input type="text" name="entry.{{f.widgets.0.id}}.other_option_response" placeholder="custom value">\n                {{else}}\n                <label>\n                    <input type="checkbox" name="entry.{{f.widgets.0.id}}" value="{{c.label}}" {{#if f.widgets.0.required}}required{{/if}}>\n                    {{c.label}}\n                </label>\n                {{/if}}\n            </div>\n            {{/each}}\n            {{/ifType}}\n\n            {{#ifType f \'dropdown\'}}\n            <select id="{{f.id}}" name="entry.{{f.widgets.0.id}}" class="form-control">\n                {{#unless f.widgets.0.required}}\n                <option value=""></option>\n                {{/unless}}\n                {{#each f.widgets.0.options as |c|}}\n                <option value="{{c.label}}">{{c.label}}</option>\n                {{/each}}\n            </select>\n            {{/ifType}}\n\n            {{#ifType f \'linear\'}}\n            <div>\n            {{#each f.widgets.0.options as |c|}}\n            <label class="radio-inline">\n                <input type="radio" name="entry.{{f.widgets.0.id}}" value="{{c.label}}" {{#if f.widgets.0.required}}required{{/if}}>\n                {{c.label}}\n            </label>\n            {{/each}}\n            </div>\n            <div>\n                <div>{{ legend f.widgets.0.options 0 }}: {{ f.widgets.0.legend.first }}</div>\n                <div>{{ legend f.widgets.0.options 1 }}: {{ f.widgets.0.legend.last }}</div>\n            </div>\n            {{/ifType}}\n\n            {{#ifType f \'grid\'}}\n            {{#each f.widgets as |w|}}\n            <div>\n                <span>{{w.name}}: </span>\n                {{#each columns as |c|}}\n                <label class="radio-inline">\n                    <input type="radio" name="entry.{{w.id}}" value="{{c.label}}" {{#if w.required}}required{{/if}}>\n                    {{c.label}}\n                </label>\n                {{/each}}\n            </div>\n            {{/each}}\n            {{/ifType}}\n\n            {{#ifType f \'title\' }}\n            {{/ifType}}\n\n            {{#ifType f \'section\' }}\n            {{/ifType}}\n\n            {{#ifType f \'date\' }}\n            <input type="date" id="{{f.widgets.0.id}}_date" placeholder="{{ datePlaceholder }}" class="form-control" {{#if f.widgets.0.required}}required{{/if}}>\n            {{#if f.widgets.0.options.time}}\n            <input type="time" id="{{f.widgets.0.id}}_time" placeholder="{{ timePlaceholder }}" class="form-control" {{#if f.widgets.0.required}}required{{/if}}>\n            {{/if}}\n            {{/ifType}}\n\n            {{#ifType f \'time\'}}\n            <input type="time" id="{{f.widgets.0.id}}" placeholder="{{ timePlaceholder }}" class="form-control" {{#if f.widgets.0.required}}required{{/if}}>\n            {{/ifType}}\n\n            {{#ifType f \'image\'}}\n            {{#if f.widgets.0.src}}\n                <img src="{{f.widgets.0.src}}" style="max-width: 100%;">\n            {{/if}}\n            {{/ifType}}\n\n            {{#ifType f \'video\'}}\n            {{#if f.widgets.0.src}}\n                <iframe src="{{f.widgets.0.src}}" style="width: 320px; height: 180px;"></iframe>\n            {{/if}}\n            {{/ifType}}\n\n        </div>\n    </fieldset>\n    {{/each}}\n\n    \x3c!-- emptyline --\x3e\n    <input type="hidden" name="fvv" value="1">\n    <input type="hidden" name="fbzx" value="{{fbzx}}">\n\n    \x3c!-- emptyline --\x3e\n    <input class="btn btn-primary" type="submit" value="Submit">\n</form>\n'),bootstrapJs=Handlebars.compile('\n// This script requires jQuery and jquery-form plugin\n// You can use these ones from Cloudflare CDN:\n// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"><\/script>\n// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js" integrity="sha256-2Pjr1OlpZMY6qesJM68t2v39t+lMLvxwpa8QlRjJroA=" crossorigin="anonymous"><\/script>\n//\n$(\'#bootstrapForm\').submit(function (event) {\n    event.preventDefault()\n    var extraData = {}\n    {{#each fields as |f|}}\n    {{#ifType f \'date\'}}\n    {\n        /* Parsing input date id={{f.widgets.0.id}} */\n        var dateField = $("#{{f.widgets.0.id}}_date").val()\n        var timeField = $("#{{f.widgets.0.id}}_time").val()\n        let d = new Date(dateField)\n\n        if (!isNaN(d.getTime())) {\n            extraData["entry.{{f.widgets.0.id}}_year"] = d.getFullYear()\n            extraData["entry.{{f.widgets.0.id}}_month"] = d.getMonth() + 1\n            extraData["entry.{{f.widgets.0.id}}_day"] = d.getUTCDate()\n        }\n\n        if (timeField && timeField.split(\':\').length >= 2) {\n            let values = timeField.split(\':\')\n            extraData["entry.{{f.widgets.0.id}}_hour"] = values[0]\n            extraData["entry.{{f.widgets.0.id}}_minute"] = values[1]\n        }\n    }\n    {{/ifType}}\n\n    {{#ifType f \'time\'}}\n    {\n        // Parsing input time id={{f.widgets.0.id}}\n        var field = $("#{{f.widgets.0.id}}").val()\n        if (field) {\n            var values = field.split(\':\')\n            extraData["entry.{{f.widgets.0.id}}_hour"] = values[0]\n            extraData["entry.{{f.widgets.0.id}}_minute"] = values[1]\n            extraData["entry.{{f.widgets.0.id}}_second"] = values[2]\n        }\n    }\n    {{/ifType}}\n    {{/each}}\n\n    $(\'#bootstrapForm\').ajaxSubmit({\n        data: extraData,\n        error: function () {\n            // Google Docs won\'t allow reading the response because of CORS, so this is handled as a failure.\n            alert(\'Form Submitted. Thanks.\')\n            // You can also redirect the user to a custom thank-you page:\n            // window.location = \'http://www.mydomain.com/thankyoupage.html\'\n        }\n    })\n})\n');$(function(){$('[data-toggle="tooltip"]').tooltip({trigger:"manual"})}),$("#example-action").click(function(e){e.preventDefault();var t=$("#example-url").attr("href");$("#input-url").val(t)}),$("#input-url").keypress(function(e){13===e.keyCode&&$("#button-fetch").click()}),$("#button-fetch").click(function(event){function showTooltip(e){try{$inputUrl.focus().attr("title",e).tooltip("fixTitle").tooltip("show"),setTimeout(function(){return $inputUrl.tooltip("hide")},2500)}catch(e){alert(e)}}function setCodeAsInnerText(e,t){t=t.split("\n").filter(function(e){return!!e.trim()}).map(function(e){return"\x3c!-- emptyline --\x3e"===e.trim()?"":e}).join("\n");var n=$(e);n.text(t),hljs.highlightBlock(n.get(0))}event.stopPropagation();var $inputUrl=$("#input-url"),url=$inputUrl.val();if(!url)return showTooltip("Don't forget the URL!");var $btnFetch=$("#button-fetch");$btnFetch.button("loading"),$.get(window.config.serverAddress+"/formdress?url="+url).fail(function(e){0===e.status?showTooltip("Sorry, service is unavailable at the moment"):e.responseJSON&&showTooltip(e.responseJSON.Error)}).done(function(context){var bootstrapCodeForm=bootstrapForm(context);setCodeAsInnerText("#target-bootstrap-html",bootstrapCodeForm);var bootstrapCodeJs=bootstrapJs(context);setCodeAsInnerText("#target-bootstrap-js",bootstrapCodeJs),$("#target-demo").html(bootstrapCodeForm),eval(bootstrapCodeJs),$("#main-area").removeClass("hidden"),$(".marketing-area").addClass("hidden")}).always(function(){return $btnFetch.button("reset")})});