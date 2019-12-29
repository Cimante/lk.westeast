"use strict";function ReadUsers(){$.ajax({url:"/read-users",type:"POST",contentType:"application/json",data:""}).done(function(a){$(document).ready(function(){for(var t in a.response)$("tbody#content_0--body").append('\n\t\t\t\t\t<tr class="animated fadeIn faster">\n\t\t\t\t\t<td>'.concat(a.response[t].Office,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].LastName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].FirstName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].MiddleName,"</td>\n\t\t\t\t\t<td>").concat(a.response[t].Email,'</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<button class="btn btn-warning btn-sm mr-2" id="userUpdate" type="button" data-id="').concat(t,'" data-toggle="modal" data-target="#updateUser">\n\t\t\t\t\t\t\t<span>Редактировать</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="btn btn-danger btn-sm" id="userDelete" type="button" data-id="').concat(t,'">\n\t\t\t\t\t\t\t<span>Удалить</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t'))})})}function ReadData(t,o){$.ajax({url:"/read-data",type:"POST",contentType:"application/json",data:JSON.stringify({Arr:t})}).done(function(e){$(document).ready(function(){var t="";for(var a in e.response){for(var n in t+='<tr class="animated fadeIn faster">',e.response[a])"_id"!==n&&(t+="<td>".concat(e.response[a][n],"</td>"));t+="</tr>"}$("tbody".concat(o,"--body")).html(t)})})}function getNewUserData(){return{LastName:$("#LastName").val(),FirstName:$("#FirstName").val(),MiddleName:$("#MiddleName").val(),Office:$("#Office").val(),Email:$("#Email").val(),Phone:$("#Phone").val(),FullCompanyName:$("#FullCompanyName").val(),ShortCompanyName:$("#ShortCompanyName").val(),Address:$("#Address").val(),INN:$("#INN").val(),KPP:$("#KPP").val(),OGRN:$("#OGRN").val(),OKPO:$("#OKPO").val(),Bank:$("#Bank").val(),BIK:$("#BIK").val(),CorporateAcc:$("#CorporateAcc").val(),PaymentAcc:$("#PaymentAcc").val()}}window.onload=function(){ReadUsers()},$(document).ready(function(){"/create-success"===window.location.pathname&&(localStorage.getItem("new_email")?($("#new-email").text("".concat(localStorage.getItem("new_email")," ")),localStorage.removeItem("new_email")):window.location.replace("/")),$("button#sendNewUser").click(function(t){t.preventDefault(),$.ajax({url:"/add-user",type:"POST",contentType:"application/json",data:JSON.stringify(getNewUserData())}).done(function(t){localStorage.setItem("new_email",t.email),window.location.replace("/create-success")})}),$("button#btn_log").on("click",function(t){t.preventDefault();var a={email:$("input#login").val(),password:$("input#pass").val()};$.ajax({url:"/login",type:"POST",contentType:"application/json",data:JSON.stringify(a)}).done(function(t){t.ok&&($("span#invalid").hasClass("d-none")||$("span#invalid").addClass("d-none"),window.location.reload())}).fail(function(t){t=JSON.parse(JSON.stringify(t)),$("span#invalid").removeClass("d-none").addClass("text-center").text(t.responseJSON.message)})}),$("button#logout").click(function(){$.ajax({url:"/logout",type:"POST",data:null}).done(function(){alert("EXIT SUCCESS")})}),$('button[form="createNewUser--Form"]').click(function(){var t=getNewUserData();$.ajax({url:"/add-user",type:"POST",data:t}).done(function(t){alert("Пользователь ".concat(t.email," успешно добавлен!")),window.location.reload()})}),$("a[data-query]").click(function(){ReadData($(this).data("query"),$(this).attr("href"))}),$("button[form]").click(function(t){t.preventDefault();var a=$("form#".concat($(this).attr("form"))).find("input"),n={};if($.each(a,function(t,a){n[a.name]=a.value}),$(this).data("storage")&&(n.ArrayName=$(this).data("storage")),$(this).data("id")){var e=JSON.parse($(this).data("id"));n.id=e.id}$.ajax({url:"/insert-data",type:"POST",contentType:"application/json",data:JSON.stringify(n)}).done(function(t){alert("Успешно!"),window.location.reload()}).fail(function(t){alert("Всё пошло не по плану.\n".concat(t.response))})}),$("body").on("click","button#userUpdate",function(){var t=JSON.stringify({id:$(this).data("id")});$('button[form="updateUser--Form"]').data("id",t),$.ajax({url:"/read-user",type:"POST",contentType:"application/json",data:t}).done(function(t){for(var a in t.response)$("#updateUser--Form").find('input[name="'.concat(a,'"]')).val(t.response[a]).attr("disabled",!1)})})});