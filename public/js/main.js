"use strict";function ReadUsers(){$.ajax({url:"/read-users",type:"POST",contentType:"application/json",data:""}).done(function(a){$(document).ready(function(){for(var t in a.response)$("tbody#content_0--body").append('\n\t\t\t\t\t<tr class="animated fadeIn faster">\n\t\t\t\t\t<td>'.concat(a.response[t].Office,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].LastName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].FirstName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].MiddleName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].Email,'</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<button class="btn btn-warning btn-sm mr-2" id="userUpdate" type="button" data-id="').concat(t,'" data-toggle="modal" data-target="#updateUser">\n\t\t\t\t\t\t\t<span>Редактировать</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="btn btn-danger btn-sm" id="userDelete" type="button" data-id="').concat(t,'">\n\t\t\t\t\t\t\t<span>Удалить</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t'))})})}function ReadData(c,s){function l(t){return t<10?"0".concat(t):t}$.ajax({url:"/read-data",type:"POST",contentType:"application/json",data:JSON.stringify({Arr:c})}).done(function(r){$(document).ready(function(){var t="";for(var a in r)if(0!==r[a].length&&(t+="<tr>","user"!==r[a]))for(var n in r[a]){for(var e in r[a][n])if("_id"!==e){if(console.log(e),"Date"===e){var o=new Date(r[a][n].Date);r[a][n].Date="".concat(l(o.getDate()),"-").concat(l(o.getMonth()+1),"-").concat(o.getFullYear())}if("ValidUntil"===e){var i=new Date(r[a][n].ValidUntil);r[a][n].ValidUntil="".concat(l(i.getDate()),"-").concat(l(i.getMonth()+1),"-").concat(i.getFullYear())}if("Status"!==e)"Starttime"!==e&&(t+="Endtime"!==e?"<td>".concat(r[a][n][e],"</td>"):"<td>".concat(r[a][n].Starttime," - ").concat(r[a][n].Endtime,"</td>"));else switch(r[a][n][e]){case"Отправлено":t+="<td>Новая</td>";break;case"Просмотрено":t+='<td id="viewed">'.concat(r[a][n][e],"</td>");break;case"Обработано":t+='<td id="processed">'.concat(r[a][n][e],"</td>");break;case"Отклонено":t+='<td id="rejected">'.concat(r[a][n][e],"</td>")}}if("Отправлено"!==r[a][n].Status&&"Просмотрено"!==r[a][n].Status||"user"===r.role?t+='<td><button class="btn btn-outline-danger btn-sm" id="deleteDecl" data-id="'.concat(r[a][n]._id,'" data-userID="').concat(a,'" data-storage="').concat(c,'">Удалить</button></td>'):(t+="<td>",t+='<button class="btn btn-primary btn-sm mr-2" id="processedDecl" data-id="'.concat(r[a][n]._id,'" data-userID="').concat(a,'" data-storage="').concat(c,'">\n\t\t\t\t\t\t\t\t\t   <div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Обработана</button>'),t+='<button class="btn btn-danger btn-sm mr-2" id="rejectedDecl" data-id="'.concat(r[a][n]._id,'" data-userID="').concat(a,'" data-storage="').concat(c,'">\n\t\t\t\t\t\t\t\t\t   <div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Отклонить</button>'),t+='<button class="btn btn-outline-danger btn-sm" id="deleteDecl" data-id="'.concat(r[a][n]._id,'" data-userID="').concat(a,'" data-storage="').concat(c,'">\n\t\t\t\t\t\t\t\t\t   <div class="spinner-border spinner-border-sm text-light mr-2 d-none" role="status"></div>Удалить</button>'),t+="</td>"),t+="</tr>","Отправлено"===r[a][n].Status){var d={id:r[a][n]._id,storage:c,status:"Просмотрено"};$.ajax({url:"/update-status",method:"POST",contentType:"application/json",data:JSON.stringify(d)}).done(function(){$.ajax({url:"/get-counters",type:"POST",contentType:"application/json"}).done(function(t){for(var a in t)0<t[a]?($('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").removeClass("d-none"),$('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").text(t[a])):$('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").hasClass("d-none")||$('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").addClass("d-none")}).fail(function(){alert("Ошибка чтения счётчиков")})}).fail(function(t){alert("Ошибка: ".concat(JSON.stringify(t)))})}}$("tbody".concat(s,"--body")).hasClass("animated")||$("tbody".concat(s,"--body")).addClass("animated fadeIn faster"),$("tbody".concat(s,"--body")).html(t)})})}function getNewUserData(){return{LastName:$("#LastName").val(),FirstName:$("#FirstName").val(),MiddleName:$("#MiddleName").val(),Office:$("#Office").val(),Email:$("#Email").val(),Phone:$("#Phone").val(),FullCompanyName:$("#FullCompanyName").val(),ShortCompanyName:$("#ShortCompanyName").val(),Address:$("#Address").val(),INN:$("#INN").val(),KPP:$("#KPP").val(),OGRN:$("#OGRN").val(),OKPO:$("#OKPO").val(),Bank:$("#Bank").val(),BIK:$("#BIK").val(),CorporateAcc:$("#CorporateAcc").val(),PaymentAcc:$("#PaymentAcc").val()}}function validate(t){var n=[],e={};if($.each(t,function(t,a){"CardID"!==a.name?(console.log("NAME: ",a.name),0===a.value.length||0<=a.value.indexOf("_")?n.push(a.name):e[a.name]=a.value):e[a.name]="(не указан)"}),e.Starttime){var a=e.Starttime.split(":"),o=e.Endtime.split(":");a=60*Number(a[0])+Number(a[1]),(o=60*Number(o[0])+Number(o[1]))<=a&&n.push("Starttime","Endtime")}if(e.Date){var i=new Date(e.Date).getTime(),d=new Date;i<new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()&&(n.push("Date"),delete e.Date)}if(e.Phone&&"9"!==e.Phone[4]&&"4"!==e.Phone[4]&&(n.push("Phone"),delete e.Phone),e.Email){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e.Email).toLowerCase())||(n.push("Email"),delete e.Email)}return console.log("".concat(n.length," | ").concat(n)),n}window.onload=function(){$(document).ready(function(){"v-pills-one-tab"===$("a.nav-link.active").attr("id")?ReadUsers():ReadData("Guests","#create-guest-pass"),$('input[name="Phone"]').inputmask("+7 (999) 999-99-99"),$('input[name="INN"]').inputmask("9{10,12}"),$('input[name="KPP"]').inputmask("9{9}"),$('input[name="OGRN"]').inputmask("9{13}"),$('input[name="OKPO"]').inputmask("9{8,10}"),$('input[name="BIK"]').inputmask("9{9}"),$('input[name="CorporateAcc"]').inputmask("9{20}"),$('input[name="PaymentAcc"]').inputmask("9{20}"),$('input[name="GovermentNumber"]').inputmask("A 999 AA — 9{2,3}"),$.ajax({url:"/get-counters",type:"POST",contentType:"application/json"}).done(function(t){for(var a in t)0<t[a]&&$('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").text(t[a]);setInterval(function(){$.ajax({url:"/get-counters",type:"POST",contentType:"application/json"}).done(function(t){for(var a in t)0<t[a]&&($('a.nav-link[data-query="'.concat(a,'"]')).find("#counterBadge").text(t[a]),ReadData($("a.nav-link.active").data("query"),$("a.nav-link.active").attr("href")))}).fail(function(){})},3e3)}).fail(function(t){})})},$(document).ready(function(){"/create-success"===window.location.pathname&&(localStorage.getItem("new_email")?($("#new-email").text("".concat(localStorage.getItem("new_email")," ")),localStorage.removeItem("new_email")):window.location.replace("/")),$("button#sendNewUser").click(function(t){t.preventDefault(),$.ajax({url:"/add-user",type:"POST",contentType:"application/json",data:JSON.stringify(getNewUserData())}).done(function(t){localStorage.setItem("new_email",t.email),window.location.replace("/create-success")})}),$("button#btn_log").on("click",function(t){t.preventDefault(),$(this).attr("disabled",!0),$(this).children(".spinner-border").removeClass("d-none");var a={email:$("input#login").val(),password:$("input#pass").val()};$.ajax({url:"/login",type:"POST",contentType:"application/json",data:JSON.stringify(a)}).done(function(t){t.ok&&($("span#invalid").hasClass("d-none")||$("span#invalid").addClass("d-none"),window.location.reload())}).fail(function(t){t=JSON.parse(JSON.stringify(t)),$("span#invalid").removeClass("d-none").addClass("text-center").text(t.responseJSON.message),$("button#btn_log").attr("disabled",!1),$("button#btn_log").children(".spinner-border").addClass("d-none")})}),$("button#logout").click(function(){$.ajax({url:"/logout",type:"POST",data:null}).done(function(){alert("EXIT SUCCESS")})}),$("a[data-query]").click(function(){ReadData($(this).data("query"),$(this).attr("href"))});setInterval(function(){ReadData($("a.nav-link.active").data("query"),$("a.nav-link.active").attr("href"))},3e3);$("button[form]").click(function(t){t.preventDefault();var a=$("form#".concat($(this).attr("form"))).find("input, textarea"),n={};if($.each(a,function(t,a){"CardID"!==a.name?0!==a.value.length&&(n[a.name]=a.value):n[a.name]="(не указан)"}),0===validate(a).length){if($(this).data("storage")&&(n.ArrayName=$(this).data("storage")),$(this).data("id")){var e=JSON.parse($(this).data("id"));n.id=e.id}"createNewUser--Form"===$(this).attr("form")?$.ajax({url:"/add-user",type:"POST",data:n}).done(function(t){alert("Пользователь ".concat(t.email," успешно добавлен!")),window.location.reload()}).fail(function(t){alert("".concat(JSON.stringify(t)))}):$.ajax({url:"/insert-data",type:"POST",contentType:"application/json",data:JSON.stringify(n)}).done(function(t){alert("Успешно!"),window.location.reload()}).fail(function(t){alert("Не удалось добавить...\n".concat(t.response))})}else $.each(validate(a),function(t,a){$("input[name=".concat(a,"]")).addClass("is-invalid"),$("input[name=".concat(a,"]")).on("keyup, change",function(){$(this).removeClass("is-invalid")}),$('button[aria-label="close"], button[data-dismiss="modal"]').on("click",function(){$("input[name]").removeClass("is-invalid")})})}),$("body").on("click","button#userUpdate",function(){var t=JSON.stringify({id:$(this).data("id")});$('button[form="updateUser--Form"]').data("id",t),$.ajax({url:"/read-user",type:"POST",contentType:"application/json",data:t}).done(function(t){for(var a in t.response)$("#updateUser--Form").find('input[name="'.concat(a,'"]')).val(t.response[a]).attr("disabled",!1)})}),$("body").on("click","button#userDelete",function(){confirm("Удалить пользователя?")&&$.ajax({url:"/delete-user",type:"POST",contentType:"application/json",data:JSON.stringify({id:$(this).data("id")})}).done(function(t){alert("Пользователь успешно удалён!"),window.location.reload()})}),$("body").on("click","button#deleteDecl",function(){if(confirm("Удалить эту заявку?")){var t={userID:$(this).data("userid"),id:$(this).data("id"),storage:$(this).data("storage")};$.ajax({url:"/delete-data",type:"POST",contentType:"application/json",data:JSON.stringify(t)}).done(function(t){alert("Заявка успешно удалена\n",t),window.location.reload()})}}),$("body").on("click","button#processedDecl",function(){$(this).find("div.spinner-border").removeClass("d-none");var t={id:$(this).data("id"),storage:$(this).data("storage"),status:"Обработано"};$.ajax({url:"/update-status",method:"POST",contentType:"application/json",data:JSON.stringify(t)}).done(function(){ReadData($("a.nav-link.active").data("query"),$("a.nav-link.active").attr("href"))}).fail(function(t){$(this).find("div.spinner-border").addClass("d-none"),alert("Ошибка: ".concat(JSON.stringify(t)))})}),$("body").on("click","button#rejectedDecl",function(){$(this).find("div.spinner-border").removeClass("d-none");var t={id:$(this).data("id"),storage:$(this).data("storage"),status:"Отклонено"};$.ajax({url:"/update-status",method:"POST",contentType:"application/json",data:JSON.stringify(t)}).done(function(){ReadData($("a.nav-link.active").data("query"),$("a.nav-link.active").attr("href"))}).fail(function(t){$(this).find("div.spinner-border").addClass("d-none"),alert("Ошибка: ".concat(JSON.stringify(t)))})})});