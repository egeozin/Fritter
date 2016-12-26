(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['all_the_freets'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"all-the-freets\"><h1> Explore all the freets!</h1></div>";
},"useData":true});
templates['form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"form-section\">\n	<label for=\"freet-item\">Post a Freet!</label>\n	<textarea class=\"u-full-width\" id=\"freet-item\"></textarea>\n	<button class=\"btn\" id=\"freet-post-button\">Post</button>\n	<div id=\"freets-list\"></div>\n</div>";
},"useData":true});
templates['freet'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    	<p class =\"refreeter\">"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + " Refreeted</p>\n    	<p class =\"username\">"
    + alias4(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data}) : helper)))
    + "</p>\n		<p class=\"freet-text\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<button type=\"button\" class=\"refreet-button\"></button>\n		<p class =\"username\">"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</p>\n		<p class=\"freet-text\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"freets-list_item\" data-id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n	<button type=\"button\" class=\"close\">&times;</button>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isRefreet : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['freet_items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.freet,depth0,{"name":"freet","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.freets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"usePartial":true,"useData":true});
templates['freets_list'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"freets-list\"></div>";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id= \"login-section\">\n    <p id = \"login\">If you already have an account, you can login!</p>\n    <div>\n    	<input placeholder=\"Name\" id=\"name-input-login\" type=\"text\">\n    	<span id='login-username' class=\"warning-login-username-1\"></span>\n    </div>\n    <div>\n    	<input value=\"\" id=\"password-input-login\" type=\"text\">\n    	<span id='login-password' class=\"warning-login-password-1\">You entered an empty string in one or more of the fields above!</span>\n    </div>\n    <button class=\"btn\" id=\"login-button\">Login</button>\n</div>";
},"useData":true});
templates['signup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id= \"signup-section\">\n	<p id = \"welcome\" >Welcome to Fritter!</p>\n	<p id = \"explain\">Fritter is an app that allows short and timely communication between users.\n	You can post and delete messages and explore the public postings of other users.</p>\n	<p id = \"insist\">Give it a shot, sign yourself up!</p>\n\n	<!-- <label for=\"name-input\" id=\"label\">Username:</label> -->\n		<div>\n      		<input placeholder=\"What's your name?\" id=\"name-input\" type=\"text\">\n      		<span id=\"signup-username\" class=\"warning-signup-username-1\"></span>\n      	</div>\n      	<div>\n      		<input value=\"\" id=\"password-input\" type=\"text\">\n      		<span id=\"signup-password\" class=\"warning-signup-password-1\">You entered an empty string in one or more of the fields above!</span>\n      	</div>\n      	<button class=\"btn\" id=\"signup-button\">Sign-up</button>\n\n</div>";
},"useData":true});
templates['user'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"users-list-item\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n\n";
},"useData":true});
templates['users'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.user,depth0,{"name":"user","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
})();